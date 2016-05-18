from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index_view, name='index'),
    url(r'^board/$', views.index_view, name="board"),
    url(r'^register/', views.register, name='register'),
]
