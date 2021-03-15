$(document).ready(function () {
    $('.dataTable').DataTable();
});


$('#postman').submit(function (e) {
    e.preventDefault();
    $('.hidden').removeClass('hidden');
    let details = {}, file = null;
    $(this).find(":input:visible:not('button')").each(function () {
        let tag = $(this);
        if (tag.attr('name').includes('html_file')) file = tag.get(0).files[0];
        if (tag.val()) details[tag.attr('name')] = tag.val();
    });

    if (details.hasOwnProperty('url')) load_ajax('#result', details, write_result);
    else if (details.hasOwnProperty('html_file')) parse_file(file, details, 'GET')
    else write_result(details.text, details, 'GET');
});


function get_app_values(app_name, node) {
    /* Store name: [outer div, header titles, content tags, category tag]
     *
     * List: [Name, Image, Link, Price, Others]
     * Detail: [Name, Images, Price, Options, Details]
     */
    const header_prop = {
        'List': ['it_name', 'it_img_json', 'it_url', 'it_price', 'it_whole_price'],
        'Detail': ['it_name', 'it_img_json', 'options?', 'it_desc'],
    }
    const app_prop = {
        'Shopify': ["div[class*='next-input-wrapper translation']", ['label', 'content'], ['label', 'textarea']],

        '1688 List': ["div[class*='cardListItem']", ['span', 'img', "div[class*='salePrice']", "div[class*='iteRep']", "div[class*='itemAdr']"]],

        '1688 Detail': ["div[class*='wp-content-fold-out']", ["h1[class='d-title']", "div[class*='gallery']", "div[class*='price-original-sku']", "span[class*='area-detail-feature']", "div[class*='obj-sku']", "div[class*='area-detail-feature']"]],

        'Coupang List': ["li[class*='baby-product renew-badge']", ["div[class*='name']", 'img', 'a', "[class*='base-price'],[class*='price-value']", "[class*='base-price'],[class*='price-value']"], "div[class*='search-result']"],

        'Coupang Detail': ["div[class*='product']", ["h2[class*='prod-buy-header__title']", "img[class='prod-image__detail']", "label[class*='select-option__text']", "table[class*='prod-delivery-return-policy'], div[class*='detail-item']"]],

        'Hot Tracks List': ["li", ["p[class*='tit']", 'img', 'a', "span[class*='discount'],p[class*='price']", "span[class*='discount'],p[class*='price']"], "div[class*='location_nav_wrap']"],

        'Hot Tracks Detail': ["div[class*='content']", ["h2[class*='tit']", "div[class*='slide_pannels']", "span[class*='discount']", 'option', "div[id*='detail_cont01']"]],
    };

    let config = app_prop[app_name], data = [],
        type = app_name.split(' ')[app_name.split(' ').length - 1],
        header = header_prop[type],
        cat_url = (config.length > 2) ? node.find(config[2]).find('a').last().attr('href') : '';

    node.find(config[0]).each(function () {
        let sub_node = $(this), row = {};
        if (sub_node.find(config[1][0]).length) {
            config[1].forEach(function (value, i) {
                let tags = sub_node.find(value);
                if (i === 1 || i === header.length - 1) row[header[i]] = (tags.attr('src')) ? tags.attr('src') : tags;
                else if (type === 'List' && i === 2) {
                    const item_url = tags.attr('href');
                    row = $.extend(row, {'it_origin': app_name, 'ca_id_extra': cat_url.match(/\d\d+/g), 'it_id_extra': item_url.match(/\d\d+/g)});  //.match(/d[2:]/g)
                    row[header[i]] = item_url; // const a_tag = $(document.createElement('a')).attr('href', tags.attr('href')).text('Link to Product'); a_tag.prop('outerHTML');
                } else if (value.includes('textarea')) {
                    if (tags.attr('placeholder')) row[header[i]] = tags.attr('placeholder');
                    else row[header[i]] = tags.text().replace('/[\n\r\\[\\]]+/g', '');
                } else row[header[i]] = tags.text().replace('/[\r\\[\\]]+/g', '').replace('/\n+/g', '<br/>');
            });
        }
        if (row.hasOwnProperty('it_name')) data.push(row);
    });

    if (app_name.includes('List'))
        ['it_origin', 'ca_id_extra', 'it_id_extra'].forEach(function (val, i) {
            header.splice(i + 2, 0, val);
        })

    $('#json_data').val(JSON.stringify(data));
    return create_table(app_name, data, header)
}


function to_database() {
    let details = {
        url: 'http://api-test.eckorea.net:7272/hottracks/product/',
        request: 'POST', data: JSON.parse($('#json_data').val())
    };
    load_ajax(document.createElement('div'), details, console.log)
    /*table.rows.forEach(function (row) {
        console.log('row in progress...');
        console.log(row)
        data.sql = 'INSERT INTO file_app_product (images, name, options, details, image_details) VALUES ('
        $.each(row, function (_, col) {
            data.sql += col
        });
        data.sql += ')';
        data.url = url;
        data.request = 'POST';
        load_ajax(document.createElement('div'), data, console.log);
    });*/
}