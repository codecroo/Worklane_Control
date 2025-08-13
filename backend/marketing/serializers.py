from rest_framework import serializers
from .models import Poster

class PosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poster
        fields = '__all__'
        read_only_fields = ['user', 'created_at']
