from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from rest_framework import viewsets
from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import TaskSerializer, UserSerializer
from .models import Task
from .forms import TaskForm


class TasksViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


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
            new_user = user_form.save()
            return HttpResponseRedirect("/board/")
        else:
            print(user_form.errors)
    else:
        user_form = UserCreationForm()

    context = {'user_form': user_form}
    return render(request, "registration/register.html", context)
