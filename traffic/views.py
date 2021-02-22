import os
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from traffic.functions import get_access_token

TITLE = ('pe-7s-copy-file', '파일비교 애플리케이션', '파일 내역을 비교하는 애플리케이션')
sep = os.path.sep


@login_required
def traffic(request):
    google_access_token = get_access_token()
    google_userid = os.environ.get('GOOGLE_USER_ID', None)
    return render(request, 'traffic/test_index.html', {'google_access_token': google_access_token, 'google_userid': google_userid, 'title': TITLE, 'user': request.user})
