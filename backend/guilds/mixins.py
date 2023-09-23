from .models import UserGuildConnection

class GuildAuthenticationMixin:
    def get_user_guild_connection(self, user, guild):
        """
        Get the UserGuildConnection instance for the user and guild.
        """
        return UserGuildConnection.objects.get(user=user, guild=guild)

    def get_user_role(self, user, guild):
        """
        Check if the user has permission to perform an action on the guild.
        """
        try:
            connection = self.get_user_guild_connection(user, guild)
            # Add your permission checks here, e.g., checking the user's role in the guild
            # Return True if the user has permission, otherwise False

            return connection.role
        except UserGuildConnection.DoesNotExist:
            return None