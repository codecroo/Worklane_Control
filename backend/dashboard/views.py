from datetime import date
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from employees.models import Employee
from projects.models import Project, Task
from marketing.models import Poster


class DashboardDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # === COUNTS ===
        counts = {
            "employees": Employee.objects.filter(user=user).count(),
            "projects": Project.objects.filter(user=user).count(),
            "tasks": Task.objects.filter(project__user=user, is_completed=True).count(),
            "posters": Poster.objects.filter(user=user).count(),
        }

        # === PROJECTS ===
        projects_list = [
            {
                "title": p.name,
                "deadline": p.deadline.strftime("%Y-%m-%d") if p.deadline else None,
                "progress": p.progress,
            }
            for p in Project.objects.filter(user=user)
        ]

        # === DEADLINES ===
        deadlines_list = []
        for p in Project.objects.filter(user=user, deadline__isnull=False).order_by("deadline")[:3]:
            due_date = p.deadline
            status = "overdue" if due_date < date.today() else "upcoming"
            deadlines_list.append({
                "project": p.name,
                "due": due_date.strftime("%Y-%m-%d"),
                "status": status
            })

        # === TEAM ===
        team_list = [
            {"name": e.name, "role": e.position}
            for e in Employee.objects.filter(user=user)[:3]
        ]

        # === STATUS STATS ===
        all_projects = Project.objects.filter(user=user)
        status_stats = [
            {
                "label": "Ongoing",
                "count": sum(1 for p in all_projects if 0 < p.progress < 100),
            },
            {
                "label": "Completed",
                "count": sum(1 for p in all_projects if p.progress == 100),
            },
            {
                "label": "Pending",
                "count": sum(1 for p in all_projects if p.progress == 0),
            },
        ]

        return Response({
            "counts": counts,
            "projects": projects_list,
            "deadlines": deadlines_list,
            "team": team_list,
            "statusStats": status_stats  # camelCase for frontend
        })
