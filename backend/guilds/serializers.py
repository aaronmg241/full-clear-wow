from rest_framework import serializers
from .models import *
from dj_rest_auth.serializers import PasswordResetSerializer

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

class GuildCharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuildCharacter
        fields = ['id', 'character_class', 'spec', 'role', 'name']

# TODO: See if we actually need this serializer
class CustomPasswordResetSerializer(PasswordResetSerializer):
        
    def get_email_options(self):
        return {
            'html_email_template_name': 'templates/guilds/password_reset_email.html'
        }