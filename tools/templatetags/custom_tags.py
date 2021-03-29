from django import template
from oauth2client.service_account import ServiceAccountCredentials

register = template.Library()


@register.filter
def get_access_token():
    SCOPE = 'https://www.googleapis.com/auth/analytics.readonly'
    KEY_FILEPATH = 'ecplaza-67f2563cb042.json'
    return ServiceAccountCredentials.from_json_keyfile_name(KEY_FILEPATH, SCOPE).get_access_token().access_token


@register.filter('zip')
def _zip(list1, list2):
    return zip(list1, list2)
