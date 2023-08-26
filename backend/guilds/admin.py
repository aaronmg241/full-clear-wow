from django.contrib import admin
from .models import Guild, UserGuildConnection

# Register your models here.
admin.site.register(Guild)
admin.site.register(UserGuildConnection)