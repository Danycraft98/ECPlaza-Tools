/*** App Name to Content Properties ***
 * Store name: [outer div, content tags, category tag]
 *
 * List: [Name, Image, Origin Store, Category ID, Item ID, Link, Price, Wholesale Price]
 * Detail: [Name, Image, Origin Store, Category ID, Item ID, Link, Price, Wholesale Price, Options, Details]
 */
let app_prop = {
        'Shopify': ["div[class*='next-input-wrapper translation']", ['label', 'content'], ['label', 'textarea']],

        '1688_L': ["div[class*='cardListItem']", ['span', 'img', '', '', 'a', 'a', "div[class*='salePrice']", "div[class*='salePrice']"]],
        '1688_D': ["div[class*='wp-content-fold-out']", ["h1[class='d-title']", "div[class*='gallery']", "div[class*='price-original-sku']", "span[class*='area-detail-feature']", "div[class*='obj-sku']", "div[class*='area-detail-feature']"]],

        'Coupang_L': ["li[class*='baby-product renew-badge']", ["div[class*='name']", 'img', '', "div[class*='search-result']", 'a', 'a', "[class*='base-price'],[class*='price-value']", "[class*='base-price'],[class*='price-value']"]],
        'Coupang_D': ["div[class*='product']", ["h2[class*='prod-buy-header__title']", "img[class='prod-image__detail']", "label[class*='select-option__text']", "table[class*='prod-delivery-return-policy'], div[class*='detail-item']"]],

        'HT_L': ["li", ["p[class*='tit']", 'img', '', "a[class*='location']", 'a[title]', 'a[title]', "p[class*='price'] span", "p[class*='price'] span"]], //,p[class*='price']
        'HT_D': ["div[class*='content']", ["h2[class*='tit']", "div[class*='slide_pannels']", '', "a[class*='location']", "div[class='btn_wrap'] a", "div[class='btn_wrap'] a",
            "div[class*='price']", "div[class*='price']", 'option', "table[class*='table'],div[class*='detail_product_img']"]], //"div[id*='detail_cont01']"
    },
    HT_to_ECK_id = {}


//*** Basic Functions in submitting form and returning result. ***
function submitForm(e) {
    e.preventDefault();
    $('.hidden').removeClass('hidden');
    let is_postman_form = e.target.id === 'postman', file = null, details = {};
    $(e.target).find(":input:visible:not('button,:radio,[id*=json_data]')").each(function (i) {
        let tag = $(this);
        if (is_postman_form) {
            if (tag.attr('name').includes('html_file')) file = tag.get(0).files[0];
            if (tag.val()) details[tag.attr('name')] = tag.val();
        } else {
            if (tag.val()) {
                if (i < 4) details[tag.attr('name')] = tag.val();
                else tail += '&' + tag.attr('name') + '=' + tag.val();
            }
        }
    });
    if (is_postman_form) {
        const radio = $('input:radio:checked');
        details[radio.attr('name')] = radio.val();

        if (details.hasOwnProperty('url')) loadAjax('#result', details, writeResult);
        else if (details.hasOwnProperty('html_file')) parseFile(file, details, 'GET')
        else writeResult(details.text, details, 'GET');
    } else {
        getTourInfo(key, details, tail, writeResult);
    }
}

function toDatabase(url) {
    let datetime_obj = new Date();
    let datetime = datetime_obj.toLocaleString('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'})
        + datetime_obj.toLocaleString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'});

    let data = $(JSON.parse($('#json_data').val()));
    const details = {url: url, method: 'POST'}
    loadAjax(document.createElement('div'), $.extend(details, {data: JSON.stringify({total_count: 1, crawling_time: datetime, product: data.toArray()})}), APIPostResult);
}

function APIPostResult(respText, _details, _method) {
    alert(JSON.stringify(respText))//JSON.stringify(details) + ' ' + method.toString() + '.')
}


