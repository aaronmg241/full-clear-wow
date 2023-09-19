from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import User, UserGuildConnection
from .serializers import GuildSerializer

class VerifyAuthentication(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self):
        return Response({'detail': 'Authenticated.'})
    
class UserGuildsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user  # Retrieve the user object from the authenticated request

            # Retrieve all guilds associated with the user through UserGuildConnection
            user_guild_connections = UserGuildConnection.objects.filter(user=user)
            guilds = [connection.guild for connection in user_guild_connections]

            # Serialize the guilds and return the response
            serializer = GuildSerializer(guilds, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=404)
    
class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user  # Retrieve the user object from the authenticated request

            # Serialize the user and return the response
            return Response(user.display_name)
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=404)