from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task

class TaskSerializer(serializers.HyperlinkedModelSerializer):
    priority = serializers.ChoiceField(choices=Task.priority_choices)
    status = serializers.ChoiceField(choices=Task.status_choices)

    class Meta:
        model = Task
        fields = ('url', 'id', 'title', 'status', 'priority', 'description', 'owner')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    full_name = serializers.CharField(source='get_full_name', read_only=True)

    class Meta:
        model = User
        fields = ('url', 'id', User.USERNAME_FIELD, 'full_name', 'is_active')
