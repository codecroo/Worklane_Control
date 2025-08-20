import cloudinary
import cloudinary.uploader
from django.conf import settings

def upload_to_cloudinary(image_path):
    """
    Uploads an image to Cloudinary and returns a secure, permanent URL.
    """
    cloudinary.config(
        cloud_name=settings.CLOUDINARY["cloud_name"],
        api_key=settings.CLOUDINARY["api_key"],
        api_secret=settings.CLOUDINARY["api_secret"]
    )

    try:
        response = cloudinary.uploader.upload(
            image_path,
            resource_type="image"
        )
        return response.get("secure_url")  # always https:// link

    except Exception as e:
        raise Exception(f"Cloudinary upload failed: {str(e)}")