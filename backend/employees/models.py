from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="employees",null=True,blank=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    position = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    created_at = models.DateField(auto_now_add=True,null=True,blank=True)

    def __str__(self):
        return self.name