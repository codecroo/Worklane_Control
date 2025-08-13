from django.db import models
from django.contrib.auth.models import User

class Poster(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,blank=True,null=True)
    prompt = models.TextField(blank=True,null=True)
    image = models.ImageField(upload_to='generated_posters/',blank=True,null=True)
    industry = models.CharField(max_length=100, blank=True,null=True)
    design_style = models.CharField(max_length=100, blank=True,null=True)
    tone = models.CharField(max_length=100, blank=True,null=True)

    created_at = models.DateTimeField(auto_now_add=True,null=True)

    def __str__(self):
        return f"Poster ({self.id}) - {self.prompt[:30]}"