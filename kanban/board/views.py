from rest_framework import viewsets, generics
from rest_framework.views import APIView
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.models import User
from .serializers import TaskSerializer, UserSerializer
from .models import Task


class TasksViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class UsersViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class TaskListView(generics.ListCreateAPIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'task_list.html'

    def get(self, request):
        queryset = Task.objects.all()
        return Response({'tasks': queryset})


class TaskDetail(APIView):
    # renderer_classes = [TemplateHTMLRenderer]
    # template_name = 'task_detail.html'

    def get(self, request, pk):
        task = get_object_or_404(Task, pk=pk)
        serializer = TaskSerializer(task, context={'request': request})
        return Response({'serializer': serializer, 'task': task})

    def put(self, request, pk):
        task = get_object_or_404(Task, pk=pk)
        serializer = TaskSerializer(task, context={'request': request})
        if not serializer.is_valid():
            return Response({'serializer': serializer, 'task': task})
        task.save()
        return redirect('task_list')



# class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
#     renderer_classes = [TemplateHTMLRenderer]
#     template_name = 'task_detail.html'
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer
#
    # def get(self, request, pk):
    #     task = get_object_or_404(Task, pk=pk)
    #     serializer = TaskSerializer(task, context={'request': request})
    #     return Response({'serializer': serializer, 'task': task})
    #
    # def post(self, request, pk):
    #     task = get_object_or_404(Task, pk=pk)
    #     serializer = TaskSerializer(task, data=request.data, context={'request': request})
    #     if not serializer.is_valid():
    #         return Response({'serializer': serializer, 'task': task})
    #     task.save()
    #     return redirect('task_list')

    # def put(self, request, pk):
    #     task = get_object_or_404(Task, pk=pk)
    #     serializer = TaskSerializer(task, context={'request': request})
    #     return self.update(request, pk=pk)
