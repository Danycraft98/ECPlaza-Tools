from datetime import datetime
import os

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, redirect

from SabPadLIMS import settings
from .functions import parse_link

sep = os.path.sep
TITLE = ('파일비교 애플리케이션', '파일 내역을 비교하는 애플리케이션')


@login_required
def url_parse(request):
    data = None
    if request.method == 'POST':
        data = parse_link(request.POST.get('link'))
    return render(request, 'html_parse/index.html', {'title': TITLE, 'data': data, 'user': request.user})
