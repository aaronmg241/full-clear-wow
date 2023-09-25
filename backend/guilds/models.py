from collections.abc import Iterable
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from unique_names_generator import get_random_name
from unique_names_generator.data import ADJECTIVES, ANIMALS
import uuid

from .enums import *

def get_smaller_uuid():
    return str(uuid.uuid4())[:13]

# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    display_name = models.CharField(max_length=30, blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        if not self.display_name:
            self.display_name = get_random_name(combo=[ADJECTIVES, ANIMALS], separator="")
        super().save(*args, **kwargs)
	
class Guild(models.Model):
    id = models.CharField(primary_key=True, default=get_smaller_uuid, editable=False, max_length=13)
    name = models.CharField(max_length=24, null=False, blank=False)
    
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_by')

    def __str__(self):
        return str(self.id) + "-" + self.name

class UserGuildConnection(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    guild = models.ForeignKey(Guild, on_delete=models.CASCADE)
    role = models.CharField(max_length=60)

    def __str__(self):
        return self.user.email + "-" + self.guild.name + "-" + self.role
    
    class Meta:
        unique_together = ('user', 'guild')

class GuildCode(models.Model):
    guild = models.ForeignKey(Guild, on_delete=models.CASCADE)
    code_uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    code = models.CharField(max_length=8, unique=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.code
    
    def save(self, *args, **kwargs):
        if not self.code:
            self.code = str(self.code_uuid)[:8]
        super().save(*args, **kwargs)
    
class GuildCharacter(models.Model):
    guild = models.ForeignKey(Guild, on_delete=models.CASCADE)
    character_class = models.CharField(choices=CharacterClass.choices, max_length=20)
    spec = models.CharField(choices=CharacterSpec.choices, max_length=20)
    role = models.CharField(choices=CharacterRole.choices, max_length=16)
    name = models.CharField(max_length=12)

    def __str__(self):
        return f"{self.name} - {self.character_class}"