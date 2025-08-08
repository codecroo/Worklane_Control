from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Employee
from .serializers import EmployeeSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated


# EmployeeCreateView
class EmployeeCreateView(APIView):
    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # assign the logged-in user
            return Response({"message": "Employee added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        employees = Employee.objects.filter(user=request.user)
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)
    
    
# EmployeeDetailView
class EmployeeDetailView(APIView):
    def get_object(self, pk, user):
        return get_object_or_404(Employee, pk=pk, user=user)

    def get(self, request, pk):
        employee = self.get_object(pk, request.user)
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)

    def put(self, request, pk):
        employee = self.get_object(pk, request.user)
        serializer = EmployeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Employee updated successfully"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        employee = self.get_object(pk, request.user)
        employee.delete()
        return Response({"message": "Employee deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
