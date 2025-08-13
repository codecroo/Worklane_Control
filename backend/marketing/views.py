from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from .models import Poster
from .serializers import PosterSerializer

class PosterCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PosterSerializer(data=request.data)
        if serializer.is_valid():
            poster = serializer.save(user=request.user)
            return Response(PosterSerializer(poster).data, status=201)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PosterCountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        count = Poster.objects.filter(user=request.user).count()
        return Response({"count": count})

class PosterListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        posters = Poster.objects.filter(user=request.user).order_by('-id')
        serializer = PosterSerializer(posters, many=True)
        return Response(serializer.data)

class PosterDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        return get_object_or_404(Poster, pk=pk, user=user)

    def get(self, request, pk):
        poster = self.get_object(pk, request.user)
        serializer = PosterSerializer(poster)
        return Response({
            "message": "Poster fetched successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def put(self, request, pk):
        poster = self.get_object(pk, request.user)
        serializer = PosterSerializer(poster, data=request.data, partial=False)
        if serializer.is_valid():
            updated_poster = serializer.save()
            return Response({
                "message": "Poster updated successfully",
                "data": PosterSerializer(updated_poster).data
            }, status=status.HTTP_200_OK)
        return Response({
            "message": "Validation failed",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        poster = self.get_object(pk, request.user)
        poster.delete()
        return Response({
            "message": "Poster deleted successfully"
        }, status=status.HTTP_204_NO_CONTENT)
