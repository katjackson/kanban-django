from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    priority_choices = [(1, 'High'), (2, 'Moderate'), (3, 'Low')]
    status_choices = [(1, 'Backlog'), (2, 'Ready'), (3, 'In Progress'), (4, 'Complete')]

    title = models.CharField(max_length=150)
    status = models.IntegerField(choices=status_choices, default=1)
    priority = models.IntegerField(choices=priority_choices, default=2)
    description = models.TextField(max_length=1250)
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', related_name='tasks')

    class Meta:
        ordering = ('status', 'priority', 'created')
