from bs4 import BeautifulSoup
from urllib import request

# from url_parser import get_url, get_base_url

__all__ = [
    'parse_link', 'get_dataframe'
]

from pandas import DataFrame

headers = {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'}


def parse_link(link, username=None, password=None, value=None):
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


def get_dataframe(data, value):
    soup = BeautifulSoup(data)
    divs, final_data, header, row = soup.find_all('div', {'class': value}), [], [], None
    for div in divs:
        if value == 'cardListItem':
            header = ['image', 'name', 'price', '# Sold', 'location']
            row = [
                '<img src=" ' + div.find('img').get('src') + '" width="100px">',
                str(div.find('span')).replace(r'/[\]', ''),
                str(div.find('div', {'class': 'salePrice'})),
                str(div.find('div', {'class': 'iteRep'})),
                str(div.find('div', {'class': 'itemAdr'}))
            ]

        elif div.find('textarea'):
            header = ['label', 'content']
            row = [
                str(div.find('label')).replace(r'/[\]', ''),
                div.find('textarea').get('placeholder')
            ]

        if row:
            final_data.append(row)
    dataframe = DataFrame(columns=header, data=final_data)
    return dataframe
