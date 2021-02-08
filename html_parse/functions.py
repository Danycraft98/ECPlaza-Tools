from bs4 import BeautifulSoup
from urllib import request

# from url_parser import get_url, get_base_url

__all__ = [
    'parse_link'
]

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
    """link = soup.find("a")
    if len(link) > 0 and 'href' in link.attrs and 'authorize' in link.attrs.get('href'):
        final_result = link.attrs.get('href')
        return parse_link(final_result, username, password)"""
    return final_result
