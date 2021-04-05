from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'products', views.ProductViewSet, basename='product')
router.register(r'catalogs', views.CatalogViewSet, basename='catalog')

urlpatterns = [
    # Tools URL
    path('compare/', views.compare, name='compare'),
    path('export/', views.export, name='export'),
    path('url_parse/', views.url_parse, name='url_parse'),
    path('tour/', views.tour_api, name='tour_api'),

    # Rest API URL
    path('upload/', views.upload_file, name='upload_file'),
    path('data/', views.read_file, name='read_file'),
    path('v1/', include((router.urls, 'ecplaza-tools'), namespace='rest_api')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
