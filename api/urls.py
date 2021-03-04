from django.urls import path

from . import views

urlpatterns = [
    path('tour/', views.tour_api, name='tour_api'),
    path('traffic/', views.traffic, name='traffic'),
]
