import os
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from .forms import CurlForm
from .functions import *

sep = os.path.sep
TITLE = ('링크 투 파일 애플리케이션', '링크 컬링해주는 애플리케이션')
APP_LIST = ['Shopify', '1688', 'Coupang', 'Hot Tracks']


@login_required
def url_parse(request):
    divs, form = None, CurlForm(request.POST or None, request.FILES or None)
    dataframe = None
    if request.method == 'POST':
        if form.is_valid():
            if form.cleaned_data.get('text') != '':
                data = form.cleaned_data.get('text')

            elif form.cleaned_data.get('html_file'):
                file = form.cleaned_data.get('html_file', None)
                data = file.read()

            else:
                request_param = dict(form.cleaned_data)
                [request_param.pop(key) for key in ['html_file', 'value']]
                data = parse_link(**request_param)

            dataframe = get_dataframe(data, form.cleaned_data.get('value'))
            return render(request, 'html_parse/index.html', {
                'title': TITLE, 'form': form, 'data': dataframe.to_html(
                    escape=False, index=False, classes='table table-hover table-responsive table-stripped'),
                'app_list': APP_LIST, 'user': request.user
            })

    return render(request, 'html_parse/index.html', {
        'title': TITLE, 'form': form, 'data': dataframe, 'app_list': APP_LIST, 'user': request.user
    })
