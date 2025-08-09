from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Employee
from .serializers import EmployeeSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

# EmployeeCreateView
class EmployeeCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            employee = serializer.save(user=request.user)  # assign the logged-in user
            return Response(EmployeeSerializer(employee).data, status=201)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmployeeCountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        count = Employee.objects.filter(user=request.user).count()
        return Response({"count": count})

class EmployeeListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        employees = Employee.objects.filter(user=request.user)
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)
    
# EmployeeDetailView
class EmployeeDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        return get_object_or_404(Employee, pk=pk, user=user)

    def get(self, request, pk):
        employee = self.get_object(pk, request.user)
        serializer = EmployeeSerializer(employee)
        return Response({
            "message": "Employee fetched successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def put(self, request, pk):
        employee = self.get_object(pk, request.user)
        serializer = EmployeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            updated_employee = serializer.save()
            return Response({
                "message": "Employee updated successfully",
                "data": EmployeeSerializer(updated_employee).data
            }, status=status.HTTP_200_OK)
        return Response({
            "message": "Validation failed",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        employee = self.get_object(pk, request.user)
        employee.delete()
        return Response({
            "message": "Employee deleted successfully"
        }, status=status.HTTP_204_NO_CONTENT)