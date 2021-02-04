from django.urls import path

from . import views

urlpatterns = [
    path('', views.url_parse, name='url_parse'),
]
