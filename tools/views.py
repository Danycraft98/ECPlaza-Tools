import os
import re
from datetime import datetime

import pandas as pd
from django.core import serializers
from django.template.defaultfilters import filesizeformat
from django.contrib.auth.decorators import login_required
from django.forms import forms
from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect
from django.utils import timezone
from rest_framework import viewsets

from ECPlazaTools.settings import STATICFILES_DIRS, ECP_API_URL, ECP_HT_URL, ECP_TOUR_URL, FILE_UPLOAD_MAX_MEMORY_SIZE, BASE_DIR
from .constants import CAT_LIST, CAT_DETAIL_LIST

from .forms import *
from .functions import *
from .models import *
from .serializers import *
from .tables import *

TITLE1 = ('pe-7s-copy-file', '파일비교 애플리케이션', '파일 내역을 비교하는 애플리케이션')


# Compare -----------------------------------------------------------------------------------
@login_required
def compare(request):
    step, header_dict, values = 'start', [], {}
    doc_forms = DocumentFormset(request.POST or None, request.FILES or None, queryset=Document.objects.none())
    hs_form = HeaderSelectForm(request.POST or None, request.FILES or None)
    if request.method == 'POST':
        if hs_form.is_valid():
            step, compare_dict, dataframes, doc_objs = 'finished', [], [], []
            for i in range(2):
                doc_objs.append(Document.objects.get(id=int(hs_form.cleaned_data.get('file_id' + str(i + 1)))))
                values.update({'filename' + str(i + 1): str(doc_objs[i])})
                file_comp_list = request.POST.getlist('header' + str(i + 1))
                compare_dict.extend(file_comp_list)
                dataframes.append(read_file(doc_objs[i].document, doc_objs[i].document.path, skiprows=hs_form.cleaned_data.get('header_num' + str(i + 1)))[0])

            out_dataframe = compare_columns(dataframes, compare_dict)
            out_filename = os.path.join(STATICFILES_DIRS[0], os.path.join('exports', 'compare_report-' + datetime.now().strftime('%Y-%m-%d') + '.csv'))
            write_file(out_dataframe, out_filename, False, index=False)
            comp_results = out_dataframe.to_html(classes='table table-bordered table-hover table-striped', index=False)
            [doc_obj.document.delete() for doc_obj in doc_objs]
            [doc_obj.delete() for doc_obj in doc_objs]
            return render(request, 'tools/compare.html', {'comp_results': comp_results, 'out_filename': out_filename, 'step': step, 'values': values, 'title': TITLE1, 'user': request.user})

        all_valid = all(docForm.is_valid() for docForm in doc_forms)
        if all_valid:
            step, values = 'progress', {}
            for i, docForm in enumerate(doc_forms):
                file = docForm.cleaned_data.get('document')
                if file.size > FILE_UPLOAD_MAX_MEMORY_SIZE:
                    raise forms.ValidationError('Please keep filesize under' + filesizeformat(FILE_UPLOAD_MAX_MEMORY_SIZE) + '. Current filesize' + filesizeformat(file.size))
                doc_query = Document.objects.filter(document=file)
                doc = doc_query.first() if doc_query.exists() else docForm.save()
                values.update({
                    'filename' + str(i + 1): str(doc),
                    'file' + str(i + 1): doc,
                    'header_num' + str(i + 1): docForm.cleaned_data.get('header')
                })
                header_dict.append(read_file(file, file.name, skiprows=values.get('header_num' + str(i + 1)), nrows=values.get('header_num' + str(i + 1)) + 1)[1])
    return render(request, 'tools/compare.html', {'formset': doc_forms, 'hs_form': hs_form, 'header_dict': header_dict, 'step': step, 'values': values, 'title': TITLE1, 'user': request.user})


@login_required
def export(request):
    if 'out_filename' in request.POST:
        filename = request.POST.get('out_filename')
        file = open(os.path.join(STATICFILES_DIRS[0], os.path.join('exports', filename)), 'w+')
        resp = HttpResponse(file.read(), content_type='applications/upload')
        resp['Content-Disposition'] = 'inline;filename=' + os.path.basename(file.name)
        return resp
    return redirect(None)


# HTML Parser -------------------------------------------------------------------------------
TITLE2 = ('pe-7s-browser', '링크 투 파일 애플리케이션', '링크 컬링해주는 애플리케이션')


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


@login_required
def url_parse(request):
    url = ECP_API_URL + ECP_HT_URL
    form = PostmanAPIForm(request.POST or None, request.FILES or None)
    return render(request, 'tools/html_parse.html', {'title': TITLE2, 'form': form, 'user': request.user, 'url': url})


# Tour API ----------------------------------------------------------------------------------
TITLE3 = ('pe-7s-plane', '투어 API Demo', '')


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


@login_required
def tour_api(request):
    url = ECP_API_URL + ECP_TOUR_URL
    form = TourAPIForm(request.POST or None, request.FILES or None)
    return render(request, 'tools/tour_api.html', {
        'title': TITLE3, 'form': form, 'api_key': os.getenv('TOUR_API_KEY'), 'user': request.user, 'url': url, 'others': CAT_LIST, 'details': CAT_DETAIL_LIST
    })


# Collection --------------------------------------------------------------------------------
TITLE4 = ('pe-7s-photo-gallery', 'MALL 수집', '')


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all().order_by('date_updated')
    serializer_class = ItemSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer


