"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, register_converter
from .views import GoogleLogin
from dj_rest_auth.registration.views import VerifyEmailView
from dj_rest_auth.views import PasswordResetConfirmView, PasswordResetView
from guilds.consumers import GuildRosterConsumer

class StringConverter:
    regex = '[^/]+'

    def to_python(self, value):
        return value

    def to_url(self, value):
        return str(value)

register_converter(StringConverter, 'string')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
	path('dj-rest-auth/account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
	path('dj-rest-auth/password/reset/', PasswordResetView.as_view(), name='password_reset'),
	path('dj-rest-auth/password/reset/confirm/<str:uidb64>/<str:token>', PasswordResetConfirmView.as_view(),
            name='password_reset_confirm'),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('guilds/', include('guilds.urls')),
]

websocket_urlpatterns = [
	path('ws/guilds/<string:guild_id>/roster/', GuildRosterConsumer.as_asgi()),
]

