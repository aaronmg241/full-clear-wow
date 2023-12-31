# Generated by Django 4.2.3 on 2023-09-22 14:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('guilds', '0008_alter_user_display_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='GuildRoster',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('guild', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='guilds.guild')),
            ],
        ),
        migrations.AlterField(
            model_name='user',
            name='display_name',
            field=models.CharField(blank=True, default='ElectoralMarsupial', max_length=30, null=True),
        ),
        migrations.CreateModel(
            name='GuildRosterCharacter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('character_class', models.CharField(max_length=60)),
                ('spec', models.CharField(max_length=60)),
                ('role', models.CharField(max_length=60)),
                ('name', models.CharField(max_length=30)),
                ('guild_roster', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='guilds.guildroster')),
            ],
        ),
    ]
