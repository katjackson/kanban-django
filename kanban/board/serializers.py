from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    priority = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    def get_priority(self, obj):
        return obj.get_priority_display()

    def get_status(self, obj):
        return obj.get_status_display()

    class Meta:
        model = Task
        fields = ('url', 'id', 'title', 'status', 'priority', 'description')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email')
