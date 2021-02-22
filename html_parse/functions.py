from itertools import tee

from bs4 import BeautifulSoup
from urllib import request

__all__ = [
    'parse_link', 'get_dataframe'
]

from pandas import DataFrame

headers = {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'}

# Name: [Tag Name, Class Name, Table Header, Row Tags, Images Tag Info, Options Tag Info, Detail Tag Info, Detail Images Info]
APP_LIST = {
    'Shopify': [
        'div', 'next-input-wrapper translation', ['label', 'content'], []
    ],

    'SAM.GOV': [
        'div', '', [], []
    ],

    '1688 List': [
        'div', 'cardListItem', ['image', 'name', 'link', 'price', '# Sold', 'location'],
        [['span', None], ['div', {'class': 'salePrice'}], ['div', {'class': 'iteRep'}], ['div', {'class': 'itemAdr'}]]
    ],
    '1688 Detail': [
        'div', 'wp-content-fold-out', ['images', 'name', 'price', 'options', 'details', 'image details'],
        [['h1', {'class': 'd-title'}], ['div', {'class': 'price-original-sku'}]], ['mod', 'data-gallery-image-list'], ['div', 'obj-sku', ['span', {'class': 'vertical-img-title'}]],
        {'class': 'area-detail-feature'}, ['area-detail-feature', None]
    ],

    'Coupang List': [
        'li', 'baby-product renew-badge', ['image', 'name', 'link', 'base price', 'sale price', 'unit price', 'rating'],
        [['div', {'class': 'name'}], ['span', {'class': 'price-info'}], ['strong', {'class': 'price-value'}], ['span', {'class': 'unit-price'}], ['em', {'class': 'rating'}]]
    ],
    'Coupang Detail': [
        'div', 'product', ['images', 'name', 'options', 'details', 'image details'],
        [['h2', {'class': 'prod-buy-header__title'}]], ['prod-image__items', None], ['div', 'prod-option__item', ['li', {'class': 'prod-option-dropdown-item'}]],
        {'class': 'product-item__table'}, ['detail-item', None]
    ],

    'Hot Tracks List': [
        'li', None, ['image', 'name', 'link', 'base price', 'sale price'],
        [['p', {'class': 'tit'}], ['span', {'class': 'discount'}], ['p', {'class': 'price'}]]
    ],
    'Hot Tracks Detail': [
        'div', 'content', ['images', 'name', 'options', 'details', 'image details'],
        [['h2', {'class': 'tit'}]], ['slide_pannels', None], ['select', 'select', ['option']], {'id': 'detail_cont01'}, ['detail_cont01', None]
    ]
}


def get_items(item, tag_name, tag_value, sub_values, is_image=False):
    """ Get list of items. """
    div = item.find(tag_name, {'class': tag_value})
    return (([image_tag_parser(image) for image in div.get(sub_values).split(',')] if sub_values else [image_tag_parser(image) for image in div.findAll('img')]) if is_image else
            [subitem.text.replace('\n', ' ') for subitem in div.findAll(*sub_values)]) if div else []


def image_tag_parser(image):
    """ Parse image url as HTML tag. """
    url = image
    if not isinstance(image, str):
        url = image.get('src')
    return '<img src=" ' + url + '" width="100px">'


def pairwise(iterable):
    """ s -> (s0,s1), (s1,s2), (s2, s3), ... """
    a, b = tee(iterable)
    next(b, None)
    return zip(a, b)


def parse_link(link, username=None, password=None):
    """ Return Web Curling Result. """
    password_mgr = request.HTTPPasswordMgrWithDefaultRealm()
    password_mgr.add_password(None, link, username, password)
    handler = request.HTTPBasicAuthHandler(password_mgr)

    opener = request.build_opener(handler)
    opener.open(link)

    request.install_opener(opener)
    final_result = request.urlopen(link).read()
    return final_result


def get_dataframe(data, key):
    """ Returns the dataframe from HTML Curling """
    values, soup = APP_LIST.get(key), BeautifulSoup(data, features="lxml")
    final_data, header = [], values[2]
    if 'List' in key:
        if values[1]:
            items = soup.find_all(values[0], {'class': values[1]})
        else:
            items = soup.find_all(values[0])

        for item in items:
            if 'Shopify' in key and item.find('textarea'):
                row = [
                    str(item.find('label')).replace(r'/[\]', ''),
                ]
                textarea = item.find('textarea')
                if textarea.get('placeholder'):
                    row.append(item.find('textarea').get('placeholder'))
                else:
                    row.append(item.find('textarea').text)

            else:
                row_item = [item.find(*tag_value).text.replace('/[\n\r\\[\\]]+/g', '') if item.find(*tag_value) else '' for tag_value in values[3]]
                row = [image_tag_parser(item.find('img'))] + row_item

            link = item.find('a')
            if 'Shopify' not in key:
                if link:
                    address = link.get('href', '')
                    row.insert(2, address)
                else:
                    row.insert(2, None)

            final_data.append(row)

    else:
        if values[1]:
            item = soup.find(values[0], {'class': values[1]})
        else:
            item = soup.find(values[0])

        images = get_items(item, 'div', *values[4], True)
        options = get_items(item, *values[5])
        details = pairwise([child.replace('\t', '') for subitem in item.find('div', values[6]).findAll(['dd', 'th', 'td'])
                            for child in subitem.text.splitlines() if child != '' and child.replace('\t', '')])
        detail_images = get_items(item, 'div', *values[7], True)

        row = [' '.join(images)] + [
            item.find(*tag_value).text.replace('/[\n\r\\[\\]]+/g', '') if item.find(*tag_value) else '' for tag_value in values[3]
        ] + [
            '<br/>'.join(options),
            str('<br/><br/>'.join([': '.join(detail) for detail in details]))
        ] + [' '.join(detail_images)]
        final_data.append(row)

    dataframe = DataFrame(columns=header, data=final_data)
    if 'Detail' in key:
        return dataframe.transpose()
    return dataframe
