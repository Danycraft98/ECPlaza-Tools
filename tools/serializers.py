from rest_framework import serializers
from .models import Item, Category, Product, TourInfo

__all__ = ['ProductSerializer', 'TourInfoSerializer', 'ItemSerializer', 'CategorySerializer']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class TourInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourInfo
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
