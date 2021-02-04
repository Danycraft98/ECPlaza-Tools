import os
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from .functions import parse_link

sep = os.path.sep
TITLE = ('파일비교 애플리케이션', '파일 내역을 비교하는 애플리케이션')


@login_required
def url_parse(request):
    data = None
    if request.method == 'POST':
        data = parse_link(request.POST.get('link'), request.POST.get('username'), request.POST.get('password'))
    return render(request, 'html_parse/index.html', {'title': TITLE, 'data': data, 'user': request.user})
