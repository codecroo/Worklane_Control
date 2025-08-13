from django.db import models
from django.contrib.auth.models import User

class Poster(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posters")

    # inputs/selections
    prompt = models.TextField()
    style = models.CharField(max_length=50)
    color_theme = models.CharField(max_length=50)
    format = models.CharField(max_length=50)

    # outputs
    image = models.ImageField(upload_to="posters/", blank=True, null=True)  # stores file locally
    caption = models.TextField(blank=True)
    hashtags = models.TextField(blank=True)
    best_time = models.CharField(max_length=20, blank=True)

    created_at = models.DateField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return f"Poster [{self.style}] - {self.created_at}"
