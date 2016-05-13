# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-12 20:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='priority',
            field=models.IntegerField(choices=[(1, 'High'), (2, 'Moderate'), (3, 'Low')], default=2),
        ),
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.IntegerField(choices=[(1, 'Backlog'), (2, 'Ready'), (3, 'In Progress'), (4, 'Complete')], default=1),
        ),
    ]