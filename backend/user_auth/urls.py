from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('login/', login_user),
    path('register/', register_user),
]