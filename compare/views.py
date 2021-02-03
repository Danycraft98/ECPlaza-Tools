from datetime import datetime
import os

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, redirect

from .functions import compare_columns, read_file
from .models import Document

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
def compare(request):
    file_paths, header_dict, step = [], [], 'start'
    files, header_dict, step = [], [], 'start'
    if request.method == 'POST':
        if 'filename' in request.form:
            step, compare_dict, dataframes = 'finished', [], []
            for i, filename in enumerate(request.POST.getlist('filename')):
                file_path = os.path.join(Config.UPLOAD_FOLDER, filename)
                file_comp_list = request.POST.getlist('header' + str(i + 1))
                files.append([filename, int(request.POST.getlist('header_num')[i])])
                compare_dict.append(file_comp_list)
                dataframes.append(read_file(open(file_path, 'rb+'), file_path)[0])

            out_dataframe = compare_columns(dataframes, compare_dict)
            out_filename = 'output_files/compare_report-' + datetime.now().strftime('%Y-%m-%d') + '.xls'
            out_dataframe.to_excel(out_filename, index=False)
            return render(request, 'compare/index.html', {'files': files, 'comp_results': out_dataframe.to_html(
                classes='table table-bordered table-hover table-responsive table-striped', index=False
            ), 'sep': sep, 'out_filename': out_filename, 'step': step, 'title': TITLE, 'user': request.user})

        input_files = request.FILES.getlist('file')
        step = 'progress'
        for i, file in enumerate(input_files):
            files.append([file.filename, int(request.POST.getlist('header')[i])])
            header_dict.append(read_file(file, file.filename, skiprows=files[i][1], nrows=files[i][1] + 1)[1])
    return render(request, 'compare/index.html', {'filenames': file_paths, 'header_dict': header_dict, 'sep': sep, 'step': step, 'title': TITLE, 'user': request.user})


@login_required
def export(request):
    if 'out_filename' in request.POST:
        filename = request.POST.get('out_filename')
        file = Document.objects.filter_by(description=filename).last().document
        resp = HttpResponse(file.read(), content_type='applcations/upload')
        resp['Content-Disposition'] = 'inline;filename=' + os.path.basename(file.filename)
        return resp
    return redirect(None)
