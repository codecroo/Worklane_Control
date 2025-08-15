import requests
from datetime import datetime, timedelta
from ..models import Project, Task
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()  # looks for .env in your project root
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
HEADERS = {"Authorization": f"token {GITHUB_TOKEN}"} if GITHUB_TOKEN else {}

def check_github_tasks():
    projects = Project.objects.exclude(github_repo_url__isnull=True).exclude(github_repo_url__exact="")
    
    for project in projects:
        try:
            repo_url = project.github_repo_url.rstrip("/").replace("https://github.com/", "")
            commits_api = f"https://api.github.com/repos/{repo_url}/commits"
            
            # Only fetch commits from the last 7 days (adjustable)
            since = (datetime.utcnow() - timedelta(days=7)).isoformat() + "Z"
            response = requests.get(commits_api, headers=HEADERS, params={"since": since})
            response.raise_for_status()
            commits = response.json()
            
            commit_messages = [c["commit"]["message"] for c in commits]
            
            for task in project.tasks.filter(is_completed=False):
                if task.name in commit_messages:
                    task.is_completed = True
                    task.save()
                    print(f"Task '{task.name}' marked as completed in project '{project.name}'")
        
        except Exception as e:
            print(f"Error checking repo {project.github_repo_url}: {e}")