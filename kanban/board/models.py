from django.db import models

class Task(models.Model):
    priority_choices = [('High', 1), ('Moderate', 2), ('Low', 3)]
    status_choices = [('Backlog', 1), ('Ready', 2), ('In Progress', 3), ('Complete', 4)]

    title = models.CharField(max_length=150)
    status = models.IntegerField(choices=status_choices, default=1)
    priority = models.IntegerField(choices=priority_choices, default=2)
    description = models.TextField(max_length=1250)
