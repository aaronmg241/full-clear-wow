from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client, OAuth2Error
from dj_rest_auth.registration.views import SocialLoginView
import os

from dotenv import load_dotenv

load_dotenv()
environment = os.getenv("DJANGO_ENVIRONMENT", "production")

callback_url = ""

if environment == "production":
    callback_url = 'https://full-clear-backend-production.up.railway.app/accounts/google/login/callback'
else:
    callback_url = 'http://127.0.0.1:8000/accounts/google/login/callback'

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = callback_url
    client_class = OAuth2Client


