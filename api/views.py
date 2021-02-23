import os

from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from .forms import TourAPIForm
from .functions import get_access_token

sep = os.path.sep

TITLE1 = ('pe-7s-plane', '투어 API Demo', '')


@login_required
def tour_api(request):
    form = TourAPIForm()
    return render(request, 'api/tour_api.html', {'title': TITLE1, 'form': form, 'api_key': os.environ.get('TOUR_API_KEY'), 'user': request.user})


# -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
TITLE2 = ('pe-7s-rocket', '트래픽 분석 애플리케이션', '파일 내역을 비교하는 애플리케이션')


@login_required
def traffic(request):
    google_access_token = get_access_token()
    google_userid = os.environ.get('GOOGLE_USER_ID', None)
    return render(request, 'api/traffic.html', {'google_access_token': google_access_token, 'google_userid': google_userid, 'title': TITLE2, 'user': request.user})
