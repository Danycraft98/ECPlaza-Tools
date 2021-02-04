import os
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from .functions import parse_link

sep = os.path.sep
TITLE = ('파일비교 애플리케이션', '파일 내역을 비교하는 애플리케이션')


@login_required
def url_parse(request):
    data, request_param = None, {}
    if request.method == 'POST':
        request_param = {'link': request.POST.get('link'), 'username': request.POST.get('username'), 'password': request.POST.get('password')}
        data = parse_link(**request_param)
    return render(request, 'html_parse/index.html', {'title': TITLE, 'data': data, 'user': request.user, 'request_param': request_param})
