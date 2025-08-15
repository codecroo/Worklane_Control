from rest_framework import serializers
from .models import Project, Task
from employees.models import Employee
from employees.serializers import EmployeeSerializer


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "name", "is_completed"]
        extra_kwargs = {
            "id": {"read_only": True}
        }

class ProjectSerializer(serializers.ModelSerializer):
    employees = EmployeeSerializer(many=True, read_only=True)
    employee_ids = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all(),
        many=True,
        write_only=True
    )
    tasks = TaskSerializer(many=True)
    progress = serializers.ReadOnlyField()
    
    github_repo_url = serializers.URLField(required=False, allow_blank=True)  # new field

    class Meta:
        model = Project
        fields = [
            "id", "name", "deadline", "employees", "employee_ids",
            "tasks", "progress", "created_at", "github_repo_url"
        ]
        read_only_fields = ["user", "created_at", "progress"]

    def create(self, validated_data):
        employee_ids = validated_data.pop("employee_ids", [])
        tasks_data = validated_data.pop("tasks", [])
        
        project = Project.objects.create(**validated_data)
        project.employees.set(employee_ids)
    
        for task_data in tasks_data:
            Task.objects.create(project=project, **task_data)
    
        return project
    
    def update(self, instance, validated_data):
        employee_ids = validated_data.pop("employee_ids", None)
        tasks_data = validated_data.pop("tasks", None)
    
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
    
        if employee_ids is not None:
            instance.employees.set(employee_ids)
    
        if tasks_data is not None:
            instance.tasks.all().delete()
            for task_data in tasks_data:
                Task.objects.create(project=instance, **task_data)
    
        instance.save()
        return instance
