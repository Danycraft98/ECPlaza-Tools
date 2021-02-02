import itertools
import numpy as np
import pandas as pd
from pandas import DataFrame
import os

from config import Config


__all__ = [
    'read_file', 'write_file', 'compare_columns'  # , 'CoupangMgr'
]


'''class CoupangMgr:
    """Main Coupang Partners API Class"""
    domain = os.environ.get('DOMAIN', '')
    def __init__(self):
        super(CoupangMgr, self).__init__()
    @staticmethod
    def generate_hmac(method, link, secret_key, access_key):
        path, *query = link.split("?")
        os.environ["TZ"] = "GMT+0"
        datetime = time.strftime('%y%m%d') + 'T' + time.strftime('%H%M%S') + 'Z'
        message = datetime + method + path + (query[0] if query else "")
        signature = hmac.new(bytes(secret_key, "utf-8"), message.encode("utf-8"), hashlib.sha256).hexdigest()
        return "CEA algorithm=HmacSHA256, access-key={}, signed-date={}, signature={}".format(access_key, datetime,
                                                                                              signature)
    def get_products_data(self, request_method, authorization, keyword, limit):
        url = "/v2/providers/affiliate_open_api/apis/openapi/products/search?keyword=" + urllib.parse.quote(
            keyword) + "&limit=" + str(limit)
        link = "{}{}".format(self.domain, url)
        response = requests.request(method=request_method, url=link, headers={"Authorization": authorization,
                                                                              "Content-Type": "application/json;
                                                                              charset=UTF-8"})
        ret_data = json.dumps(response.json(), indent=4).encode('utf-8')
        json_data = json.loads(ret_data)
        data = json_data['data']
        product_data = data['productData']
        return product_data'''


def read_file(file, filename, **kwargs):
    """ Read file with **kwargs; files supported: xls, xlsx, csv, json. """
    if 'nrows' in kwargs and not os.path.exists(filename):
        file.save(os.path.join(Config.UPLOAD_FOLDER, filename))

    read_map = {'xls': pd.read_excel, 'xlsx': pd.read_excel, 'csv': pd.read_csv, 'json': pd.read_json}
    ext = os.path.splitext(filename)[1].lower()[1:]
    assert ext in read_map, "Input file not in correct format, must be spreadsheet; current format '{0}'".format(ext)
    dataframe = read_map[ext](file, index_col=False, **kwargs)
    return dataframe, dataframe.columns


def write_file(dataframe, filename, **kwargs):
    """ Write file with **kwargs; files supported: xls, xlsx, csv, json. """
    write_map = {'xls': DataFrame.to_excel, 'xlsx': DataFrame.to_excel,
                 'csv': DataFrame.to_csv, 'json': DataFrame.to_json}

    ext = os.path.splitext(filename)[1].lower()[1:]
    assert ext in write_map, "Input file not in correct format, must be spreadsheet current format '{0}'".format(ext)
    write_map[ext](dataframe, filename, **kwargs)
    return filename


def compare_columns(dataframes, header_list):
    """ Compares two dataframes by selected column headers. """
    df_list = []
    comb_list = [r for r in itertools.product(header_list[0], header_list[1])]
    for comb in comb_list:
        val1, val2 = dataframes[0][comb[0]], dataframes[1][comb[1]]
        if dataframes[0][comb[0]].dtype != np.number and dataframes[1][comb[1]].dtype != np.number:
            comp_result = set(val1.str.lower()).intersection(set(val2.str.lower()))
        else:
            comp_result = set(dataframes[0][comb[0]]).intersection(set(dataframes[1][comb[1]]))

        for row in comp_result:
            df_list.append([row] + list(comb))
    return DataFrame(data=df_list, columns=[
        'Column Value', 'Column Name and Row# (File #1)', 'Column Name and Row# (File #2)'
    ])
