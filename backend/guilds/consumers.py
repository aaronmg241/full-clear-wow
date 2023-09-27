
from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from .models import GuildCharacter

# This is a single consumer where listen to all websocket actions for the guild
# Types of actions:
# 	- roster_update: When a character is added, updated, or deleted from the GuildRoster
# 	- boss_roster_update: When a character is added, updated, or deleted from a GuildBossRoster
class GuildRosterConsumer(JsonWebsocketConsumer):

	def connect(self):
		self.guild_id = self.scope['url_route']['kwargs']['guild_id']
		self.room_name = f"{self.guild_id}"
		# Called on connection.
		# To accept the connection call:
		async_to_sync(self.channel_layer.group_add)(self.room_name, self.channel_name)
		self.accept()

	def receive_json(self, content):

		if content['type'] == 'roster_update':
			if 'shouldDelete' in content:
				async_to_sync(self.channel_layer.group_send)(
					self.room_name,
					{
						'type': 'roster_update',
						'id': content['id'],
						'shouldDelete': True
					}
				)
			else: 
				async_to_sync(self.channel_layer.group_send)(
					self.room_name,
					{
						'type': 'roster_update',
						'characterClass': content['characterClass'],
						'name': content['name'],
						'spec': content['spec'],
						'role': content['role'],
						'id': content['id'],
					}
				)
		elif content['type'] == 'boss_roster_update':
			if 'shouldRemove' in content:
				async_to_sync(self.channel_layer.group_send)(
					self.room_name,
					{
						'type': content['type'],
						'characterId': content['characterId'],
						'bossId': content['bossId'],
						'shouldRemove': True
					}
				)
			else:
				async_to_sync(self.channel_layer.group_send)(
					self.room_name,
					{
						'type': content['type'],
						'characterId': content['characterId'],
						'bossId': content['bossId'],
					}
				)

	def roster_update(self, event):
		self.send_json(event)

	def boss_roster_update(self, event):
		self.send_json(event)

	def disconnect(self, close_code):
		# Called when the socket closes
		pass