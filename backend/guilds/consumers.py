
from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from .models import GuildCharacter

class GuildRosterConsumer(JsonWebsocketConsumer):

	def connect(self):
		self.guild_id = self.scope['url_route']['kwargs']['guild_id']
		self.room_name = f"guild_roster_{self.guild_id}"
		# Called on connection.
		# To accept the connection call:
		async_to_sync(self.channel_layer.group_add)(self.room_name, self.channel_name)
		self.accept()

	def receive_json(self, content):

		if 'shouldDelete' in content:
			async_to_sync(self.channel_layer.group_send)(
				self.room_name,
				{
					'type': 'roster_change',
					'id': content['id'],
					'shouldDelete': True
				}
			)
		else: 
			async_to_sync(self.channel_layer.group_send)(
				self.room_name,
				{
					'type': 'roster_change',
					'characterClass': content['characterClass'],
					'name': content['name'],
					'spec': content['spec'],
					'role': content['role'],
					'id': content['id'],
				}
			)

	def roster_change(self, event):
		self.send_json(event)

	def disconnect(self, close_code):
		# Called when the socket closes
		pass