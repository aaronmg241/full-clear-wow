# Generated by Django 4.2.3 on 2023-09-18 21:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('guilds', '0002_user_display_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='last_name',
        ),
    ]
