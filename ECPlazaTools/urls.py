"""ECPlazaTools URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from ECPlazaTools import views
# from ECPlazaTools.views import ChatterBotAppView, ChatterBotApiView

router = routers.DefaultRouter()
router.register(r'^$', views.ChatterBotAppView, basename='main')
# router.register(r'^api/chatterbot/', views.ChatterBotApiView, basename='chatterbot')

urlpatterns = [
    # Main URL
    path('', views.index, name='index'),
    path('', include('tools.urls')),
    path('token/', views.token, name='token'),

    # Official Document URL
    path('instructions/', views.instructions, name='instructions'),
    path('terms/', views.terms, name='terms'),
    path('policy/', views.policy, name='policy'),

    # Account URL
    path('accounts/', include('accounts.urls')),
    path('admin/', admin.site.urls),

    # Chatterbot URL
    path('', include((router.urls, 'ecplaza-tools'), namespace='chatterbot'))
]

handler403 = 'ECPlazaTools.views.handler403'
handler404 = 'ECPlazaTools.views.handler404'
handler410 = 'ECPlazaTools.views.handler410'
