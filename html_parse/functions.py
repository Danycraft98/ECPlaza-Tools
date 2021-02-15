from bs4 import BeautifulSoup
from urllib import request

# from url_parser import get_url, get_base_url

__all__ = [
    'parse_link', 'get_dataframe'
]

from pandas import DataFrame

headers = {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'}


def parse_link(link, username=None, password=None):
    password_mgr = request.HTTPPasswordMgrWithDefaultRealm()

    # Add the username and password.
    # If we knew the realm, we could use it instead of None.
    password_mgr.add_password(None, link, username, password)

    handler = request.HTTPBasicAuthHandler(password_mgr)

    # create "opener" (OpenerDirector instance)
    opener = request.build_opener(handler)

    # use the opener to fetch a URL
    opener.open(link)

    # Install the opener.
    # Now all calls to urllib.request.urlopen use our opener.
    request.install_opener(opener)
    final_result = request.urlopen(link).read()
    return final_result


def get_dataframe(data, key):
    app_dict = {
        'Shopify': ['div', 'next-input-wrapper translation', ['label', 'content']],
        '1688': ['div', 'cardListItem', ['image', 'name', 'link', 'price', '# Sold', 'location']],
        'Coupang': ['li', 'baby-product renew-badge', ['image', 'name', 'link', 'base price', 'sale price', 'unit price', 'rating']],
        'Hot Tracks': ['li', None, ['label', 'content']],
    }
    values, soup = app_dict.get(key), BeautifulSoup(data)
    if values[1]:
        items = soup.find_all(values[0], {'class': values[1]})
    else:
        items = soup.find_all(values[0])

    final_data, header = [], values[2]
    for item in items:
        if key == 'Shopify' and item.find('textarea'):
            row = [
                str(item.find('label')).replace(r'/[\]', ''),
                item.find('textarea').text
            ]

        elif key == '1688':
            row = [
                '<img src=" ' + item.find('img').get('src', '') + '" width="100px">',
                str(item.find('span')).replace(r'/[\]', ''),
                str(item.find('div', {'class': 'salePrice'})),
                str(item.find('div', {'class': 'iteRep'})),
                str(item.find('div', {'class': 'itemAdr'}))
            ]

        elif key == 'Coupang':
            row = [
                '<img src=" ' + item.find('img').get('src', '') + '" width="100px">',
                str(item.find('div', {'class': 'name'})).replace('\r\n', ''),
                str(item.find('span', {'class': 'price-info'})).replace('\n', ' '),
                str(item.find('strong', {'class': 'price-value'})),
                str(item.find('span', {'class': 'unit-price'})),
                str(item.find('em', {'class': 'rating'})),
            ]

        else:
            print(item)
            row = [
                '<img src=" ' + item.find('img').get('src', '') + '" width="100px">',
            ]

        link = item.find('a')
        if link:
            address = link.get('href', '')
            # print(parse_link(address))
            row.insert(2, address)
        elif key == 'Shopify':
            pass
        else:
            row.insert(2, None)

        final_data.append(row)
    dataframe = DataFrame(columns=header, data=final_data)
    return dataframe
