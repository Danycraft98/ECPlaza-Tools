from django.forms import (
    ModelForm, modelformset_factory, FileField, IntegerField, FileInput,
    NumberInput, HiddenInput, Form
)

from compare.models import Document

__all__ = [
    'DocumentFormSet', 'HeaderSelectForm'
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
