from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.template import RequestContext

TITLE = ('pe-7s-rocket', 'ECPlaza Tools 사이트', '모든 도구를 사용할수있어요.')


@login_required
def index(request):
    return render(request, 'main/index.html', {'title': TITLE})


def terms(request):
    return render(request, 'main/index.html', {'title': TITLE})


def policy(request):
    return render(request, 'main/index.html', {'title': TITLE})


def handler403(request, *args):
    response = render(request, 'errors/403.html', context=RequestContext(request))
    response.status_code = 403
    return response


def handler404(request, *args):
    response = render(request, 'errors/404.html', context=RequestContext(request))
    response.status_code = 404
    return response


def handler410(request, *args):
    response = render(request, 'errors/410.html', context=RequestContext(request))
    response.status_code = 410
    return response

