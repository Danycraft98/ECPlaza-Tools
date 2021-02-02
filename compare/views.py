import json
from urllib import parse

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.files.storage import FileSystemStorage
from django.core.mail import send_mail
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import redirect, render
from django.template.loader import render_to_string
from django.urls import reverse
from weasyprint import HTML, CSS

from .forms import *
from .functions import *
from .tables import *


@login_required
def index(request):
    files, header_dict, step = [], [], 'start'
    if request.method == 'POST':
        if 'filename' in request.form:
            step = 'finished'
            compare_dict, dataframes = [], []
            for i, filename in enumerate(request.form.getlist('filename')):
                file_path = os.path.join(Config.UPLOAD_FOLDER, filename)
                file_comp_list = request.form.getlist('header' + str(i+1))
                files.append([filename, int(request.form.getlist('header_num')[i])])
                compare_dict.append(file_comp_list)
                dataframes.append(read_file(open(file_path, 'rb+'), file_path)[0])
            out_dataframe = compare_columns(dataframes, compare_dict)
            out_filename = 'output_files/compare_report-' + datetime.now().strftime('%Y-%m-%d') + '.xls'
            out_dataframe.to_excel(out_filename, index=False)
            return render('compare/index.html', files=files, comp_results=out_dataframe.to_html(
                classes='table table-bordered table-hover table-responsive table-striped', index=False
            ), sep=sep, out_filename=out_filename, step=step, title=TITLE, user=current_user)

        input_files = request.files.getlist('file')
        step = 'progress'
        for i, file in enumerate(input_files):
            files.append([file.filename, int(request.form.getlist('header')[i])])
            header_dict.append(read_file(file, file.filename, skiprows=files[i][1], nrows=files[i][1] + 1)[1])
    return render('compare/index.html', filenames=file_paths, header_dict=header_dict, sep=sep, step=step, title=TITLE, user=current_user)


@login_required
def export(request):
    if 'out_filename' in request.form:
        filename = request.form.get('out_filename')
        return send_file('..' + sep + filename, as_attachment=True)
    return redirect(session['url'])
