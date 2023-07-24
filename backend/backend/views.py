from django.contrib.auth import User
from django.http import HttpResponse
from rest_framework.decorators import api_view

@api_view(['POST'])
def createUser(request):
	if request.method == 'POST':
		username = request.POST.get('username')
		password = request.POST.get('password')
		user = User.objects.create_user(username=username, password=password)
		user.save()
		return HttpResponse('User created successfully')
	else:
		return HttpResponse('User creation failed')