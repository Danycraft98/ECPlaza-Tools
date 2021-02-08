import os

from bs4 import BeautifulSoup
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render
from pandas import DataFrame
import pandas as pd

from .forms import CurlForm
from .functions import parse_link

sep = os.path.sep
TITLE = ('링크 투 파일 애플리케이션', '링크 컬링해주는 애플리케이션')


@login_required
def url_parse(request):
    divs, form = None, CurlForm(request.POST or None, request.FILES or None)
    dataframe = None
    if request.method == 'POST':
        if form.is_valid():
            if form.cleaned_data.get('html_file') is not None:
                file = form.cleaned_data.get('html_file', None)
                data = file.read()
            else:
                request_param = dict(form.cleaned_data)
                [request_param.pop(key) for key in ['html_file', 'value']]
                data = parse_link(**request_param)

            value, soup = form.cleaned_data.get('value'), BeautifulSoup(data)
            divs, final_data = soup.find_all('div', {'class': value}), []
            if value == 'cardListItem':
                for div in divs:
                    final_data.append([
                        '<img src=" ' + div.find('img').get('src') + '" width="100px">',
                        str(div.find('span')).replace(r'/[\]', ''),
                        str(div.find('div', {'class': 'salePrice'})),
                        str(div.find('div', {'class': 'iteRep'})),
                        str(div.find('div', {'class': 'itemAdr'}))
                    ])
                dataframe = DataFrame(columns=['image', 'name', 'price', '# Sold', 'location'], data=final_data)
            else:
                for div in divs:
                    if div.find('textarea'):
                        final_data.append([
                            str(div.find('label')).replace(r'/[\]', ''),
                            div.find('textarea').get('placeholder')
                        ])
                dataframe = DataFrame(columns=['label', 'content'], data=final_data)

            return render(request, 'html_parse/index.html', {
                'title': TITLE, 'form': form, 'data': dataframe.to_html(
                    escape=False, index=False, classes='table table-hover table-responsive table-stripped'),
                'user': request.user
            })

    return render(request, 'html_parse/index.html', {
        'title': TITLE, 'form': form, 'data': dataframe, 'user': request.user
    })
