import os

import httplib2
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from googleapiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials

from traffic.functions import get_access_token

TITLE = ('pe-7s-copy-file', '파일비교 애플리케이션', '파일 내역을 비교하는 애플리케이션')
sep = os.path.sep


@login_required
def traffic(request):
    # Create service credentials
    # Rename your JSON key to client_secrets.json and save it to your working folder
    credentials = ServiceAccountCredentials.from_json_keyfile_name('ecplaza-67f2563cb042.json', ['https://www.googleapis.com/auth/analytics.readonly'])

    # Create a service object
    http = credentials.authorize(httplib2.Http())
    service = build('analytics', 'v4', http=http, discoveryServiceUrl='https://analyticsreporting.googleapis.com/$discovery/rest')
    response = service.reports().batchGet(body={'reportRequests': [
        {
            'viewId': '260668703',  # Add View ID from GA
            'dateRanges': [{'startDate': '30daysAgo', 'endDate': 'today'}],
            'metrics': [{'expression': 'ga:sessions'}],
            'dimensions': [{"name": "ga:pagePath"}],  # Get Pages
            "filtersExpression": "ga:pagePath=~products;ga:pagePath!@/translate",  # Filter by condition "containing products"
            'orderBys': [{"fieldName": "ga:sessions", "sortOrder": "DESCENDING"}],
            'pageSize': 100
        }]
    }).execute()
    google_access_token = get_access_token()
    google_userid = os.environ.get('GOOGLE_USER_ID', None)
    return render(request, 'traffic/index.html', {'resp': response, 'google_access_token': google_access_token, 'google_userid': google_userid, 'title': TITLE, 'user': request.user})
