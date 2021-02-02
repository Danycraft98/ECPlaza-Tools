from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from .functions import *


@login_required
def index(request):
    return render('main/index.html')
