from django.db import models
from django.contrib.auth.models import User

class Poster(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    prompt = models.TextField()
    image = models.ImageField(upload_to='generated_posters/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Poster ({self.id}) - {self.prompt[:30]}"
