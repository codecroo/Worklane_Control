from django.db import models
from django.contrib.auth.models import User
from .utils import upload_to_imgbb

class Poster(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    prompt = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="generated_posters/", blank=True, null=True)
    industry = models.CharField(max_length=100, blank=True, null=True)
    design_style = models.CharField(max_length=100, blank=True, null=True)
    tone = models.CharField(max_length=100, blank=True, null=True)
    public_url = models.URLField(blank=True, null=True)  # renamed
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # save local file first
        if self.image and not self.public_url:
            uploaded_url = upload_to_imgbb(self.image.path)
            self.public_url = uploaded_url
            super().save(update_fields=["public_url"])

    def __str__(self):
        return f"Poster ({self.id}) - {self.prompt[:30]}"

class SocialAccount(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    access_token = models.TextField()
    page_id = models.CharField(max_length=200, blank=True, null=True)
    instagram_id = models.CharField(max_length=200, blank=True, null=True)
    caption = models.TextField(blank=True, null=True)  
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.page_id or self.instagram_id}"
