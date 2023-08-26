from rest_framework import serializers
from .models import User, Guild, UserGuildConnection

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