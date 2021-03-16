from itertools import repeat

from django.forms import *

from .models import Document

__all__ = [
    'DocumentFormSet', 'HeaderSelectForm', 'CurlForm', 'APP_LIST', 'CatalogForm', 'ProductForm', 'PostmanAPIForm'
]

APP_LIST = [
    list(repeat('Shopify', 2)),
    list(repeat('SAM.GOV', 2)),
    ('1688_L', '1688 List'), ('1688_D', '1688 Detail'),
    ('Coupang_L', 'Coupang List'), ('Coupang_D', 'Coupang Detail'),
    ('HT_L', 'Hot Tracks List'), ('HT_D', 'Hot Tracks Detail')
]

REQUEST_LIST = [list(repeat('GET', 2)), list(repeat('POST', 2))]
AUTH_LIST = [list(repeat('No Auth', 2)), list(repeat('Basic Auth', 2)), list(repeat('OAuth', 2))]


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
    username = CharField(required=False, widget=TextInput(attrs={
        'class': 'form-control'
    }))
    password = CharField(required=False,  widget=PasswordInput(attrs={
        'class': 'form-control'
    }))

    class Meta:
        fields = '__all__'


class PostmanAPIForm(Form):
    request = ChoiceField(required=False, choices=REQUEST_LIST, widget=Select(attrs={
        'class': 'form-select col-2'
    }))

    url = CharField(label='URL 링크', required=False, widget=TextInput(attrs={
        'class': 'form-control'
    }))
    text = CharField(
        label='HTML 텍스트', required=False,
        widget=Textarea(attrs={
            'aria-label': 'Text Input',
            'class': 'form-control'
        })
    )
    html_file = FileField(label='파일', required=False, widget=FileInput(attrs={
        'accept': '.html,.json,.xml',
        'aria-label': 'File Upload',
        'class': 'form-control'
    }))

    auth = ChoiceField(required=False, choices=AUTH_LIST, widget=Select(attrs={
        'class': 'form-select col-2'
    }))
    username = CharField(label='사용자 이름', required=False, widget=TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'username',
        'autocomplete': 'username'
    }))
    password = CharField(label='비밀번호', required=False, widget=PasswordInput(attrs={
        'class': 'form-control',
        'placeholder': 'password',
        'autocomplete': 'current-password'
    }))

    key = CharField(required=False, widget=TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'key'
    }))
    value = CharField(required=False, widget=TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'value'
    }))

    app_name = ChoiceField(label='앱이름', choices=APP_LIST, widget=RadioSelect(attrs={
        'class': 'form-check form-check-inline mr-2',
        'required': ''
    }))

    class Meta:
        fields = '__all__'
