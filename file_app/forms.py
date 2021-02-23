from itertools import repeat

from django.forms import (
    URLField, Form, CharField, URLInput, TextInput, PasswordInput, FileInput, FileField, Textarea, ChoiceField, Select, ModelForm, modelformset_factory, IntegerField, NumberInput, HiddenInput
)

from .models import Document

__all__ = [
    'DocumentFormSet', 'HeaderSelectForm', 'CurlForm', 'APP_LIST', 'CatalogForm', 'ProductForm'
]

APP_LIST = [
    list(repeat('Shopify', 2)),
    list(repeat('SAM.GOV', 2)),
    list(repeat('1688 List', 2)), list(repeat('1688 Detail', 2)),
    list(repeat('Coupang List', 2)), list(repeat('Coupang Detail', 2)),
    list(repeat('Hot Tracks List', 2)), list(repeat('Hot Tracks Detail', 2)),
]


class DocumentForm(ModelForm):
    prefix = 'document'
    document = FileField(
        required=True, label='파일',
        widget=FileInput(attrs={
            'accept': '.xls,.csv,.xlsb',
            'aria-label': 'File Upload',
            'class': 'form-control'
        })
    )
    header = IntegerField(
        required=True, label='헤더 행# (첫 행=0)',
        widget=NumberInput(attrs={
            'class': 'form-control',
            'min': 0,
            'value': 0
        })
    )

    class Meta:
        model = Document
        fields = ['document', 'header']
        exclude = ['description', 'uploaded_at']


class HeaderSelectForm(Form):
    prefix = 'hs'
    file_id1 = IntegerField(widget=HiddenInput())
    header_num1 = IntegerField(widget=HiddenInput())
    file_id2 = IntegerField(widget=HiddenInput())
    header_num2 = IntegerField(widget=HiddenInput())

    class Meta:
        fields = '__all__'


DocumentFormSet = modelformset_factory(
    Document,
    form=DocumentForm,
    fields='__all__',
    min_num=2,
    max_num=2,
    extra=1
)


# -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
    value = ChoiceField(label='앱이름', choices=APP_LIST, widget=Select(attrs={
        'class': 'form-select',
        'required': ''
    }))
    username = CharField(required=False, label='사용자 이름', widget=TextInput(attrs={
        'class': 'form-control'
    }))
    password = CharField(required=False, label='비밀번호', widget=PasswordInput(attrs={
        'class': 'form-control'
    }))

    class Meta:
        fields = '__all__'
