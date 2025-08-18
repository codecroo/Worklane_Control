from gradio_client import Client
import shutil
import os

SPACE_ID = "Parth2005147/Pollinations-Image-Generator"

def generate_poster_image(prompt, output_path):
    try:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        client = Client(SPACE_ID)
        result = client.predict(prompt, api_name="/predict")

        # If it's a list, take the first item
        if isinstance(result, list) and result:
            result = result[0]

        result = str(result)

        # If result is a local file path
        if os.path.exists(result):
            shutil.copy(result, output_path)
        # If it's a URL, download it
        elif result.startswith("http"):
            import urllib.request
            urllib.request.urlretrieve(result, output_path)
        else:
            raise ValueError(f"Unexpected result format: {result}")

        return True

    except Exception as e:
        raise RuntimeError(f"Poster generation failed: {e}")


import requests

def post_to_facebook(access_token, page_id, image_url, caption):
    fb_url = f"https://graph.facebook.com/v17.0/{page_id}/photos"
    payload = {
        "url": image_url,
        "caption": caption,
        "access_token": access_token
    }
    try:
        response = requests.post(fb_url, data=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}


def post_to_instagram(access_token, instagram_id, image_url, caption):
    # Step 1: Create Media Container
    ig_create_url = f"https://graph.facebook.com/v17.0/{instagram_id}/media"
    payload_create = {
        "image_url": image_url,
        "caption": caption,
        "access_token": access_token
    }
    res_create = requests.post(ig_create_url, data=payload_create).json()
    creation_id = res_create.get("id")
    if not creation_id:
        return {"error": "Failed to create Instagram media container", "response": res_create}

    # Step 2: Publish Media
    ig_publish_url = f"https://graph.facebook.com/v17.0/{instagram_id}/media_publish"
    payload_publish = {
        "creation_id": creation_id,
        "access_token": access_token
    }
    res_publish = requests.post(ig_publish_url, data=payload_publish).json()
    return res_publish
