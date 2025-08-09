from django.db import models
from django.contrib.auth.models import User
from employees.models import Employee  # reuse your existing Employee model

class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="projects")
    name = models.CharField(max_length=200)
    deadline = models.DateField()
    employees = models.ManyToManyField(Employee, related_name="project_employees", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def progress(self):
        total = self.tasks.count()
        if total == 0:
            return 0
        completed = self.tasks.filter(is_completed=True).count()
        return int((completed / total) * 100)

    def __str__(self):
        return self.name


class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="tasks")
    name = models.CharField(max_length=200)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({'Done' if self.is_completed else 'Pending'})"