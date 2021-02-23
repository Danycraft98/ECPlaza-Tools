from django.urls import path

from . import views

urlpatterns = [
    path('compare/', views.compare, name='compare'),
    path('export/', views.export, name='export'),
    path('url_parse/', views.url_parse, name='url_parse')
]
