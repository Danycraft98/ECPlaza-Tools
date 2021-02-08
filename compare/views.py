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
    values, step = {}, 'start'
    doc_forms = DocumentFormSet(request.POST or None, request.FILES or None, queryset=Document.objects.none())
    hs_form = HeaderSelectForm(request.POST or None, request.FILES or None)
    if request.method == 'POST':
        if hs_form.is_valid():
            step, compare_dict, dataframes = 'finished', [], []
            for i in range(2):
                doc = Document.objects.get(id=int(hs_form.cleaned_data.get('file_id' + str(i + 1))))
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
            step, values = 'progress', {}
            for i, docForm in enumerate(doc_forms):
                file = docForm.cleaned_data.get('document')
                docForm.save()
                values.update({
                    'file_id' + str(i + 1): Document.objects.filter(description=file.name).first().id,
                    'header_num' + str(i + 1): docForm.cleaned_data.get('header')
                })
                header_dict.append(read_file(file, file.name, skiprows=values.get(
                    'header_num' + str(i + 1)), nrows=values.get('header_num' + str(i + 1)) + 1)[1])
    return render(request, 'compare/index.html', {
        'formset': doc_forms, 'hs_form': hs_form, 'filenames': file_paths, 'header_dict': header_dict, 'sep': sep,
        'step': step, 'values': values, 'title': TITLE, 'user': request.user
    })


@login_required
def export(request):
    if 'out_filename' in request.POST:
        filename = request.POST.get('out_filename')
        file = Document.objects.filter_by(description=filename).last().document
        resp = HttpResponse(file.read(), content_type='applcations/upload')
        resp['Content-Disposition'] = 'inline;filename=' + os.path.basename(file.name)
        return resp
    return redirect(None)
