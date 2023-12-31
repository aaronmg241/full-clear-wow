# Generated by Django 4.2.3 on 2023-09-22 14:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('guilds', '0009_guildroster_alter_user_display_name_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='GuildRosterCharacter',
            new_name='GuildCharacter',
        ),
        migrations.RemoveField(
            model_name='guildcharacter',
            name='guild_roster',
        ),
        migrations.AddField(
            model_name='guildcharacter',
            name='guild',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='guilds.guild'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='display_name',
            field=models.CharField(blank=True, default='NuclearSilverfish', max_length=30, null=True),
        ),
        migrations.DeleteModel(
            name='GuildRoster',
        ),
    ]
