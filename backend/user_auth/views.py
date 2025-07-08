from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def register_user(request):
    data = request.data
    # Do validation and user creation
    return Response({"msg": "User registered"})

@api_view(['POST'])
def login_user(request):
    # Check credentials, return token if valid
    return Response({"token": "xyz"})
