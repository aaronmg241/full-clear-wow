from django.urls import path, include
from . import views

urlpatterns = [
	path('my-guilds/', view=views.UserGuildsView.as_view()),
]