@login_required
def collection(request, col_type):
    try:
        item_dict = serializers.serialize("python", queryset=Item.objects.filter(id=col_type))
        return render(request, 'tools/item.html', {'title': TITLE4, 'item_dict': item_dict, 'item': Item.objects.get(id=col_type)})
    except (Item.DoesNotExist, ValueError):
        doc_form = DocumentForm(request.POST or None, request.FILES or None)
        table = CategoryTable(Category.objects.all()) if col_type == 'category' else ItemTable(Item.objects.all()) if col_type == 'item' else ItemTable(Item.objects.filter(category__cat_id=col_type))
        if request.method == 'POST' and doc_form.is_valid():
            data_file = doc_form.cleaned_data.get('document', None)
            header_num = doc_form.cleaned_data.get('header')
            dataframe, _ = read_file(data_file, data_file.name, header=header_num)
            for index, row in dataframe.iterrows():
                cat, exists = Category.objects.get_or_create(cat_id=row.pop('eck_category'))
                Category.objects.filter(cat_id=cat.cat_id).update(name=row.pop('category'))
                new_item, exists = Item.objects.update_or_create(category=cat, url=row.get('url', row.get('URL', '')))
                try:
                    row['quantity'] = int(row['quantity'])
                except ValueError:
                    row['quantity'] = 0
                print(row)
                Item.objects.filter(id=new_item.id).update(**row, date_updated=timezone.now())
        col_type = col_type if col_type in ['item', 'category'] else Category.objects.get(cat_id=col_type)
    return render(request, 'tools/collection.html', {'title': TITLE4, 'table': table, 'subtitle': col_type, 'formset': doc_form})


@login_required
def collection_coupang(request):
    col_type = 1  # TODO: need to change as it is not functional
    table = CategoryTable(Category.objects.all()) if col_type == 'category' else ItemTable(Item.objects.all()) if col_type == 'item' else ItemTable(Item.objects.filter(category__cat_id=col_type))
    return render(request, 'tools/coupang.html', {'title': TITLE4, 'table': table, 'subtitle': col_type})


@login_required
def collection_form(request, col_type):
    try:
        form = ItemForm(request.POST or None, request.FILES or None, instance=Item.objects.get(id=col_type))
    except (Item.DoesNotExist, ValueError):
        form = CategoryForm(request.POST or None, request.FILES or None) if col_type == 'category' else ItemForm(request.POST or None, request.FILES or None)
    if request.method == 'POST' and form.is_valid():
        rtn_item = form.save()
        return redirect('collection', rtn_item.id if hasattr(rtn_item, 'id') else rtn_item.cat_id)
    return render(request, 'tools/add_form.html', {'title': TITLE4, 'form': form, 'subtitle': col_type})


@login_required
def delete_collection(request, item_id):
    try:
        Item.objects.filter(id=item_id).update(delete=True)
    except Item.DoesNotExist:
        Http404('No Such Item found.')
    return redirect('collection', 'item')


@login_required
def export_collection(request):
    filepath = os.path.join(BASE_DIR, 'static', 'exports', 'test.xlsx')
    data_list = [item.__dict__ for item in Item.objects.all()]
    for row in data_list:
        keys = list(row.keys())
        [row.pop(key, None) for key in keys if 'date' in key or key == '_state']
        row['category_id'] = '{mall_id};;{cat_id}'.format(mall_id=row.pop('mall_id'), cat_id=row.get('category_id'))
    return export_to_spreadsheet(data_list, filepath)


# Big Data --------------------------------------------------------------------------------
@login_required
def big_data(request):
    doc_form = DocumentForm(request.POST or None, request.FILES or None)
    if request.method == 'POST' and doc_form.is_valid():
        data_file = doc_form.cleaned_data.get('document', None)
        dataframe, _ = read_file(data_file, data_file.name, header=doc_form.cleaned_data.get('header'))
        dataframe.fillna(method='ffill', inplace=True)
        for index, row in dataframe.iterrows():
            new_comp, exists = Company.objects.update_or_create(name=row[dataframe.columns[2]])
            Company.objects.filter(id=new_comp.id).update(count=new_comp.count + 1 if new_comp.count else 1)
            words = re.sub(r"[^\\p{L}\w\s]+|—", ' ', str(row[dataframe.columns[3]])).split(' ')
            for word in words:
                new_item, exists = Word.objects.update_or_create(word=word, company_id=new_comp.id)
                Word.objects.filter(id=new_item.id).update(count=new_item.count + 1 if new_item.count else 1)
    table = WordTable(Word.objects.all())
    return render(request, 'tools/data.html', {'title': TITLE4, 'table': table, 'formset': doc_form, 'subtitle': ''})


@login_required
def export_words(request):
    filepath = os.path.join(BASE_DIR, 'static', 'exports', 'results.xlsx')
    data_list = [item.__dict__ for item in Word.objects.all()]
    for row in data_list:
        keys = list(row.keys())
        try:
            row['company'] = Company.objects.get(id=row.pop('company_id'))
        except Company.DoesNotExist:
            pass
        [row.pop(key, None) for key in keys if 'date' in key or key == '_state']
    Word.objects.all().delete()
    return export_to_spreadsheet(data_list, filepath)
