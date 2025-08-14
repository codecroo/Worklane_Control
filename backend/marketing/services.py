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
