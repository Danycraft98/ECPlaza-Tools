import os

from django.contrib.auth.decorators import login_required

from .models import User
from .forms import *
from django.shortcuts import render, redirect


def signup(request):
    form = RegisterForm(request.POST or None, request.FILES or None)
    if form.is_valid():
        User.objects.create_user(request.POST.get('username', ''), password=request.POST.get('password1', ''), email=request.POST.get('email', ''))
        return redirect('/accounts/login')
    return render(request, 'accounts/register.html', {'form': form})


@login_required
def user_profile(request, user_id):
    user = User.objects.get(id=user_id)
    return render(request, 'accounts/profile.html', {'user': user, 'title': ('pe-7s-user', '프로필', '프로필 페이지')})
