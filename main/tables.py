from django_tables2.utils import A
import django_tables2 as tables
import datetime

from api.models import *

__all__ = [
    'add_evidence', 'GeneTable', 'GeneCardTable', 'VariantTable', 'VariantCardTable',
    'DiseaseTable', 'DiseaseCardTable', 'HistoryTable'
]


def add_evidence(request, prefix, dx_id, variant, item=None):
    for i, (e_id, source_type, source_id, statement) in enumerate(zip(request.POST.getlist(prefix + '_id'), request.POST.getlist(prefix + '_st'), request.POST.getlist(prefix + '_s'), request.POST.getlist(prefix + '_e'))):
        evid_dict = {'source_type': source_type, 'source_id': source_id, 'statement': statement}

        comp_result = None
        if e_id.isdigit():
            is_update = True
            evidence = Evidence.objects.get(pk=e_id)
            old_evidence = dict(evidence.__dict__)
            comp_result = {k: None if old_evidence[k] == evid_dict[k] else evid_dict[k] for k in evid_dict}
            Evidence.objects.filter(pk=e_id).update(**evid_dict)
        else:
            is_update = False
            sub_item = Evidence.objects.create(disease=dx_id, **evid_dict)
            if item.__class__.__name__ == 'PathItem':
                Evidence.objects.filter(pk=sub_item.pk).update(item=item)
            elif item.__class__.__name__ == 'Functional':
                Evidence.objects.filter(pk=sub_item.pk).update(functional=item)
            evidence = Evidence.objects.get(pk=sub_item.pk)

        if request.POST.getlist(prefix + '_sig'):
            form_dict = {
                'level': request.POST.getlist(prefix + '_level')[i], 'evid_sig': request.POST.getlist(prefix + '_sig')[i],
                'evid_dir': request.POST.getlist(prefix + '_dir')[i], 'clin_sig': request.POST.getlist(prefix + '_clin_sig')[i],
                'drug_class': request.POST.getlist(prefix + '_drug')[i], 'evid_rating': request.POST.getlist(prefix + '_rating')[i]
            }

            if evidence.subevidences.count() > 0:
                evidence.subevidences.update(**form_dict, evidence=evidence)

            else:
                SubEvidence.objects.create(**form_dict, evidence=evidence)

        if (is_update and any(comp_result[key] for key in evid_dict.keys())) or not is_update:
            History.objects.create(content=statement, object=evidence, user=request.user, timestamp=datetime.datetime.now(), variant=variant)


# Index Mini Card Tables
class GeneCardTable(tables.Table):
    name = tables.LinkColumn('gene', args=[A('name')], text=lambda record: record.name, empty_values=())
    variants = tables.TemplateColumn('{{ record.variants.count }} variant(s)', verbose_name='Variants')

    class Meta:
        model = Gene
        orderable = False
        sequence = ('name', 'variants')
        exclude = ('id', 'exon', 'pub_date', 'content', 'germline_content')
        attrs = {'class': 'table table-striped table-hover'}


class VariantCardTable(tables.Table):
    protein = tables.LinkColumn('variant_text', args=[A('gene.name'), A('protein')], text=lambda record: record.protein, empty_values=())
    diseases = tables.TemplateColumn('{{ record.diseases.count }} disease(s)', verbose_name='Diseases')

    class Meta:
        model = Variant
        orderable = False
        # order_by = ('-history',)
        sequence = ('protein', 'diseases')
        exclude = ('id', 'gene', 'chr', 'cdna', 'transcript', 'genome_build', 'consequence',
                   'start', 'end', 'alt', 'ref', 'exonic_function', 'content', 'germline_content', 'af',
                   'af_popmax', 'cosmic70', 'clinvar', 'insilicodamaging', 'insilicobenign', 'polyphen2_hdiv_pred',
                   'polyphen2_hvar_pred', 'sift_pred', 'mutationtaster_pred', 'mutationassessor_pred', 'provean_pred',
                   'lrt_pred', 'tcga', 'oncokb', 'oncokb_pmids', 'watson', 'watson_pmids', 'qci', 'qci_pmids',
                   'jaxckb', 'jaxckb_pmids', 'pmkb', 'pmkb_citations', 'civic', 'google', 'alamut')
        attrs = {'class': 'table table-striped table-hover'}
        row_attrs = {
            'title': lambda record: '\n'.join([disease.name + ': [' + disease.get_reviewed_display() + ', ' + disease.branch.upper() + ']' for disease in record.diseases.all()])
            if record.diseases.count() > 0 else 'No Disease'
        }


