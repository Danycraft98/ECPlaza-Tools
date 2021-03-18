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
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include

from ECPlazaTools import views
# from ECPlazaTools.views import ChatterBotAppView, ChatterBotApiView

urlpatterns = [
    path('', views.index, name='index'),
    path('token/', views.token, name='token'),
    path('terms/', views.terms, name='terms'),
    path('policy/', views.policy, name='policy'),

    path('accounts/', include('accounts.urls')),
    path('admin/', admin.site.urls),
    path('file_app/', include('file_app.urls')),
    path('api/', include('api.urls')),

    # url(r'^$', ChatterBotAppView.as_view(), name='main'),
    # url(r'^api/chatterbot/', ChatterBotApiView.as_view(), name='chatterbot'),
]

handler403 = 'ECPlazaTools.views.handler403'
handler404 = 'ECPlazaTools.views.handler404'
handler410 = 'ECPlazaTools.views.handler410'
