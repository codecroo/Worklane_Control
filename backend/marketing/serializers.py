from rest_framework import serializers
from .models import Poster

class PosterSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Poster
        fields = '__all__'
        read_only_fields = ['user', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None
