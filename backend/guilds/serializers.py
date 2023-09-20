from django.conf import settings
from rest_framework import serializers
from .models import User, Guild, UserGuildConnection
from dj_rest_auth.serializers import PasswordResetSerializer

from django.contrib.auth.forms import PasswordResetForm

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'date_joined', 'is_staff']

class GuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guild
        fields = ['id', 'name']
        
class UserGuildConnectionSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    guild = GuildSerializer()

    class Meta:
        model = UserGuildConnection
        fields = ['user', 'guild', 'role']

class CustomPasswordResetSerializer(PasswordResetSerializer):
        
    def get_email_options(self):
        return {
            'html_email_template_name': 'templates/guilds/password_reset_email.html'
        }