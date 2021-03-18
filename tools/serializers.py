from rest_framework import serializers
from .models import Product, Catalog

__all__ = ['ProductSerializer', 'CatalogSerializer']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CatalogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Catalog
        fields = '__all__'
