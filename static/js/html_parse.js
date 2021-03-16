/* Store name: [outer div, content tags, category tag]
 *
 * List: [Name, Image, Origin Store, Category ID, Item ID, Link, Price, Wholesale Price]
 * Detail: [Name, Images, Price, Options, Details]
 */
let header_prop = {
        'L': ['it_name', 'it_img_json', 'it_origin', 'ca_id_extra', 'it_id_extra', 'it_url', 'it_price', 'it_whole_price'],
        'Detail': ['it_name', 'it_img_json', 'options?', 'it_desc'],
    },
    app_prop = {
        'Shopify': ["div[class*='next-input-wrapper translation']", ['label', 'content'], ['label', 'textarea']],

        '1688_L': ["div[class*='cardListItem']", ['span', 'img', 'a', "div[class*='salePrice']", "div[class*='salePrice']"]],

        '1688 Detail': ["div[class*='wp-content-fold-out']", ["h1[class='d-title']", "div[class*='gallery']", "div[class*='price-original-sku']", "span[class*='area-detail-feature']", "div[class*='obj-sku']", "div[class*='area-detail-feature']"]],

        'Coupang_L': ["li[class*='baby-product renew-badge']", ["div[class*='name']", 'img', 'a', "[class*='base-price'],[class*='price-value']", "[class*='base-price'],[class*='price-value']"], "div[class*='search-result']"],

        'Coupang Detail': ["div[class*='product']", ["h2[class*='prod-buy-header__title']", "img[class='prod-image__detail']", "label[class*='select-option__text']", "table[class*='prod-delivery-return-policy'], div[class*='detail-item']"]],

        'HT_L': ["li", ["p[class*='tit']", 'img', 'a', "span[class*='discount']", "span[class*='discount']"], "div[class*='location_nav_wrap']"], //,p[class*='price']

        'Hot Tracks Detail': ["div[class*='content']", ["h2[class*='tit']", "div[class*='slide_pannels']", "span[class*='discount']", 'option', "div[id*='detail_cont01']"]],
    };


$(document).ready(function () {
    $('.dataTable').DataTable();
});


$('#postman').submit(function (e) {
    e.preventDefault();
    $('.hidden').removeClass('hidden');
    let details = {}, file = null;
    $(this).find(":input:visible:not('button'):not(':radio')").each(function () {
        let tag = $(this);
        if (tag.attr('name').includes('html_file')) file = tag.get(0).files[0];
        //:checked'
        if (tag.val()) details[tag.attr('name')] = tag.val();
    });
    const radio = $('input:radio:checked');
    details[radio.attr('name')] = radio.val();

    if (details.hasOwnProperty('url')) loadAjax('#result', details, writeResult);
    else if (details.hasOwnProperty('html_file')) parseFile(file, details, 'GET')
    else writeResult(details.text, details, 'GET');
});


function getAppValues(app_name, node) {
    let config = app_prop[app_name], data = [],
        [store_name, type] = app_name.split('_'),
        header = header_prop[type],
        cat_url = (config.length > 2) ? node.find(config[2]).find('a').last().attr('href') : '';

    node.find(config[0]).each(function () {
        let sub_node = $(this), row = {};
        if (sub_node.find(config[1][0]).length) {
            config[1].forEach(function (value, i) {
                let tags = sub_node.find(value), item_url = tags.attr('href');
                switch (i | value) {
                    case 1:
                        row[header[i]] = (tags.attr('src')) ? tags.attr('src') : tags;
                        break;

                    case 2 | 'L':
                        row = $.extend(row, {'it_origin': store_name, 'ca_id_extra': getID(cat_url), 'it_id_extra': getID(item_url)});
                        //TODO: get HTTP value
                        row[header[i]] = item_url;
                        break;

                    default:
                        if (value.includes('textarea')) row[header[i]] = (tags.attr('placeholder')) ? tags.attr('placeholder') : tags.text().replace(/([\n\r\[\]]+|[ ]{2,})/g, '');
                        else row[header[i]] = tags.text().replace(/([\n\r\[\]]+|[ ]{2,})/g, '').replace(/(\d),(\d)/g, function (match, $1, $2,) {
                            return $1 + $2;
                        });

                }
            });
        }
        if (row.hasOwnProperty('it_name')) data.push(row);
    });

    $('#json_data').val(JSON.stringify(data));
    return createTable(app_name, data, header)
}


function getID(url) {
    const match_pat = /[=|/]\d\d+/g;
    return (url && url.match(match_pat)) ? url.match(match_pat)[0].replace(/[=|/]/g, '') : '';
}


function toDatabase(urls) {
    let details = {url: urls[0], request: 'POST'}, data = $(JSON.parse($('#json_data').val()));
    loadAjax(document.createElement('div'), $.extend(details, {data: JSON.stringify({total_count: 1, crawling_time: '2021-03-15 13:45:050', product: data.toArray()})}), tester);
}

function tester(_respText, details, method) {
    alert(JSON.stringify(details) + ' ' + method.toString())
}