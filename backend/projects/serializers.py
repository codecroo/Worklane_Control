from rest_framework import serializers
from .models import Project, Task
from employees.serializers import EmployeeSerializer

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'is_completed']


class ProjectSerializer(serializers.ModelSerializer):
    employees = EmployeeSerializer(many=True, read_only=True)
    employee_ids = serializers.PrimaryKeyRelatedField(
        many=True, write_only=True, queryset=Project.employees.field.related_model.objects.all()
    )
    tasks = TaskSerializer(many=True, read_only=True)
    progress = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = [
            'id', 'name', 'deadline', 'employees', 'employee_ids',
            'tasks', 'progress', 'created_at'
        ]
        read_only_fields = ['user', 'created_at', 'progress']

    def create(self, validated_data):
        employee_ids = validated_data.pop('employee_ids', [])
        project = Project.objects.create(**validated_data)
        project.employees.set(employee_ids)
        return project

    def update(self, instance, validated_data):
        employee_ids = validated_data.pop('employee_ids', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if employee_ids is not None:
            instance.employees.set(employee_ids)
        instance.save()
        return instance
