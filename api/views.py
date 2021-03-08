import os

from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from .forms import TourAPIForm

sep = os.path.sep

TITLE1 = ('pe-7s-plane', '투어 API Demo', '')


@login_required
def tour_api(request):
    form = TourAPIForm()
    return render(request, 'api/tour_api.html', {'title': TITLE1, 'form': form, 'api_key': os.environ.get('TOUR_API_KEY'), 'user': request.user})


# -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
TITLE2 = ('pe-7s-rocket', '트래픽 분석 애플리케이션', '파일 내역을 비교하는 애플리케이션')
