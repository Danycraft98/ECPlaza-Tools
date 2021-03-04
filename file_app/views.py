import json
from datetime import datetime
import os

from django.template.defaultfilters import filesizeformat
from django.contrib.auth.decorators import login_required
from django.forms import forms
from django.http import HttpResponse
from django.shortcuts import render, redirect

from ECPlazaTools import settings
from ECPlazaTools.settings import STATICFILES_DIRS
from .forms import *
from .functions import *
from .models import Document


TITLE1 = ('pe-7s-copy-file', '파일비교 애플리케이션', '파일 내역을 비교하는 애플리케이션')
sep = os.path.sep


@login_required
def compare(request):
    step, header_dict, values = 'start', [], {}
    doc_forms = DocumentFormSet(request.POST or None, request.FILES or None, queryset=Document.objects.none())
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
            return render(request, 'file_app/compare.html', {'comp_results': comp_results, 'out_filename': out_filename, 'step': step, 'values': values, 'title': TITLE1, 'user': request.user})

        all_valid = all(docForm.is_valid() for docForm in doc_forms)
        if all_valid:
            step, values = 'progress', {}
            for i, docForm in enumerate(doc_forms):
                file = docForm.cleaned_data.get('document')
                if file.size > settings.FILE_UPLOAD_MAX_MEMORY_SIZE:
                    raise forms.ValidationError('Please keep filesize under' + filesizeformat(settings.FILE_UPLOAD_MAX_MEMORY_SIZE) + '. Current filesize' + filesizeformat(file.size))
                doc_query = Document.objects.filter(document=file)
                if doc_query.exists():
                    doc = doc_query.first()
                else:
                    doc = docForm.save()

                values.update({
                    'filename' + str(i + 1): str(doc),
                    'file' + str(i + 1): doc,
                    'header_num' + str(i + 1): docForm.cleaned_data.get('header')
                })
                header_dict.append(read_file(file, file.name, skiprows=values.get('header_num' + str(i + 1)), nrows=values.get('header_num' + str(i + 1)) + 1)[1])
    return render(request, 'file_app/compare.html', {'formset': doc_forms, 'hs_form': hs_form, 'header_dict': header_dict, 'step': step, 'values': values, 'title': TITLE1, 'user': request.user})


@login_required
def export(request):
    if 'out_filename' in request.POST:
        filename = request.POST.get('out_filename')
        file = open(os.path.join(STATICFILES_DIRS[0], os.path.join('exports', filename)), 'w+')
        resp = HttpResponse(file.read(), content_type='applications/upload')
        resp['Content-Disposition'] = 'inline;filename=' + os.path.basename(file.name)
        return resp
    return redirect(None)


# -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
TITLE2 = ('pe-7s-browser', '링크 투 파일 애플리케이션', '링크 컬링해주는 애플리케이션')


@login_required
def url_parse(request):
    database = json.dumps(settings.DATABASES.get('default'))
    form = PostmanAPIForm(request.POST or None, request.FILES or None)
    return render(request, 'file_app/html_parse.html', {'title': TITLE2, 'form': form, 'user': request.user, 'database': database})