class DiseaseCardTable(tables.Table):
    evidences = tables.TemplateColumn('{{ record.evidences.count }} evidence(s)', verbose_name='Evidences')

    class Meta:
        model = Disease
        orderable = False
        sequence = ('name', 'branch', 'evidences')
        exclude = ('id', 'functionals', 'others', 'report', 'variant', 'reviewed', 'reviewed_date', 'review_user',
                   'meta_reviewed_date', 'meta_review_user', 'approved_date', 'approve_user')
        attrs = {
            'class': 'table table-striped table-hover',
            'style': 'display: block; overflow: auto;'
        }


# Main Index Tables
class GeneTable(tables.Table):
    name = tables.LinkColumn('gene', args=[A('name')], text=lambda record: record.name, empty_values=())
    variants = tables.TemplateColumn('{{ record.variants.count }} variant(s)', verbose_name='Variants')

    class Meta:
        model = Gene
        orderable = False
        sequence = ('name', 'variants')
        exclude = ('id', 'exon', 'pub_date', 'content', 'germline_content')
        attrs = {'class': 'dataTable nowrap table table-striped table-hover'}


class VariantTable(tables.Table):
    edit = tables.LinkColumn('variant', args=[A('gene__name'), A('protein')], text='edit', empty_values=())
    variant_detail = tables.LinkColumn('variant_text', args=[A('gene.name'), A('protein')], text='detail', empty_values=())
    diseases = tables.TemplateColumn('{{ record.diseases.count }} disease(s)', verbose_name='Diseases')
    history = tables.TemplateColumn('{{ record.history.first.timestamp }}', verbose_name='Upload Date')
    recent = tables.TemplateColumn('{{ record.history.last.timestamp }}', verbose_name='Last Modified Date')

    class Meta:
        model = Variant
        orderable = True
        # order_by = ('-history',)
        sequence = ('edit', 'variant_detail', 'gene', 'chr', 'cdna', 'protein', 'transcript')
        exclude = ('id', 'genome_build', 'consequence', 'exonic_function', 'content',
                   'germline_content', 'af', 'af_popmax', 'cosmic70', 'clinvar', 'insilicodamaging',
                   'insilicobenign', 'polyphen2_hdiv_pred', 'polyphen2_hvar_pred', 'sift_pred',
                   'mutationtaster_pred', 'mutationassessor_pred', 'provean_pred', 'lrt_pred', 'tcga',
                   'oncokb', 'oncokb_pmids', 'watson', 'watson_pmids', 'qci', 'qci_pmids', 'jaxckb',
                   'jaxckb_pmids', 'pmkb', 'pmkb_citations', 'civic', 'google', 'alamut')
        attrs = {'class': 'dataTable nowrap table table-striped table-hover'}
        row_attrs = {
            'title': lambda record: '\n'.join([disease.name + ': [' + disease.get_reviewed_display() + ', ' + disease.branch.upper() + ']' for disease in record.diseases.all()])
            if record.diseases.count() > 0 else 'No Disease'
        }

    @staticmethod
    def class_type():
        return 'Variant'


class DiseaseTable(tables.Table):
    disease = tables.CheckBoxColumn(checked=True, accessor='name', attrs={'th__input': {'checked': 'checked', 'id': 'selectAll'}})
    functionals = tables.TemplateColumn('{{ record.functionals.count }} functional(s)', verbose_name='Functionals')
    evidences = tables.TemplateColumn('{{ record.evidences.count }} evidence(s)', verbose_name='Evidences')

    class Meta:
        model = Disease
        orderable = False
        sequence = ('disease', 'name', 'functionals', 'evidences')
        exclude = ('id', 'report', 'variant')
        attrs = {
            'class': 'nowrap table table-striped table-hover',
            'style': 'display: block; overflow: auto;'
        }

    @staticmethod
    def class_type():
        return 'Disease'


class HistoryTable(tables.Table):
    class Meta:
        model = History
        orderable = False
        order_by = '-timestamp'
        sequence = ('timestamp', 'object', 'content', 'user')
        exclude = ('id', 'variant')
        attrs = {'class': 'nowrap table table-striped table-hover'}
