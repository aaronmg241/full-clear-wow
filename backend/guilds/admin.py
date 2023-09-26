from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Guild)
admin.site.register(UserGuildConnection)
admin.site.register(User)
admin.site.register(GuildCode)
admin.site.register(GuildCharacter)
admin.site.register(BossRoster)