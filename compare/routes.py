from datetime import datetime
import os

import pandas as pd
from flask import render_template, request, Blueprint, send_file, session
from flask_login import login_required, current_user
from werkzeug.utils import redirect

from compare.functions import *
from main import db

sep = os.path.sep
compare_app = Blueprint('compare_app', __name__, template_folder='../templates')
TITLE = ('파일비교 애플리케이션', '파일 내역을 비교하는 애플리케이션')


@compare_app.route('/coupang.partners', methods=['GET', 'POST'])
@login_required
def coupang_partners():
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
    return render_template('compare/coupang_products.html', title=TITLE, user=current_user)


@compare_app.route('/compare', methods=['GET', 'POST'])
@login_required
def index():
    file_paths, header_dict, step = [], [], 'start'
    if request.method == 'POST':
        if 'filename' in request.form:
            step = 'finished'
            file_paths, compare_list, dataframes = request.form.getlist('filename'), request.form.getlist('header'), []
            for i, filename in enumerate(file_paths):
                dataframes.append(pd.read_sql("SELECT ('" + "','".join(set(compare_list)) + "') FROM file_no" + str(i), db.engine))
                file_paths[i] = filename.split(sep)[-1]

            out_dataframe = compare_columns(dataframes, compare_list)
            out_filename = 'output_files/compare_report-' + datetime.now().strftime('%Y-%m-%d') + '.xls'
            out_dataframe.to_excel(out_filename, index=False)
            return render_template('compare/index.html', filenames=file_paths, comp_results=out_dataframe.to_html(
                classes='table table-bordered table-hover table-responsive table-striped', index=False
            ), sep=sep, out_filename=out_filename, step=step, title=TITLE, user=current_user)

        files = request.files.getlist('file')
        step = 'progress'
        for i, file in enumerate(files):
            dataframe = pd.read_excel(file, index_col=False, na_filter=False, skiprows=int(request.form.getlist('header')[i]))
            dataframe.to_sql('file_no' + str(i), db.engine, if_exists='replace')
            header_dict.append(dataframe.columns)
    return render_template('compare/index.html', filenames=file_paths, header_dict=header_dict, sep=sep, step=step, title=TITLE, user=current_user)


@compare_app.route('/export', methods=['GET', 'POST'])
@login_required
def export():
    if 'out_filename' in request.form:
        filename = request.form.get('out_filename')
        return send_file('..' + sep + filename, as_attachment=True)
    return redirect(session['url'])
