from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

# Create a router and register our viewsets with it.
router = DefaultRouter()
# router.register(r'Profile', ProfileViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    path('Permission/', PermissionView),
    path('Install/', InstallView),
    # path('CreateUser/', CreateUserView.as_view()),
]