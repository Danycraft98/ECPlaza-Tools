from django import forms
from django.core.exceptions import ValidationError
from django.forms import inlineformset_factory, modelformset_factory

from api.models import *

__all__ = [
    'DiseaseFormSet', 'ScoreFormSet', 'FunctionalFormSet', 'EvidenceFormSet',
    'PathItemFormSet', 'ReportFormSet'
]


# Base Forms------------------------------------------------------------------------------------------------------
class BaseForm(forms.ModelForm):

    def _clean_fields(self):
        for name, field in self.fields.items():
            if field.disabled:
                value = self.get_initial_for_field(field, name)
            else:
                value = field.widget.value_from_datadict(self.data, self.files, self.add_prefix(name))

            try:
                if isinstance(field, forms.FileField):
                    initial = self.get_initial_for_field(field, name)
                    value = field.clean(value, initial)
                else:
                    value = field.clean(value)

                self.cleaned_data[name] = value
                if hasattr(self, 'clean_%s' % name):
                    value = getattr(self, 'clean_%s' % name)()
                    self.cleaned_data[name] = value

            except ValidationError as e:
                self.add_error(name, e)

    def clean(self):
        super(BaseForm, self).clean()
        return self.cleaned_data


class DiseaseForm(BaseForm):
    id = forms.CharField(required=False, widget=forms.HiddenInput())
    child_id = forms.CharField(required=False, widget=forms.HiddenInput())
    prefix = 'dx_'

    class Meta:
        model = Disease
        fields = '__all__'


class EvidenceForm(BaseForm):
    key = forms.BooleanField(required=False, widget=forms.CheckboxInput(attrs={
        'class': 'form-check-input',
        'onclick': 'select_evidence(this)'
    }))
    id = forms.CharField(required=False, widget=forms.HiddenInput())
    prefix = 'evid_'

    class Meta:
        model = Evidence
        fields = [
            'id', 'source_type', 'source_id', 'statement'
        ]
        exclude = ['DELETE', 'key']

    def clean(self):
        super(EvidenceForm, self).clean()
        return self.cleaned_data


class ReportForm(BaseForm):
    id = forms.CharField(required=False, widget=forms.HiddenInput())
    prefix = 'report_'

    class Meta:
        model = Report
        fields = '__all__'
        exclude = ['DELETE', 'evidence', 'key']

    def clean(self):
        super(ReportForm, self).clean()
        return self.cleaned_data


class DiseaseFormSet(modelformset_factory(
    Disease,
    form=DiseaseForm,
    fields='__all__',
    min_num=1,
    extra=1
)):

    def get_queryset(self):
        return super(DiseaseFormSet, self).get_queryset().order_by('branch')


EvidenceFormSet = modelformset_factory(
    Evidence,
    form=EvidenceForm,
    fields='__all__',
    min_num=1,
    extra=1
)
ReportFormSet = modelformset_factory(
    Report,
    form=ReportForm,
    fields='__all__',
    min_num=1,
    extra=6,
)


# Somatic Oncogenicity ------------------------------------------------------------------------------------------
class FunctionalForm(BaseForm):
    prefix = 'func_'

    class Meta:
        model = Functional
        fields = '__all__'

    def clean(self):
        super(FunctionalForm, self).clean()
        return self.cleaned_data


FunctionalFormSet = inlineformset_factory(
    Disease,
    Functional,
    form=FunctionalForm,
    min_num=1,
    extra=1
)


# Germline Pathogenicity------------------------------------------------------------------------------------------
class ScoreForm(BaseForm):
    for_score = forms.CharField(required=False, label='For Pathogenicity', widget=forms.TextInput(attrs={
        'class': 'form-control',
        'readonly': ''
    }))
    against_score = forms.CharField(required=False, label='Against Pathogenicity', widget=forms.TextInput(attrs={
        'class': 'form-control',
        'readonly': ''
    }))
    content = forms.CharField(required=False, label='ACMG Classification', widget=forms.TextInput(attrs={
        'class': 'form-control',
        'readonly': ''
    }))
    prefix = 'score_'

    class Meta:
        model = Score
        fields = '__all__'


class PathItemForm(BaseForm):
    key = forms.BooleanField(required=False, widget=forms.CheckboxInput(attrs={
        'class': 'form-check-input',
        'value': 'False'
    }))
    value = forms.CharField(required=False, widget=forms.HiddenInput())
    content = forms.CharField(required=False, widget=forms.TextInput(attrs={
        'class': 'form-control',
    }))
    prefix = 'item_'

    class Meta:
        model = PathItem
        fields = '__all__'

    def clean(self):
        super(PathItemForm, self).clean()
        return self.cleaned_data


ScoreFormSet = inlineformset_factory(
    Disease,
    Score,
    form=ScoreForm,
    min_num=1,
    extra=1
)
PathItemFormSet = inlineformset_factory(
    PathItem, Evidence,
    form=PathItemForm,
    fields='__all__',
    extra=29
)
