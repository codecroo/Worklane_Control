# apps.py
from django.apps import AppConfig

class ProjectsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'projects'  # replace with your app name

    def ready(self):
        from .scheduler import start  # import your scheduler start function
        start()
