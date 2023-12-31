# Generated by Django 4.2.3 on 2023-09-23 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guilds', '0011_alter_guildcharacter_character_class_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='display_name',
            field=models.CharField(blank=True, default='UnevenWallaby', max_length=30, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='userguildconnection',
            unique_together={('user', 'guild')},
        ),
    ]
