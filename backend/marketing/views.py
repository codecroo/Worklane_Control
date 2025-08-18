import os
import uuid
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from .services import post_to_facebook, post_to_instagram,generate_poster_image
from .models import Poster,SocialAccount
from .serializers import PosterSerializer,SocialAccountSerializer

class PosterCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Extract values
        original_prompt = request.data.get("prompt", "").strip()
        industry = request.data.get("industry", "").strip()
        design_style = request.data.get("design_style", "").strip()
        tone = request.data.get("tone", "").strip()

        if not original_prompt:
            return Response({"error": "Prompt is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Prepare enhanced prompt only for generation
        enhanced_prompt = (
            f"{original_prompt}. Industry: {industry}. Style: {design_style}. Tone: {tone}. "
            "Enhance the prompt, enhance details, focus on clarity of any text if there is any, "
            "and add creative/artistic elements if necessary."
        )

        # Generate file path
        filename = f"poster_{request.user.id}_{uuid.uuid4().hex}.png"
        save_path = os.path.join(settings.MEDIA_ROOT, 'generated_posters', filename)
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        
        generate_poster_image(enhanced_prompt, save_path)

        # Save only original prompt & dropdown values in DB
        poster = Poster.objects.create(
            user=request.user,
            prompt=original_prompt,
            industry=industry,
            design_style=design_style,
            tone=tone,
            image=f"generated_posters/{filename}",
            caption=request.data.get("caption", "").strip(),  # ✅ save caption if provided
        )

        
        return Response(
            PosterSerializer(poster, context={'request': request}).data,
            status=status.HTTP_201_CREATED
        )


class PosterListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        posters = Poster.objects.filter(user=request.user).order_by('-created_at')
        serializer = PosterSerializer(posters, many=True, context={'request': request})
        return Response(serializer.data)


class PosterDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        poster = get_object_or_404(Poster, pk=pk, user=request.user)
        poster.image.delete(save=False)
        poster.delete()
        return Response({"message": "Poster deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

class SocialAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        account, _ = SocialAccount.objects.get_or_create(user=request.user)
        return Response(SocialAccountSerializer(account).data)

    def post(self, request):
        account, _ = SocialAccount.objects.get_or_create(user=request.user)
        serializer = SocialAccountSerializer(account, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)  # ✅ ensure it's tied to the current user
        return Response(serializer.data)
    
    
class SocialPostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        platforms_in = request.data.get("platforms") or request.data.get("platform")
        if isinstance(platforms_in, str):
            platforms = ["facebook", "instagram"] if platforms_in.lower() == "both" else [platforms_in.lower()]
        elif isinstance(platforms_in, list):
            platforms = [str(p).lower() for p in platforms_in]
        else:
            platforms = []

        caption = request.data.get("caption", "")

        if not platforms:
            return Response({"error": "No platform(s) specified."}, status=status.HTTP_400_BAD_REQUEST)

        poster = get_object_or_404(Poster, pk=pk, user=request.user)
        account = get_object_or_404(SocialAccount, user=request.user)

        # ✅ Save caption in DB
        if caption and poster.caption != caption:
            poster.caption = caption
            poster.save(update_fields=["caption"])

        image_url = poster.public_url
        if not image_url:
            return Response({"error": "Poster is not publicly accessible yet. Try again in a few seconds."},
                            status=status.HTTP_409_CONFLICT)

        results = {}
        if "facebook" in platforms:
            if not account.fb_page_id:
                results["facebook"] = {"error": "Missing fb_page_id in your SocialAccount."}
            else:
                results["facebook"] = post_to_facebook(
                    access_token=account.access_token,
                    page_id=account.fb_page_id,
                    image_url=image_url,
                    caption=caption,
                )

        if "instagram" in platforms:
            if not account.instagram_id:
                results["instagram"] = {"error": "Missing instagram_id in your SocialAccount."}
            else:
                results["instagram"] = post_to_instagram(
                    access_token=account.access_token,
                    instagram_id=account.instagram_id,
                    image_url=image_url,
                    caption=caption,
                )

        return Response(results, status=status.HTTP_200_OK)
