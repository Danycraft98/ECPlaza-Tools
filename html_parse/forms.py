from django.forms import (
    URLField, Form, CharField, URLInput, TextInput, PasswordInput, FileInput, FileField
)

__all__ = [
    'CurlForm'
]


class CurlForm(Form):
    link = URLField(required=False, label='URL 링크', widget=URLInput(attrs={
        'class': 'form-control',
        'placeholder': '예시: https://1688.com',
        'pattern': 'https://.*'
    }))
    html_file = FileField(required=False, widget=FileInput(attrs={
        'accept': '.html,.json,.xml',
        'aria-label': 'File Upload',
        'class': 'form-control'
    }))
    value = CharField(required=True, label='앱이름', widget=TextInput(attrs={
        'class': 'form-select',
        'list': 'value'
    }))
    username = CharField(required=False, label='사용자 이름', widget=TextInput(attrs={
        'class': 'form-control'
    }))
    password = CharField(required=False, label='비밀번호', widget=PasswordInput(attrs={
        'class': 'form-control'
    }))

    class Meta:
        fields = '__all__'
