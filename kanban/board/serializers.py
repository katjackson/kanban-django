from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    priority = serializers.ChoiceField(choices=Task.priority_choices)
    status = serializers.ChoiceField(choices=Task.status_choices)

    class Meta:
        model = Task
        fields = ('url', 'id', 'title', 'status', 'priority', 'description')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email')
