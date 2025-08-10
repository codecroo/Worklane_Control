from django.urls import path
from .views import (
    ProjectCreateView, ProjectListView, ProjectDetailView,
    TaskCreateView, TaskUpdateDeleteView
)

urlpatterns = [
    path('add/', ProjectCreateView.as_view()),       # POST
    path('all/', ProjectListView.as_view()),         # GET
    path('<int:pk>/', ProjectDetailView.as_view()),  # GET, PUT, DELETE

    # Task routes
    path('<int:project_id>/tasks/add/', TaskCreateView.as_view()),  
    path('<int:project_id>/tasks/<int:task_id>/', TaskUpdateDeleteView.as_view()),
]