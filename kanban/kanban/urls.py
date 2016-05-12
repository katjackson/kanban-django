from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from board import views

router = routers.DefaultRouter()
router.register(r'tasks', views.TasksViewSet)
router.register(r'users', views.UsersViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),
]
