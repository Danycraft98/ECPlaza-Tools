from itertools import repeat

from django.forms import *
from django.forms.widgets import Input

from .models import Document

__all__ = [
    'DocumentFormSet', 'HeaderSelectForm', 'CurlForm', 'APP_LIST', 'CatalogForm', 'ProductForm', 'PostmanAPIForm', 'TourAPIForm'
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
LANG_LIST = [('KorService', '한국어/국문 서비스'), ('EngService', '영어 서비스'), ('RusService', '러시아어/노어 서비스')]
CAT_LIST = [('searchFestival', '행사 정보 조회'), ('categoryCode', '서비스 분류 코드 조회'), ('areaBasedList', '지역기반 관광정보 조회')]
NUM_ROW_LIST = [list(repeat(10, 2)), list(repeat(20, 2)), list(repeat(30, 2))]


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
    Document, form=DocumentForm, fields='__all__',
    min_num=2, max_num=2, extra=1
)


# -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
class CatalogForm(ModelForm):
    pass


class ProductForm(ModelForm):
    pass


class CurlForm(Form):
    username = CharField(required=False, widget=TextInput(attrs={'class': 'form-control'}))
    password = CharField(required=False, widget=PasswordInput(attrs={'class': 'form-control'}))

    class Meta:
        fields = '__all__'


class PostmanAPIForm(Form):
    request = ChoiceField(required=False, choices=REQUEST_LIST, widget=Select(attrs={'class': 'form-select col-2'}))

    url = CharField(label='URL 링크', required=False, widget=TextInput(attrs={'class': 'form-control'}))
    text = CharField(
        label='HTML 텍스트', required=False,
        widget=Textarea(attrs={'aria-label': 'Text Input', 'class': 'form-control'})
    )
    html_file = FileField(label='파일', required=False, widget=FileInput(attrs={
        'accept': '.html,.json,.xml',
        'aria-label': 'File Upload',
        'class': 'form-control'
    }))

    auth = ChoiceField(required=False, choices=AUTH_LIST, widget=Select(attrs={'class': 'form-select col-2'}))
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

    key = CharField(required=False, widget=TextInput(attrs={'class': 'form-control', 'placeholder': 'key'}))
    value = CharField(required=False, widget=TextInput(attrs={'class': 'form-control', 'placeholder': 'value'}))
    app_name = ChoiceField(label='앱이름', choices=APP_LIST, widget=RadioSelect(attrs={'class': 'form-check form-check-inline mr-2', 'required': ''}))

    class Meta:
        fields = '__all__'


# -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

class ListTextWidget(NumberInput):
    def __init__(self, data_list, name, *args, **kwargs):
        super(ListTextWidget, self).__init__(*args, **kwargs)
        self._name = name
        self._list = data_list
        self.attrs.update({'list': 'list__%s' % self._name})

    def render(self, name, value, attrs=None, renderer=None):
        text_html = super(ListTextWidget, self).render(name, value, attrs=attrs)
        data_list = '<datalist id="list__%s">' % self._name
        for item in self._list:
            data_list += '<option value="%s">%s</option>' % (item[0], item[1])
        data_list += '</datalist>'

        return text_html + data_list


class TourAPIForm(Form):
    service = ChoiceField(label='언어 서비스', choices=LANG_LIST, widget=Select(attrs={
        'class': 'form-select'
    }))
    area = ChoiceField(label='분야', choices=CAT_LIST, widget=Select(attrs={
        'class': 'form-select'
    }))
    pageNo = IntegerField(
        required=False, label='페이지 No.',
        widget=NumberInput(attrs={
            'class': 'form-control',
            'min': 1,
            'value': 1
        })
    )
    numOfRows = IntegerField(label='열 No.', widget=ListTextWidget(data_list=NUM_ROW_LIST, name='numOfRows', attrs={'min': 1, 'class': 'form-select'}))
    eventStartDate = CharField(required=False, label='행사 날짜 범위', widget=TextInput(attrs={'class': 'form-control'}))
    eventEndDate = CharField(required=False, label='행사 종료일', widget=TextInput(attrs={'class': 'form-control'}))
    cat1 = ChoiceField(label='대분류', widget=Select(attrs={
        'class': 'form-select',
        'size': '4',
        'onchange': "getTourInfo(key, details, '&cat1=' + $(this).val(), getCat);"
    }))
    cat2 = ChoiceField(label='중분류', widget=Select(attrs={
        'class': 'form-select',
        'size': '4',
        'onchange': "getTourInfo(key, details, '&cat1=' + $('#id_cat1').val() + '&cat2=' + $(this).val(), getCat);"
    }))
    cat3 = ChoiceField(label='소분류', widget=Select(attrs={
        'class': 'form-select',
        'size': '4',
        'onchange': ''
    }))
    contentId = ChoiceField(label='콘텐츠 ID', widget=Select(attrs={
        'class': 'form-select',
        'size': '4',
    }))

    class Meta:
        fields = '__all__'
