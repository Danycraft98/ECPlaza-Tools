from django.urls import path

from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('terms/', views.terms, name='terms'),
    path('policy/', views.policy, name='policy'),
]

handler403 = 'main.views.handler403'
handler404 = 'main.views.handler404'
handler410 = 'main.views.handler410'
