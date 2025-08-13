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
        serializer = PosterSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            prompt = serializer.validated_data['prompt']
            filename = f"poster_{request.user.id}_{uuid.uuid4().hex}.png"
            save_path = os.path.join(settings.MEDIA_ROOT, 'generated_posters', filename)
            os.makedirs(os.path.dirname(save_path), exist_ok=True)

            async_to_sync(generate_poster_image)(prompt, save_path)

            poster = Poster.objects.create(
                user=request.user,
                prompt=prompt,
                image=f"generated_posters/{filename}"
            )

            return Response(PosterSerializer(poster, context={'request': request}).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
