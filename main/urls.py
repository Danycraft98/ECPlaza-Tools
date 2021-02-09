from django.urls import path

from . import views


urlpatterns = [
    path('', views.index, name='index'),
]

handler403 = 'main.views.handler403'
handler404 = 'main.views.handler404'
handler410 = 'main.views.handler410'
