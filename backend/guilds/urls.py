from django.urls import path, include
from . import views

urlpatterns = [
	path('', view=views.GuildView.as_view()),
	path('user/', view=views.UserView.as_view()),
	path('share/', view=views.GuildCodeView.as_view()),
	path('invite/', view=views.GuildInviteView.as_view()),
	path('roster/', view=views.GuildRosterView.as_view())
]