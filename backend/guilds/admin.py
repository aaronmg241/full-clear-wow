from django.contrib import admin
from .models import Guild, UserGuildConnection, User

# Register your models here.
admin.site.register(Guild)
admin.site.register(UserGuildConnection)
admin.site.register(User)