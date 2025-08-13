from django.urls import path
from .views import PosterCreateView, PosterListView, PosterDetailView, PosterCountView

urlpatterns = [
    path('add/', PosterCreateView.as_view()),        # POST
    path('all/', PosterListView.as_view()),          # GET
    path('count/', PosterCountView.as_view()),       # GET
    path('<int:pk>/', PosterDetailView.as_view()),   # GET, PUT, DELETE
]