//*** Data Organizing Functions ***
function getAppValues(app_name, node) {
    let config = app_prop[app_name], data = [],
        [store_name, type] = app_name.split('_'),
        headers = ['it_name', 'it_img_json', 'it_origin', 'ca_id_extra', 'it_id_extra', 'it_url', 'it_price', 'it_whole_price'];
    if (type === 'D') headers = headers.concat(['it_intro', 'it_desc'])

    node.find(config[0]).each(function () {
        let sub_node = $(this), row = {};
        if (sub_node.find(config[1][0]).length) {
            console.log(sub_node.find(config[1][0]).text())
            config[1].map(function (val, i) {
                let hdr_title = headers[i], tags = sub_node.find(val), temp = '';
                if (val[0] === 'a' && i === 3) tags = node.find(val).eq(1);
                let item_url = tags.attr('href') ? ((tags.attr('href') === '#' && tags.attr('onclick')) ? tags.attr('onclick').split("'")[3] : tags.attr('href')) :
                    (tags.attr('src') ? tags.attr('src') : tags.find('img').each(function () {
                        temp += $(this).attr('src') + ',\n';
                    }));
                switch (i | type) {
                    case 1 | ('D' | 'L'):
                    case 5: // it_image_json + it_url
                        let header = '';
                        if (i === 1) item_url = (temp.length) ? '[' + temp + ']' : '[' + item_url + ']';
                        if (i === 5) header = app_name === 'HT_L' ? 'http://www.hottracks.co.kr' : app_name === 'Coupang_L' ? 'https://www.coupang.com/' : ''
                        row[hdr_title] = header + item_url;
                        break;

                    case 2: // it_origin
                        row[hdr_title] = store_name
                        break;

                    case 3:
                    case 4: // it_cat_extra_id + it_item_extra_id
                        let item_id = getID(item_url);
                        row[hdr_title] = HT_to_ECK_id[item_id] ? HT_to_ECK_id[item_id] : item_id;
                        break;

                    case 8:
                    case 9: // it_intro + it_desc
                        if (i === 9) tags = tags.find('th,td');
                        row[hdr_title] = '';
                        tags.each(function (j) {
                            if (i !== 8 || j) {
                                let text = $(this).text().replace(/([\n\r\[\]]+|[ ]{2,})/g, '');
                                row[hdr_title] += ($(this).prop('tagName') === 'TH') ? text + ':' : text + '\n';
                            }
                        });
                        break;

                    default: // it_name + it_price + it_whole_price
                        let text = tags.eq(2).text() ? tags.eq(2).text() : tags.eq(1).text() ? tags.eq(1).text() : tags.eq(0).text();
                        row[hdr_title] = val.includes('textarea') ? (tags.attr('placeholder') ? tags.attr('placeholder') : tags.text().replace(/([\n\r\[\]]+|[ ]{2,})/g, '')) :
                            text.replace(/([\n\r\[\]]+|[ ]{2,})/g, '').replace(/(\d),(\d)/g, function (match, $1, $2,) {
                                return $1 + $2;
                            });
                }
            });
        }
        if (row.it_name) data.push(row);
    });
    return data;
}

/*data.push({
    kc_section: '', kc_group: '080105', kc_board: 'K-STUDY', kc_title: row.title,
    kc_contents: `Address: ${row.addr1}\nduration: ${row.eventstartdate} to ${row.eventenddate}.`,
    kc_thumbnail: text, kc_writer: 'email?'
});*/

function createTable(data) {
    $('#json_data').val(JSON.stringify(data));

    let html = $(document.createElement('table')), head_row = $(document.createElement('tr'));
    html.attr('class', 'table table-striped table-hover')

    $.each(data.first()[0], function (value) {
        let head_item = $(document.createElement('th'));
        head_item.text(value);
        head_row.append(head_item);
    })
    html.append(head_row);

    let body_row = $(document.createElement('tr'));
    $.each(data, function (_, row) {
        console.log('row', row)
        body_row = $(document.createElement('tr'));
        $.each(row, function (_, col) {
            let body_item = $(document.createElement('td'));
            body_item.html(col);
            body_row.append(body_item);
        });
        if (body_row.children().length > 0) html.append(body_row)
    })
    return html;
}


//*** Other Tour API Functions ***
function getTourInfo(key, details, tail, returnFunc) {
    details.url = 'http://api.visitkorea.or.kr/openapi/service/rest/' + details.service + '/' + details.area + '?serviceKey=' + key + '&numOfRows=' + details.numOfRows +
        '&pageNo=' + details.pageNo + '&MobileOS=ETC&MobileApp=AppTest&_type=json' + tail;
    loadAjax('#result', details, returnFunc);
}

function getCat(respText, details) {
    const url = details.url;
    let container = $(respText.documentElement), div_selection = [$('#id_cat1'), $('#id_cat2'), $('#id_cat3')], div;
    const switch_val = url.includes('cat2') ? 2 : (url.includes('cat1') ? 1 : 0)
    div = div_selection[switch_val];
    const is_equal = switch_val > 0 ? div_selection[switch_val - 1] && div_selection[switch_val - 1].children().last().text() === container.find('code,name').last().text() : false;
    if (switch_val === 1) div_selection[2].html('');

    if (!is_equal) {
        div.html(document.createElement('option'));
        container.find('item').each(function () {
            let item = $(this).find('code,name'), opt = $(document.createElement('option'))
            let row = item.map(function () {
                return $(this).text();
            }).get();
            opt.val(row[0]).text(row[1]);
            div.append(opt);
        });
    } else {
        div.html('');
    }
}

function getContentId(respText, _url) {
    let container = $(respText.documentElement), div = $('#id_contentId');
    div.html('');
    container.find('item').each(function () {
        let item = $(this).find('contentid');
        let opt = $(document.createElement('option'));
        opt.val(item.text());
        opt.text(item.text());
        div.append(opt);
    });
}

function changeLastDiv(elem) {
    let key = elem.val();
    if (key === 'areaBasedList') key = 'categoryCode'
    const select_div = $('#' + key);
    if (select_div) {
        $('.last').attr('hidden', '');
        select_div.removeAttr('hidden');
    }
}

function getID(url) {
    const match_result = /(?:(?:barcode|(?:ctgr|item)I[dD])=|[/])(?<id>\d+)/g.exec(url);
    return (match_result) ? match_result.groups.id : '';
}