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
    const app_prop = {
        'Shopify': ["div[class*='next-input-wrapper translation']", ['label', 'content'], ['label', 'textarea']],

        '1688 List': ["div[class*='cardListItem']", ['image', 'name', 'link', 'price', '# Sold', 'location'],
            ['img', 'span', "div[class*='salePrice']", "div[class*='iteRep']", "div[class*='itemAdr']"]],

        '1688 Detail': ["div[class*='wp-content-fold-out']", ['images', 'name', 'price', 'options', 'details'],
            ["div[class*='gallery']", "h1[class='d-title']", "div[class*='price-original-sku']", "span[class*='area-detail-feature']", "div[class*='obj-sku']", "div[class*='area-detail-feature']"]],

        //  TODO: fix rating
        'Coupang List': ["li[class*='baby-product renew-badge']", ['image', 'name', 'link', 'base price', 'sale price', 'unit price', 'rating'],
            ["img", "div[class*='name']", 'a', "span[class*='price-info']", "strong[class*='price-value']", "em[class*='rating']"]],

        'Coupang Detail': ["div[class*='product']", ['images', 'name', 'options', 'details'],
            ["img[class='prod-image__detail']", "h2[class*='prod-buy-header__title']", "label[class*='select-option__text']", "table[class*='prod-delivery-return-policy'], div[class*='detail-item']"]],

        'Hot Tracks List': ["li", ['image', 'name', 'link', 'base price', 'sale price'],
            ["img", "p[class*='tit']", 'a', "span[class*='discount']", "p[class*='price']"]],

        'Hot Tracks Detail': ["div[class*='content']", ['images', 'name', 'options', 'details'],
            ["div[class*='slide_pannels']", "h2[class*='tit']", "span[class*='discount']", 'option', "div[id*='detail_cont01']"]],
    };

    let config = app_prop[app_name], data = [];
    node.find(config[0]).each(function () {
        let sub_node = $(this), row = {};
        if (sub_node.find(config[2][1]).length) {
            config[2].forEach(function (value, i) {
                let tags = sub_node.find(value);
                if (i === 0 || i === config[2].length - 1)
                    row[config[1][i]] = tags.prop('outerHTML');

                else if (app_name.includes('List') && i === 2) {
                    const a_tag = $(document.createElement('a'))
                        .attr('href', tags.attr('href'))
                        .text('Link to Product')
                    row[config[1][i]] = a_tag.prop('outerHTML');

                } else if (value.includes('textarea')) {
                    if (tags.attr('placeholder')) row[config[1][i]] = tags.attr('placeholder');
                    else row[config[1][i]] = tags.text().replace('/[\n\r\\[\\]]+/g', '');

                } else
                    row[config[1][i]] = tags.text().replace('/[\r\\[\\]]+/g', '').replace('/\n+/g', '<br/>');
            });
        }
        data.push(row);
    });
    return create_table(app_name, data, config[1])
}


function to_database(data, url) {
    const table = create_json($('table'));
    table.rows.forEach(function (row) {
        console.log('row in progress...');
        data.sql = 'INSERT INTO file_app_product (images, name, options, details, image_details) VALUES ('
        $.each(row, function (_, col) {
            data.sql += col
        });
        data.sql += ')';
        data.url = url;
        data.request = 'POST';
        load_ajax(document.createElement('div'), data, console.log);
    });
}