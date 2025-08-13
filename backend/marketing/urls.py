from django.urls import path
from .views import PosterCreateView, PosterListView, PosterDeleteView

urlpatterns = [
    path('add/', PosterCreateView.as_view()),        # POST
    path('all/', PosterListView.as_view()),          # GET
    path('delete/<int:pk>/', PosterDeleteView.as_view()),  # DELETE
]
