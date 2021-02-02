import itertools
import numpy as np
from pandas import DataFrame

__all__ = [
    'compare_columns'  # , 'CoupangMgr'
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


def compare_columns(dataframes, header_list):
    """ Compares two dataframes by selected column headers. """
    all_combs, df_list = [], []
    combs_obj = itertools.combinations(header_list, 2)
    combs_list = list(combs_obj)
    all_combs += combs_list

    for comb in all_combs:
        if comb[0] in dataframes[0] and comb[1] in dataframes[1]:
            val1, val2 = dataframes[0][comb[0]], dataframes[1][comb[1]]
            if dataframes[0][comb[0]].dtype != np.number and dataframes[1][comb[1]].dtype != np.number:
                comp_result = set(val1.str.lower()).intersection(set(val2.str.lower()))
            else:
                comp_result = set(val1).intersection(set(val2))

            for row in comp_result:
                df_list.append([row] + list(comb))
                # ': '.join([comb[0], str(dataframes[0].index[dataframes[0][comb[0]] == row])]),
    return DataFrame(data=df_list, columns=[
         'Column Value', 'Column Name (File #1)', 'Column Name (File #2)'
    ])
