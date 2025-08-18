import os
import requests
from django.conf import settings

def upload_to_imgbb(image_path):
    api_key = settings.IMGBB_API_KEY
    if not api_key:
        raise Exception("IMGBB_API_KEY is not set in environment variables")

    with open(image_path, "rb") as file:
        url = "https://api.imgbb.com/1/upload"
        payload = {"key": api_key}
        files = {"image": file}
        res = requests.post(url, payload, files=files)
        data = res.json()

        if "data" in data:
            return data['data']['image']['url'] # permanent public link

        raise Exception(f"ImgBB upload failed: {data}")
