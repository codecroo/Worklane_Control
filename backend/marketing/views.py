import os
import uuid
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from asgiref.sync import async_to_sync

from .models import Poster
from .serializers import PosterSerializer
from .services import generate_poster_image

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

        # Call generator
        async_to_sync(generate_poster_image)(enhanced_prompt, save_path)

        # Save only original prompt & dropdown values in DB
        poster = Poster.objects.create(
            user=request.user,
            prompt=original_prompt,
            industry=industry,
            design_style=design_style,
            tone=tone,
            image=f"generated_posters/{filename}"
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
