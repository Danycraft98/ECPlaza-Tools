import os
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from pandas import DataFrame

from ECPlazaTools import settings
from .forms import *
from .functions import *

sep = os.path.sep
TITLE = ('pe-7s-link', '링크 투 파일 애플리케이션', '링크 컬링해주는 애플리케이션')


@login_required
def url_parse(request):
    divs, form = None, CurlForm(request.POST or None, request.FILES or None)
    dataframe = None
    if request.method == 'POST':
        if form.is_valid():
            try:
                if form.cleaned_data.get('text') != '':
                    data = form.cleaned_data.get('text')

                elif form.cleaned_data.get('html_file'):
                    file = form.cleaned_data.get('html_file', None)
                    data = file.read()

                else:
                    request_param = dict(form.cleaned_data)
                    [request_param.pop(key) for key in ['html_file', 'value']]
                    data = parse_link(**request_param)

                app_name = form.cleaned_data.get('value')
                dataframe = get_dataframe(data, app_name)
                copy = dataframe.copy().transpose()
                copy.insert(0, 'app_name', app_name)
                copy.to_sql('product', settings.DATABASES['default']['ENGINE'], index=False)

            except (IndexError, TypeError) as _e:
                dataframe = DataFrame()

            return render(request, 'html_parse/index.html', {
                'title': TITLE, 'form': form, 'data': dataframe.to_html(
                    escape=False, classes='table table-hover table-responsive table-stripped'),
                'user': request.user
            })

    return render(request, 'html_parse/index.html', {
        'title': TITLE, 'form': form, 'data': dataframe, 'user': request.user
    })
