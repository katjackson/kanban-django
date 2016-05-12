from rest_framework import viewsets
from .models import Task
from django.contrib.auth.models import User
from .serializers import TaskSerializer, UserSerializer


class TasksViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
