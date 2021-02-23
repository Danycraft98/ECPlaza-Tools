from itertools import repeat

from django.forms import Form, ChoiceField, Select, IntegerField, NumberInput

LANG_LIST = [('KorService', '한국어/국문 서비스'), ('EngService', '영어 서비스'), ('RusService', '러시아어/노어 서비스')]
CAT_LIST = [('searchFestival', '행사 정보 조회'), ('categoryCode', '서비스 분류 코드 조회'), ('detailImage', '이미지정보 조회')]
NUM_ROW_LIST = [list(repeat(10, 2)), list(repeat(20, 2)), list(repeat(30, 2))]


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
    numOfRows = ChoiceField(label='열 No.', choices=NUM_ROW_LIST, widget=Select(attrs={
        'class': 'form-select'
    }))

    class Meta:
        fields = '__all__'
