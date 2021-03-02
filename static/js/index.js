function set_required() {
    $(":input[name='value']").prop('required', function () {
        return $(this).is(':visible');
    });
}

function load_ajax(container, details, return_func) {
    const url = details.url, method = details.request;
    $(function () {
        $.ajax({
            url: url, method: method,
            async: true, crossDomain: true,
            //credentials: 'include',
            headers: {
                'cache-control': 'no-cache',
                'postman-token': 'e044290e-4cb5-3056-fbc3-de2c26cecb79',
            },
            beforeSend: function () {
                $(container).html('Loading...');
            },
            fail: resp => console.log(resp, method, url)
        }).done(function (resp) {
            return_func(resp, details, method);
        });
    });
}


function parse_file(respText, details, method) {
    const reader = new FileReader();
    reader.readAsText(respText)
    reader.onload = function () {
        respText = reader.result
        write_result(respText, details, method);
    }
}


details.app_name = undefined;

function write_result(respText, details, method) {
    const result_div = $('#resultML'), html = document.createElement('html');
    if (!respText) result_div.text('None');
    html.innerHTML = respText.trim();

    let url;
    if (details.hasOwnProperty('html_file')) url = details.html_file;
    else url = details.link;

    $('#url').text(method + ' ' + url);
    result_div.text(formatML(html, 0).outerHTML);
    $('#resultTable').html(get_app_values(details.app_name, $(html)));
}


function get_app_values(app_name, node) {
    const app_prop = {
        'Shopify': ["div[class*='next-input-wrapper translation']", ['label', 'content'], ['label', 'textarea']],

        // TODO: fix empty curls
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
    //[['p', {'class': 'tit'}], ['span', {'class': 'discount'}], ['p', {'class': 'price'}]]

    let config = app_prop[app_name], data = [];
    node.find(config[0]).each(function () {
        let sub_node = $(this), row = {};
        if (sub_node.find(config[2][1]).length) {
            console.log(sub_node)
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

    let html = $(document.createElement('table')), head_row = $(document.createElement('tr'));
    html.attr('class', 'table table-striped table-responsive');
    config[1].forEach(function (value) {
        let head_item = $(document.createElement('th'));
        head_item.text(value);
        head_row.append(head_item);
    });
    html.append(head_row);

    let body_row = $(document.createElement('tr'));
    data.forEach(function (row, _) {
        body_row = $(document.createElement('tr'));
        Object.values(row).forEach(function (value) {
            let body_item = $(document.createElement('td'));
            body_item.html(value);
            body_row.append(body_item);
        });
        html.append(body_row)
    });
    if (app_name.includes('Detail')) html.addClass('transpose');
    return html;
}


function formatML(node, level) {
    let indentBefore = new Array(level++ + 1).join('    '),
        indentAfter = new Array(level - 1).join('    '),
        textNode;

    if (!node.children) return node;
    Array.from(node.children).forEach(function (child) {
        textNode = document.createTextNode('\n' + indentBefore);
        node.insertBefore(textNode, child);
        formatML(child, level);

        if (node.lastElementChild === child) {
            textNode = document.createTextNode('\n' + indentAfter);
            node.appendChild(textNode);
        }
    })
    return node;
}


function get_tour_info(key, details, tail, return_func) {
    let url = 'http://api.visitkorea.or.kr/openapi/service/rest/' + details.service + '/' + details.area + '?serviceKey=' + key + '&numOfRows=' + details.numOfRows +
        '&pageNo=' + details.pageNo + '&MobileOS=ETC&MobileApp=AppTest' + tail;
    load_ajax('#result', url, return_func);
}


function get_cat(respText, url) {
    let container = $(respText.documentElement), div_selection = [$('#id_cat1'), $('#id_cat2'), $('#id_cat3')], div;
    const switch_val = url.includes('cat2') ? 2 : (url.includes('cat1') ? 1 : 0)
    div = div_selection[switch_val];
    const is_equal = switch_val > 0 ? div_selection[switch_val - 1] && div_selection[switch_val - 1].children().last().text() === container.find('code,name').last().text() : false;
    if (switch_val === 1) div_selection[2].html('');

    if (!is_equal) {
        div.html(document.createElement('option'));
        container.find('item').each(function () {
            let item = $(this).find('code,name');
            let row = item.map(function () {
                return $(this).text();
            }).get();
            let opt = $(document.createElement('option'));
            opt.val(row[0]);
            opt.text(row[1]);
            div.append(opt);
        });
    } else {
        div.html('');
    }
}


function get_content_id(respText, _url) {
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


function change_last_div(elem) {
    let key = elem.val();
    if (key === 'areaBasedList') key = 'categoryCode'
    const select_div = $('#' + key);
    if (select_div) {
        $('.last').attr('hidden', '');
        select_div.removeAttr('hidden');
    }
}


function getMethods(obj) {
    let properties = new Set()
    let currentObj = obj
    do {
        Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}