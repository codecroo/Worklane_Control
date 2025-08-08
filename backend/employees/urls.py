from django.urls import path
from .views import EmployeeCreateView, EmployeeListView, EmployeeDetailView

urlpatterns = [
    path('add/', EmployeeCreateView.as_view()),       # POST
    path('all/', EmployeeListView.as_view()),         # GET
    path('<int:pk>/', EmployeeDetailView.as_view()),  # GET, PUT, DELETE
]
