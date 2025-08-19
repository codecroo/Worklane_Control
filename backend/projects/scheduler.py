# scheduler.py
from apscheduler.schedulers.background import BackgroundScheduler
from .utils.github_tasks import check_github_tasks

scheduler = BackgroundScheduler()

def start():
    # Avoid adding multiple jobs if server reloads
    if not scheduler.get_job('github_task_check'):
        #run immediately once
        check_github_tasks()

        # Schedule to run every 24 hours
        scheduler.add_job(check_github_tasks, 'interval', hours=24, id='github_task_check')
        #use minutes=1 for nearly live experience
        scheduler.start()
