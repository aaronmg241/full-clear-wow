# Generated by Django 4.2.3 on 2023-09-23 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guilds', '0012_alter_user_display_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='display_name',
            field=models.CharField(blank=True, default='WarmBeaver', max_length=30, null=True),
        ),
    ]