import os

from django.forms import *

from .models import Document
from .constants import *

__all__ = [
    'DocumentFormSet', 'HeaderSelectForm', 'PostmanAPIForm', 'TourAPIForm'
]


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


# ---------------------------------------------------------------------------------------------------------------------------------------------------------


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


# ---------------------------------------------------------------------------------------------------------------------------------------------------------
class PostmanAPIForm(Form):
    request = ChoiceField(required=False, choices=REQUEST_LIST, widget=Select(attrs={'class': 'col-2'}))

    url = URLField(label='URL 링크', required=False, widget=URLInput())
    html_file = FileField(label='파일 (이름 형식: app.<store_name>.<other>.html; 예: app.hottracks.detail.html 또는 app.hottracks.list.html)', required=False, widget=FileInput(attrs={
        'accept': 'text/html', 'aria-label': 'File Upload'
    }))

    excel_file = FileField(label='파일 (이름 형식: app.<store_name>.<other>.csv; 예: app.hottracks.detail.csv 또는 app.hottracks.list.csv)', required=False, widget=FileInput(attrs={
        'accept': '.csv', 'aria-label': 'File Upload'
    }))

    username = CharField(label='사용자 이름', required=False, widget=TextInput(attrs={
        'placeholder': 'username', 'autocomplete': 'username'
    }))
    password = CharField(label='비밀번호', required=False, widget=PasswordInput(attrs={
        'placeholder': 'password', 'autocomplete': 'current-password'
    }))

    key = CharField(required=False, widget=TextInput(attrs={'class': 'form-control', 'placeholder': 'key'}))
    value = CharField(required=False, widget=TextInput(attrs={'class': 'form-control', 'placeholder': 'value'}))

    class Meta:
        fields = '__all__'


# ---------------------------------------------------------------------------------------------------------------------------------------------------------
class TourAPIForm(Form):
    service = ChoiceField(label='언어 서비스', choices=LANG_LIST, widget=Select())
    area = ChoiceField(label='분야', choices=CAT_LIST, widget=Select())
    pageNo = IntegerField(required=False, label='페이지 No.', widget=NumberInput(attrs={'min': 1, 'value': 1}))
    numOfRows = IntegerField(label='열 No.', widget=ListTextWidget(data_list=NUM_ROW_LIST, name='numOfRows', attrs={'min': 2}))

    eventStartDate = CharField(required=False, label='행사 날짜 범위', widget=TextInput())
    eventEndDate = CharField(required=False, label='행사 종료일', widget=TextInput())

    cat1 = ChoiceField(label='대분류', widget=Select(attrs={'size': '4', 'onchange': "getTourInfoXML(key, details, '&cat1=' + $(this).val(), getCat);"}))
    cat2 = ChoiceField(label='중분류', widget=Select(attrs={'size': '4', 'onchange': "getTourInfoXML(key, details, '&cat1=' + $('#id_cat1').val() + '&cat2=' + $(this).val(), getCat);"}))
    cat3 = ChoiceField(label='소분류', widget=Select(attrs={'size': '4'}))

    contentTypeId = ChoiceField(
        label='콘텐츠 타입 ID', choices=CONTENT_TYPE_LIST,
        widget=Select(attrs={
            'size': '4', 'onchange': "getTourInfoXML('" + os.getenv('TOUR_API_KEY') + "', {service: 'KorService', area: 'areaBasedList', numOfRows: '100', pageNo: '1', contentTypeId: this}, '', getContentId);"
        }))
    contentId = ChoiceField(label='콘텐츠 ID', widget=Select(attrs={'size': '4'}))
