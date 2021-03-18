/* Store name: [outer div, content tags, category tag]
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
    console.log(details)

    if (details.hasOwnProperty('url')) loadAjax('#result', details, writeResult);
    else if (details.hasOwnProperty('html_file')) parseFile(file, details, 'GET')
    else writeResult(details.text, details, 'GET');
});


function getAppValues(app_name, node) {
    let config = app_prop[app_name], data = [],
        [store_name, type] = app_name.split('_'),
        headers = ['it_name', 'it_img_json', 'it_origin', 'ca_id_extra', 'it_id_extra', 'it_url', 'it_price', 'it_whole_price'];
    if (type === 'D') headers = headers.concat(['it_intro', 'it_desc'])

    node.find(config[0]).each(function () {
        let sub_node = $(this), row = {};
        if (sub_node.find(config[1][0]).length) {
            config[1].map(function (val, i) {
                let hdr_title = headers[i], tags = sub_node.find(val), temp = '';
                if (val[0] === 'a' && i === 3) tags = node.find(val).eq(1);
                let item_url = tags.attr('href') ? ((tags.attr('href') === '#' && tags.attr('onclick')) ? tags.attr('onclick').split("'")[3] : tags.attr('href')) :
                    (tags.attr('src') ? tags.attr('src') : tags.find('img').each(function () {
                        temp += $(this).attr('src') + ',\n';
                    }));
                if (i === 1) item_url = (temp.length) ? '[' + temp + ']' : '[' + item_url + ']';
                switch (i | type) {
                    case 1 | ('D' | 'L'):
                    case 5:
                        // it_image_json + it_url
                        row[hdr_title] = item_url;
                        break;

                    case 2:
                        // it_origin
                        row[hdr_title] = store_name
                        break;

                    case 3:
                    case 4:
                        // it_cat_extra_id + it_item_extra_id
                        let item_id = getID(item_url);
                        row[hdr_title] = HT_to_ECK_id[item_id] ? HT_to_ECK_id[item_id] : item_id;
                        break;

                    case 8:
                    case 9:
                        // it_intro + it_desc
                        if (i === 9) tags = tags.find('th,td');
                        row[hdr_title] = '';
                        tags.each(function (j) {
                            if (i !== 8 || j) {
                                let text = $(this).text().replace(/([\n\r\[\]]+|[ ]{2,})/g, '');
                                row[hdr_title] += ($(this).prop('tagName') === 'TH') ? text + ':' : text + '\n';
                            }
                        });
                        break;

                    default:
                        // it_name + it_price + it_whole_price
                        let text = tags.eq(2).text() ? tags.eq(2).text() : tags.eq(1).text() ? tags.eq(1).text() : tags.eq(0).text();
                        row[hdr_title] = val.includes('textarea') ? (tags.attr('placeholder') ? tags.attr('placeholder') : tags.text().replace(/([\n\r\[\]]+|[ ]{2,})/g, '')) :
                            text.replace(/([\n\r\[\]]+|[ ]{2,})/g, '').replace(/(\d),(\d)/g, function (match, $1, $2,) {
                                return $1 + $2;
                            });
                }
            });
        }

        if (row) data.push(row);
    });

    $('#json_data').val(JSON.stringify(data));
    return createTable(data, headers)
}


function getID(url) {
    const match_result = /(?:(?:barcode|(?:ctgr|item)I[dD])=|[/])(?<id>\d+)/g.exec(url);
    return (match_result) ? match_result.groups.id : '';
}


function tester(_respText, details, method) {
    alert(JSON.stringify(details) + ' ' + method.toString())
}