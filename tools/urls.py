from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'products', views.ProductViewSet, basename='product')
router.register(r'tour_infos', views.TourInfoViewSet, basename='tour_info')
router.register(r'items', views.ItemViewSet, basename='items')
router.register(r'categories', views.CategoryViewSet, basename='catalog')

urlpatterns = [
    # Tools URL
    path('compare/', views.compare, name='compare'),
    path('export/', views.export, name='export'),
    path('url_parse/', views.url_parse, name='url_parse'),
    path('tour/', views.tour_api, name='tour_api'),
    path('collection/<col_type>', views.collection, name='collection'),
    path('collection/<col_type>/form', views.collection_form, name='collection_form'),
    path('collection/<item_id>/delete', views.delete_collection, name='delete_collection'),

    # Rest API URL
    path('upload/', views.upload_file, name='upload_file'),
    path('data/', views.read_data_file, name='read_file'),
    path('api/v1/', include((router.urls, 'ecplaza-tools'), namespace='rest_api')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
