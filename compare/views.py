from datetime import datetime
import os

from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from compare.functions import compare_columns

TITLE = ('파일비교 애플리케이션', '파일 내역을 비교하는 애플리케이션')
sep = os.path.sep

@login_required
def coupang_partners(request):
    """method = os.environ.get('REQUEST_METHOD')  # 정보를 얻는것이기 때문에 GET
    keyword = '채워 넣으세요'  # 검색할 키워드, 쿠팡에서 검색하는거랑 결과가 동일합니다.
    limit = 5  # 몇개의 정보를 가져올지 설정. 상위부터 가져옵니다.
    access_key = os.environ.get('CP_ACCESS_KEY')
    secret_key = os.environ.get('CP_SECRET_KEY')
    # link = os.environ.get('URL') + urllib.parse.quote(keyword) + "&limit=" + str(limit)
    coupang_mgr = CoupangMgr()
    authorization = coupang_mgr.generate_hmac(method, link, secret_key, access_key)  # HMAC 생성
    product_data = coupang_mgr.get_products_data(method, authorization, keyword, limit)  # API 호출
    print(product_data)  # 결과 확인"""
    return render(request, 'compare/coupang_products.html', {'title': TITLE, 'user': request.user})


@login_required
def index(request):
    file_paths, header_dict, step = [], [], 'start'
    if request.method == 'POST':
        pass
    return render(request, 'compare/index.html',
                  {'filenames': file_paths, 'header_dict': header_dict, 'sep': sep,
                   'step': step, 'title': TITLE, 'user': request.user})


@login_required
def export(request):
    if 'out_filename' in request.form:
        filename = request.form.get('out_filename')
        pass
    return redirect(None)
