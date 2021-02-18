from itertools import repeat

from django.forms import (
    URLField, Form, CharField, URLInput, TextInput, PasswordInput, FileInput, FileField, Textarea, ChoiceField, Select, ModelForm
)

__all__ = [
    'CurlForm', 'APP_LIST', 'CatalogForm', 'ProductForm'
]

APP_LIST = [
    list(repeat('Shopify', 2)),
    list(repeat('1688 List', 2)), list(repeat('1688 Detail', 2)),
    list(repeat('Coupang List', 2)), list(repeat('Coupang Detail', 2)),
    list(repeat('Hot Tracks List', 2)), list(repeat('Hot Tracks Detail', 2)),
]


class CatalogForm(ModelForm):
    pass


class ProductForm(ModelForm):
    pass


class CurlForm(Form):
    link = URLField(required=False, label='URL 링크', widget=URLInput(attrs={
        'class': 'form-control',
        'placeholder': '예시: https://1688.com',
        'pattern': 'https://.*'
    }))
    text = CharField(
        required=False, label='HTML 텍스트',
        widget=Textarea(attrs={
            'aria-label': 'Text Input',
            'class': 'form-control'
        })
    )
    html_file = FileField(required=False, label='파일', widget=FileInput(attrs={
        'accept': '.html,.json,.xml',
        'aria-label': 'File Upload',
        'class': 'form-control'
    }))
    value = ChoiceField(required=True, label='앱이름', choices=APP_LIST, widget=Select(attrs={
        'class': 'form-select',
    }))
    username = CharField(required=False, label='사용자 이름', widget=TextInput(attrs={
        'class': 'form-control'
    }))
    password = CharField(required=False, label='비밀번호', widget=PasswordInput(attrs={
        'class': 'form-control'
    }))

    class Meta:
        fields = '__all__'
