from rest_framework import serializers
from .models import Poster,SocialAccount

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
    
    
class SocialAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialAccount
        fields = "__all__"
        extra_kwargs = {
            "access_token": {"write_only": True},
            "instagram_id":{"write_only":True},
            "page_id":{"write_only":True},
        }