from django import template
from oauth2client.service_account import ServiceAccountCredentials

from tools.models import Category

register = template.Library()


@register.filter
def get_access_token():
    SCOPE = 'https://www.googleapis.com/auth/analytics.readonly'
    KEY_FILEPATH = 'ecplaza-67f2563cb042.json'
    return ServiceAccountCredentials.from_json_keyfile_name(KEY_FILEPATH, SCOPE).get_access_token().access_token


@register.filter('zip')
def _zip(list1, list2):
    return zip(list1, list2)


@register.filter
def get_verbose(name):
    switch_dict = {'category': '카테고리', 'ss_id': '스마트스토어 샵ID', 'mall_id': 'MALL ID', 'url': 'URL', 'notes': '비고',
                   'quantity': '상품 갯수', 'date_entered': '반영일', 'date_updated': '등록일', 'edit': '반영여부', 'delete': '삭제여부'}
    return switch_dict.get(name, '')


@register.filter
def get_cat(cat_id):
    try:
        return Category.objects.get(cat_id=cat_id)
    except Category.DoesNotExist:
        return Category.objects.none()
