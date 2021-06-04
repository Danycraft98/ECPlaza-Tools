from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'products', views.ProductViewSet, basename='product')
router.register(r'events', views.EventViewSet, basename='events')
router.register(r'restaurants', views.RestaurantViewSet, basename='restaurants')
router.register(r'items', views.ItemViewSet, basename='items')
router.register(r'categories', views.CategoryViewSet, basename='catalog')

urlpatterns = [
    # Tools URL
    path('compare/', views.compare, name='compare'),
    path('export/', views.export, name='export'),
    path('url_parse/', views.url_parse, name='url_parse'),
    path('tour/', views.tour_api, name='tour_api'),
    path('data/', views.big_data, name='big_data'),

    path('collection/<col_type>', views.collection, name='collection'),
    path('collection-coupang', views.collection_coupang, name='collection_coupang'),
    path('collection/<col_type>/form', views.collection_form, name='collection_form'),
    path('collection/<item_id>/delete', views.delete_collection, name='delete_collection'),

    path('collection-export', views.export_collection, name='export_collection'),
    path('data/export', views.export_words, name='export_words'),

    # Rest API URL
    path('api/v1/', include((router.urls, 'ecplaza-tools'), namespace='rest_api')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
