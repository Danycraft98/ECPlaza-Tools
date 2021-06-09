import json

from django.utils.timezone import now
from rest_framework import serializers
from .models import *

__all__ = ['ProductSerializer', 'EventSerializer', 'RestaurantSerializer', 'ItemSerializer', 'CategorySerializer']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class DetailInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetailInfo
        exclude = ['item']


class DetailImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetailImage
        exclude = ['item']


class EventSerializer(serializers.ModelSerializer):
    detailInfo = DetailInfoSerializer(many=True, required=False)
    detailImage = DetailImageSerializer(many=True, required=False)

    class Meta:
        model = Event
        fields = '__all__'

    def create(self, validated_data):
        info_datalist, image_datalist = validated_data.pop('detailInfo', []), validated_data.pop('detailImage', [])
        event, exist = Event.objects.update_or_create(**validated_data, entered_date=now())
        [DetailInfo.objects.create(event=event, **info_data) for info_data in info_datalist]
        [DetailImage.objects.create(event=event, **image_data) for image_data in image_datalist]
        return event

    def update(self, instance, validated_data):
        info_datalist, image_datalist = validated_data.pop('detailInfo', []), validated_data.pop('detailImage', [])
        Event.objects.filter(contentid=instance.contentid).update(**validated_data, entered_date=now())
        for info_data in info_datalist:
            DetailInfo.objects.update_or_create(**info_data, item=instance)

        for image_data in image_datalist:
            print('image', dict(image_data))
            DetailImage.objects.update_or_create(**image_data, item=instance)
        return instance


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
