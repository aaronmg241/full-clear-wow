from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle
from rest_framework.permissions import IsAuthenticated
from .models import *
from .mixins import GuildAuthenticationMixin
from .serializers import *
from datetime import datetime, timedelta

class GuildView(APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def post(self, request):
        try:
            user = request.user  # Retrieve the user object from the authenticated request

            current_guilds = UserGuildConnection.objects.filter(user=user)

            if len(current_guilds) >= 5:
                return Response({'detail': 'You cannot be apart of more than 5 guilds.'}, status=400)

            # Create a new guild with the given name
            guild = Guild.objects.create(name=request.data['name'], created_by=user)

            # Create a new UserGuildConnection for the user and the guild
            UserGuildConnection.objects.create(user=user, guild=guild, role='guild_master')

            # Serialize the guild and return the response
            serializer = GuildSerializer(guild)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=404)
    
class UserView(APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

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
        
class GuildCodeView(GuildAuthenticationMixin, APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def post(self, request):
        user = request.user

        if self.get_user_role(user=request.user, guild=request.data['guild_id']) is None: 
            return Response({'detail': 'You are not in this guild.'}, status=403)

        guild = get_object_or_404(Guild, id=request.data['guild_id'])
        guild_code = GuildCode.objects.create(guild=guild, created_by=user)
        return Response(guild_code.code)

        
class GuildInviteView(APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def post(self, request):
        user = request.user 

        guild_code = get_object_or_404(GuildCode, code=request.data['code'])

        if guild_code.created_at.replace(tzinfo=None) < datetime.utcnow() - timedelta(days=1):
            return Response({'detail': 'This link has expired.'}, status=400)

        guild = guild_code.guild

        current_connection = UserGuildConnection.objects.filter(user=user, guild=guild)

        if current_connection.exists():
            return Response({'detail': 'You are already in this guild.'}, status=400)
        
        current_guilds = UserGuildConnection.objects.filter(user=user)
        if len(current_guilds) >= 5:
                return Response({'detail': 'You cannot be apart of more than 5 guilds.'}, status=400)

        UserGuildConnection.objects.create(user=user, guild=guild, role='officer')
        return Response(GuildSerializer(guild).data, status=200)

class GuildRosterView(APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request):
        guild = get_object_or_404(Guild, id=request.GET['guild_id'])
        guild_characters = GuildCharacter.objects.filter(guild=guild)
        return Response([ { 'id': character.id, 'name': character.name, 'characterClass': character.character_class, 'spec': character.spec, 'role': character.role } for character in guild_characters ])
    
class CreateCharacterView(GuildAuthenticationMixin, APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def post(self, request, guild_id):
        if self.get_user_role(user=request.user, guild=guild_id) is not None:
            guild = get_object_or_404(Guild, id=guild_id)
            guild_character = GuildCharacter.objects.create(guild=guild, name=request.data['name'], character_class=request.data['character_class'], spec=request.data['spec'], role=request.data['role'])
            return Response({ 'id': guild_character.id, 'name': guild_character.name, 'characterClass': guild_character.character_class, 'spec': guild_character.spec, 'role': guild_character.role })
        else:
            return Response({'detail': 'You are not in this guild.'}, status=403)
        
class UpdateCharacterView(GuildAuthenticationMixin, APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def delete(self, request, guild_id, character_id):
        if self.get_user_role(user=request.user, guild=guild_id) is None:
            return Response({'detail': 'You are not in this guild.'}, status=403)
        guild_character = get_object_or_404(GuildCharacter, id=character_id)
        guild_character.delete()
        return Response(status=200)
    
    def put(self, request, guild_id, character_id):
        if self.get_user_role(user=request.user, guild=guild_id) is None:
            return Response({'detail': 'You are not in this guild.'}, status=403)
        
        guild_character = get_object_or_404(GuildCharacter, id=character_id)
        serializer = GuildCharacterSerializer(guild_character, data=request.data)

        if serializer.is_valid():
            serializer.save()  # This will update the GuildCharacter with the new data
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        
class CreateBossRosterCharacter(GuildAuthenticationMixin, APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def post(self, request, guild_id, boss_id):
        if self.get_user_role(user=request.user, guild=guild_id) is None:
            return Response({'detail': 'You are not in this guild.'}, status=403)
        
        boss_roster, _ = BossRoster.objects.get_or_create(guild=guild_id, boss_id=boss_id)
        guild_character = get_object_or_404(GuildCharacter, id=request.data['character_id'])

        boss_roster.characters.add(guild_character)

        return Response(status=200)
    
    def get(self, request, guild_id, boss_id):
        if self.get_user_role(user=request.user, guild=guild_id) is None:
            return Response({'detail': 'You are not in this guild.'}, status=403)
        boss_roster, _ = BossRoster.objects.get_or_create(guild_id=guild_id, boss_id=boss_id)
        guild_characters = boss_roster.characters.all()

        return Response([ { 'id': character.id, 'name': character.name, 'characterClass': character.character_class, 'spec': character.spec, 'role': character.role } for character in guild_characters ])

    def delete(self, request, guild_id, boss_id):
        if self.get_user_role(user=request.user, guild=guild_id) is None:
            return Response({'detail': 'You are not in this guild.'}, status=403)
        boss_roster = get_object_or_404(BossRoster, guild_id=guild_id, boss_id=boss_id)
        guild_character = get_object_or_404(GuildCharacter, id=request.data['character_id'])

        boss_roster.characters.remove(guild_character)

        return Response(status=200)
    

class BossPlansView(GuildAuthenticationMixin, APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, guild_id):
        if self.get_user_role(user=request.user, guild=guild_id) is None:
            return Response({'detail': 'You are not in this guild.'}, status=403)
        boss_plans = BossPlan.objects.filter(guild_id=guild_id)

        data = BossPlanSerializer(boss_plans, many=True).data

        return Response(data, status=200)
    
    def post(self, request, guild_id):

        if self.get_user_role(user=request.user, guild=guild_id) is None:
            return Response({'detail': 'You are not in this guild.'}, status=403)

        data = request.data

        data['guild'] = get_object_or_404(Guild, id=guild_id).id
        data['version'] = 1
        rows = data['rows']

        # Add a fake id so we can check to make sure the data is valid
        for row in rows:
            row['boss_plan'] = 1
        plan_serializer = BossPlanSerializer(data=data)
        rows_serializer = BossPlanRowSerializer(data=data['rows'], many=True)


        if not plan_serializer.is_valid() or not rows_serializer.is_valid():
            print(plan_serializer.errors, rows_serializer.errors)
            return Response(plan_serializer.errors, status=400)
        
        plan = plan_serializer.save()

        
        for row in rows:
            row['boss_plan'] = plan.id
            row_serializer = BossPlanRowSerializer(data=row)
            if row_serializer.is_valid():
                row_serializer.save()            

        return Response(plan_serializer.data, status=201)
    
class BossPlanView(GuildAuthenticationMixin, APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request, guild_id, plan_id):
        if self.get_user_role(user=request.user, guild=guild_id) is None:
            return Response({'detail': 'You are not in this guild.'}, status=403)
        boss_plan = get_object_or_404(BossPlan, id=plan_id)

        roster = BossRoster.objects.filter(guild_id=guild_id, boss_id=boss_plan.boss_id).first()

        if roster is None:
            return Response({'detail': 'No roster found for this boss.'}, status=404)
        
        characters = GuildCharacterSerializer(roster.characters.all(), many=True).data

        boss_plan_rows = BossPlanRow.objects.filter(boss_plan_id=plan_id)

        data = BossPlanRowSerializer(boss_plan_rows, many=True).data

        

        row_ids = [ row['id'] for row in data ]

        # Attach cooldowns to each row
        assigned_cooldowns = AssignedCooldown.objects.filter(boss_plan_row__in=row_ids)
        assigned_cooldowns_serializer = AssignedCooldownSerializer(assigned_cooldowns, many=True).data
        for row in data:
            row['assigned_cooldowns'] = []
            for cooldown in assigned_cooldowns_serializer:
                if str(cooldown['boss_plan_row']) == row['id']:
                    row['assigned_cooldowns'].append(cooldown)


        return Response({ 'roster': characters, 'rows': data }, status=200)
    
class AssignedCooldownView(GuildAuthenticationMixin, APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def post(self, request, guild_id, row_id):
        if self.get_user_role(user=request.user, guild=guild_id) is None:
            return Response({'detail': 'You are not in this guild.'}, status=403)

        print('here')
        boss_plan_row = get_object_or_404(BossPlanRow, id=row_id)
        data = request.data
        data['boss_plan_row'] = boss_plan_row.id

        serializer = AssignedCooldownSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)
        
    def delete(self, request, guild_id, row_id):
        if self.get_user_role(user=request.user, guild=guild_id) is None:
            return Response({'detail': 'You are not in this guild.'}, status=403)

        assigned_cooldown = get_object_or_404(AssignedCooldown, boss_plan_row_id=row_id, column=request.data['column'])

        assigned_cooldown.delete()

        return Response(status=200)

