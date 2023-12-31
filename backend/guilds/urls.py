from django.urls import path, include
from . import views

urlpatterns = [
	path('', view=views.GuildView.as_view()),
	path('user/', view=views.UserView.as_view()),
	path('share/', view=views.GuildCodeView.as_view()),
	path('invite/', view=views.GuildInviteView.as_view()),
	path('roster/', view=views.GuildRosterView.as_view()),
	path('<string:guild_id>/characters/', view=views.CreateCharacterView.as_view()),
	path('<string:guild_id>/characters/<int:character_id>/', view=views.UpdateCharacterView.as_view()),
	path('<string:guild_id>/boss_roster/<int:boss_id>/', view=views.CreateBossRosterCharacter.as_view()),
	path('<string:guild_id>/plans/', view=views.BossPlansView.as_view()),
	path('<string:guild_id>/plans/<int:plan_id>/', view=views.BossPlanView.as_view()),
	path('<string:guild_id>/rows/<string:row_id>/cooldowns/', view=views.AssignedCooldownView.as_view()),
]