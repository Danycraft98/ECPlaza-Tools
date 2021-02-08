from datetime import datetime
import os

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, redirect

from .forms import *
from .functions import compare_columns, read_file
from .models import Document

TITLE = ('파일비교 애플리케이션', '파일 내역을 비교하는 애플리케이션')
sep = os.path.sep


@login_required
def compare(request):
    file_paths, header_dict, step = [], [], 'start'
    header_dict, step = [], 'start'
    doc_forms = DocumentFormSet(request.POST or None, request.FILES or None, queryset=Document.objects.none())
    hs_forms = HeaderSelectFormSet(request.POST or None, request.FILES or None)
    if request.method == 'POST':
        all_valid = all(hsForm.is_valid() for hsForm in hs_forms)
        if all_valid:
            step, compare_dict, dataframes = 'finished', [], []
            for i, hsForm in enumerate(hs_forms):
                file_id = hsForm.cleaned_data.get('file_id')
                print(file_id)
                doc = Document.objects.get(id=file_id)
                file_comp_list = request.POST.getlist('header' + str(i + 1))
                compare_dict.append(file_comp_list)
                dataframes.append(read_file(doc.document, doc.document.path)[0])

            out_dataframe = compare_columns(dataframes, compare_dict)
            out_filename = 'output_files/compare_report-' + datetime.now().strftime('%Y-%m-%d') + '.xls'
            out_dataframe.to_excel(out_filename, index=False)
            return render(request, 'compare/index.html', {'comp_results': out_dataframe.to_html(
                classes='table table-bordered table-hover table-responsive table-striped', index=False
            ), 'sep': sep, 'out_filename': out_filename, 'step': step, 'title': TITLE, 'user': request.user})

        all_valid = all(docForm.is_valid() for docForm in doc_forms)
        if all_valid:
            step, values = 'progress', []
            for i, docForm in enumerate(doc_forms):
                file = docForm.cleaned_data.get('document')
                docForm.save()
                values.append({'file_id': Document.objects.filter(description=file.name), 'header_num': docForm.cleaned_data.get('header')})
                header_dict.append(read_file(file, file.name, skiprows=values[i].get('header_num'), nrows=values[i].get('header_num') + 1)[1])
            hs_forms.initial = values
    return render(request, 'compare/index.html', {'formset': doc_forms, 'hs_formset': hs_forms, 'filenames': file_paths, 'header_dict': header_dict, 'sep': sep, 'step': step, 'title': TITLE, 'user': request.user})


@login_required
def export(request):
    if 'out_filename' in request.POST:
        filename = request.POST.get('out_filename')
        file = Document.objects.filter_by(description=filename).last().document
        resp = HttpResponse(file.read(), content_type='applcations/upload')
        resp['Content-Disposition'] = 'inline;filename=' + os.path.basename(file.name)
        return resp
    return redirect(None)
