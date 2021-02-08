from django.forms import (
    ModelForm, modelformset_factory, FileField, IntegerField, FileInput,
    NumberInput, BooleanField, CheckboxInput, CharField, HiddenInput, formset_factory, Form
)

from compare.models import Document

__all__ = [
    'DocumentForm', 'DocumentFormSet', 'HeaderSelectFormSet'
]


class DocumentForm(ModelForm):
    prefix = 'document'
    document = FileField(
        required=True,
        widget=FileInput(attrs={
            'accept': '.xls,.xlsx,.csv',
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
    filename = CharField(required=False, widget=HiddenInput())
    header_num = IntegerField(required=False, widget=HiddenInput())

    class Meta:
        fields = '__all__'


DocumentFormSet = modelformset_factory(
    Document,
    form=DocumentForm,
    fields='__all__',
    max_num=2,
    extra=1
)
HeaderSelectFormSet = formset_factory(
    form=HeaderSelectForm,
    max_num=2,
    extra=1
)
