from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer


class TasksViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('status', 'priority')
    serializer_class = TaskSerializer
