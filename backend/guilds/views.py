from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import *
from .serializers import GuildSerializer

class GuildView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user  # Retrieve the user object from the authenticated request

            # Create a new guild with the given name
            guild = Guild.objects.create(name=request.data['name'], created_by=user)

            # Create a new UserGuildConnection for the user and the guild
            UserGuildConnection.objects.create(user=user, guild=guild)

            # Serialize the guild and return the response
            serializer = GuildSerializer(guild)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=404)
    
class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user  # Retrieve the user object from the authenticated request
            user_guild_connections = UserGuildConnection.objects.filter(user=user)
            # for connection in user_guild_connections:
            #     print(connection.guild.name)

            # Serialize the user and return the response
            return Response(
                { 
                    'display_name': user.display_name, 
                    'guilds': [ { 'id': connection.guild.id, 'name': connection.guild.name } for connection in user_guild_connections ]
                } 
            )
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=404)
    
    def post(self, request):
        try:
            user = request.user  # Retrieve the user object from the authenticated request

            # Update the user's display name
            user.display_name = request.data['display_name']
            user.save()

            # Serialize the user and return the response
            return Response(user.display_name)
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=404)
        
class GuildCodeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            guild = Guild.objects.get(id=request.data['guild_id'])
            guild_code = GuildCode.objects.create(guild=guild)
            return Response(guild_code.code)
        except Guild.DoesNotExist:
            return Response({'detail': 'Guild not found.'}, status=404)
        
class GuildInviteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user  
            guild_code = GuildCode.objects.get(code=request.data['code'])

            guild = guild_code.guild

            UserGuildConnection.objects.create(user=user, guild=guild)

        except GuildCode.DoesNotExist:
            return Response({'detail': 'Access code note found.'}, status=404)