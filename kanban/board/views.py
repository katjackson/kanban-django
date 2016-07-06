from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from rest_framework import viewsets
from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import TaskSerializer, UserSerializer
from .models import Task
from .forms import TaskForm


class TasksViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('priority')
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.all().order_by('priority')
        owner = self.request.query_params.get('owner', None)
        status = self.request.query_params.get('status', None)
        priority = self.request.query_params.get('priority', None)
        if owner:
            queryset = queryset.filter(owner=User.objects.get(id=owner))
        if status:
            queryset = queryset.filter(status=status)
        if priority:
            queryset = queryset.filter(priority=priority)
        return queryset


class UsersViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


def index_view(request):
    user = request.user
    form = TaskForm()
    return render(request, 'index.html', {'user': user, 'form': form})


def register(request):
    if request.method == 'POST':
        user_form = UserCreationForm(request.POST)
        if user_form.is_valid():
            user_form.save()
            u = authenticate(username=request.POST['username'], password=request.POST['password1'])
            login(request, u)

            return HttpResponseRedirect("/board/")
        else:
            print(user_form.errors)
    else:
        user_form = UserCreationForm()

    context = {'user_form': user_form}
    return render(request, "registration/register.html", context)
