from django.urls import path
from .views import PosterCreateView, PosterListView, PosterDeleteView,SocialAccountView,SocialPostView

urlpatterns = [
    path('add/', PosterCreateView.as_view()),        # POST
    path('all/', PosterListView.as_view()),          # GET
    path('delete/<int:pk>/', PosterDeleteView.as_view()),  # DELETE
    path('social/account/', SocialAccountView.as_view()),   # GET, POST (save/update creds)
    path('social/post/<int:pk>/', SocialPostView.as_view()), # POST poster to FB/IG
]