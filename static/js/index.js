/*** App Name to Content Properties ***
 * Store name: [outer div, content tags, category tag]
 *
 * List: [Name, Image, Origin Store, Category ID, Item ID, Link, Price, Wholesale Price]
 * Detail: [Name, Image, Origin Store, Category ID, Item ID, Link, Price, Wholesale Price, Intro, Details]
 */
let url_to_app = {
        '1688': ['1688_L', '1688_D'],
        'coupang': ['Coupang_L', 'Coupang_D'],
        'hottracks': ['HT_L', 'HT_D'],
    },
    app_prop = {
        'Shopify': ["div[class*='next-input-wrapper translation']", ['label', 'content'], ['label', 'textarea']],

        '1688_L': ["div[class*='cardListItem']", ['span', 'img', '', '', 'a', 'a', "div[class*='salePrice']", "div[class*='salePrice']"]],
        '1688_D': ["div[class*='wp-content-fold-out']", ["h1[class='d-title']", "div[class*='gallery']", "div[class*='price-original-sku']", "span[class*='area-detail-feature']", "div[class*='obj-sku']", "div[class*='area-detail-feature']"]],

        'Coupang_L': ["li[class*='baby-product renew-badge']", ["div[class*='name']", 'img', '', "div[class*='search-result']", 'a', 'a', "[class*='base-price'],[class*='price-value']", "[class*='base-price'],[class*='price-value']"]],
        'Coupang_D': ["div[class*='product']", ["h2[class*='prod-buy-header__title']", "img[class='prod-image__detail']", "label[class*='select-option__text']", "table[class*='prod-delivery-return-policy'], div[class*='detail-item']"]],

        'HT_L': ["li", ["p[class*='tit']", 'img', '', "a[title]", 'a[title]', 'a[title]', "p[class*='price'] span", "p[class*='price'] span"]], //,p[class*='price']
        'HT_D': ["div[class*='content']", ["h2[class*='tit']", "div[class*='slide_pannels']", '', "a[class*='location']", "div[class='btn_wrap'] a", "div[class='btn_wrap'] a",
            "div[class*='price']", "div[class*='price']", "div[id*='detail_cont']", "div[id*='detail_cont']"]], //"div[id*='detail_cont01']"
    },
    HT_to_ECK_id = {}, TOUR_to_ECK_id = {};


/*** Main Javascript ***
 * All Basic Functions of the Web App
 * */

function getMethods(obj) {
    let properties = new Set(), currentObj = obj;
    do {
        Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}


//*** Scroll to Top Functions **
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    const btn = $('#myBtn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) btn.attr('style', 'display: block;');
    else btn.attr('style', 'display: none;');
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


/*** GET and POST Functions Javascript ***
 * All Request Functions
 * */

//*** Ajax Request Function ***
function loadAjax(details, returnFunc, container) {
    const request_item = $.extend({
        async: true, crossDomain: true,
        mode: 'cors', credentials: 'include', origin: "*",
        headers: {
            /*'Access-Control-Allow-Origin':  '*',
            'Access-Control-Request-Method': details.method,
            'Access-Control-Request-Headers': 'Content-Type, Authorization',
            'postman-token': 'e044290e-4cb5-3056-fbc3-de2c26cecb79',*/
            'content-type': 'application/json',
            'cache-control': 'no-cache',
        },
        beforeSend: function () {
            if (container) $(container).html('Loading...');
            else console.log('Loading...')
        },
        fail: resp => console.log(resp, details)
    }, details)
    $.ajax(request_item).done(function (resp) {
        returnFunc(resp, details);
    });
}

//*** Basic Functions in submitting form and returning result. ***
function submitForm(e) {
    $('#resultML').text('');
    $('#nav-table').text('');
    $('#json_data').text('');

    e.preventDefault();
    $('.hidden').removeClass('hidden');
    let is_postman_form = e.target.id === 'postman', file = null, details = {}, tail = '';
    $(e.target).find(":input:visible:not('button,:radio,[id*=json_data]')").each(function (i) {
        let tag = $(this);
        if (is_postman_form) {
            if (tag.attr('name').includes('html_file')) file = tag.get(0).files[0];
            else if (tag.attr('name').includes('excel_file')) file = tag.get(0).files[0];
            if (tag.val()) details[tag.attr('name')] = tag.val();

        } else if (tag.val()) {
            if (i < 4) details[tag.attr('name')] = tag.val();
            else tail += '&' + tag.attr('name') + '=' + tag.val();
        }
    });

    if (is_postman_form) {
        if (details.hasOwnProperty('url')) loadAjax(details, writeResult, '#result');
        else parseFile(file, details);
    } else getTourValues(key, details, tail, writeResult);

}

function parseFile(respText, details) {
    const reader = new FileReader();
    reader.readAsText(respText);
    reader.onload = function () {
        details.method = 'GET';
        respText = reader.result;
        if (details.hasOwnProperty('html_file'))
            writeResult(respText, details);
        else {
            $.each(respText.split('\n'), function (_, url) {
                if (url === '') return;
                details = $.extend(details, {url: url});
                loadAjax(details, writeResult, '#result');
            })
        }
    }
}

function writeResult(respText, details) {
    let result_div = $('#resultML'), table_div = $('#nav-table'),
        hidden_data = $('#json_data'), raw_data, refined_data, final_data = [],
        first_item = JSON.parse(hidden_data.val() ? hidden_data.val() : '{}');

    if (!respText) {
        result_div.text('None');
        table_div.text('None');
        return;
    }

    details.url = details.hasOwnProperty('html_file') ? details.html_file : details.url;
    raw_data = getMethods(respText).includes('trim') ? $(respText.trim()) : $(respText);
    refined_data = /visitkorea/g.exec(details.url) ? getTourItems(details.url, raw_data) : /(?:http|app)/g.exec(details.url) ? getAppValues(details.url, raw_data) : raw_data;

    if (/visitkorea/g.exec(details.url))
        $(refined_data).each(function (i, list) {
            $.each($(list), function (j, item) {
                if (!details.area.includes('detailInfo') && !details.area.includes('detailImage')) {
                    if (first_item.length) final_data = final_data.concat(first_item);
                    $('#url').text((details.method ? details.method : 'GET') + ' ' + details.url);
                    getTourValues(key, $.extend(details, {area: 'detailInfo'}), `&contentTypeId=${item.contenttypeid}&contentId=${item.contentid}`, writeResult);
                    getTourValues(key, $.extend(details, {area: 'detailImage'}), `&contentTypeId=${item.contenttypeid}&contentId=${item.contentid}`, writeResult);
                }
                if (j < final_data.length) final_data[j] = $.extend(final_data[j], item);
                else final_data.push(item);
            });
            //.length > 1 ? elem.response.body.items.item[i] : elem.response.body.items.item);
            //if (/detailImage/g.exec(url))
        });
    else final_data[final_data.length] = refined_data;

    hidden_data.val(JSON.stringify(final_data));
    if (details.hasOwnProperty('service')) table_div.html(createTable($(final_data)));
    else table_div.append(createTable(refined_data));
    result_div.text(result_div.text() + '-Next Link------------------------\n' + formatCode(refined_data));
}

function toDatabase(url) {
    let datetime_obj = new Date(),
        datetime = datetime_obj.toLocaleString('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}) + ' '
            + datetime_obj.toLocaleString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'}),

        data = $(JSON.parse($('#json_data').val())).map(function (_, item) {
            return item.response.body.items.item;
        }),
        list = data.toArray(),
        details = {url: url, method: 'POST'};
    console.log($.extend(details, {data: JSON.stringify({total_count: list.length, crawling_time: datetime, product: list})}), alert);
    //loadAjax($.extend(details, {data: JSON.stringify({total_count: list.length, crawling_time: datetime, product: list})}), alert);
}


/*** Data Organizing Functions ***
 * All Visual Data Organizer
 * */
function getAppValues(url, node) {
    let app_list = url_to_app[url.split(/\./g)[1]], app_name = /detail|itemid/g.exec(url.toLowerCase()) ? app_list[1] : app_list[0],
        config = app_prop[app_name], data = [], [store_name, type] = app_name.split('_'),
        headers = ['it_name', 'it_img_json', 'it_origin', 'ca_id_extra', 'it_id_extra', 'it_url', 'it_price', 'it_whole_price'];

    if (type === 'D') headers = headers.concat(['it_intro', 'it_desc']);
    $.each(node.find(config[0]), function (index, sub_node) {
        sub_node = $(sub_node);
        let row = {}, text;
        if (sub_node.find(config[1][0]).length) {
            if (type === 'D' && index > 0) return;
            config[1].map(function (val, i) {
                let hdr_title = headers[i], tags = sub_node.find(val);
                if (val[0] === 'a' && i === 3) tags = node.find(val).eq(1);
                let item_url = tags.attr('href') ? ((tags.attr('href') === '#' && tags.attr('onclick')) ? tags.attr('onclick').split("'")[3] : tags.attr('href')) :
                    (tags.attr('src') ? tags.prop('outerHTML') : tags.find('img').prop('outerHTML'));

                switch (i | type) {
                    case 1 | ('D' | 'L'):
                    case 5: // it_image_json + it_url
                        let header = '';
                        if (i === 1) item_url = $(item_url.split('> ')).each(function () {
                            return this + '>';
                        }).get(0);
                        if (i === 5) header = app_name === 'HT_L' ? 'http://www.hottracks.co.kr' : app_name === 'Coupang_L' ? 'https://www.coupang.com/' : ''
                        row[hdr_title] = header + item_url;
                        break;

                    case 2: // it_origin
                        row[hdr_title] = store_name
                        break;

                    case 3:
                    case 4: // it_cat_extra_id + it_item_extra_id
                        let item_id = getID(item_url, 4 - i);
                        row[hdr_title] = HT_to_ECK_id[item_id] ? HT_to_ECK_id[item_id] : item_id;
                        break;

                    case 8:
                    case 9: // it_intro + it_desc
                        let found_tags = (i === 8) ? tags.find('th, td') : tags.find('th, td, img');
                        row[hdr_title] = '';
                        $.each(found_tags, (_, item) => {
                            item = $(item);
                            //if (item.prop('tagName') === 'IMG') return;
                            row[hdr_title] += item.prop('tagName')[0] === 'T' ? item.text().replace(/([\n\r\[\]]+|[ ]{2,})/g, '') : '';
                            row[hdr_title] += item.prop('tagName') === 'IMG' ? item.attr('src') + '\n' : item.prop('tagName') === 'TH' ? ':' : '\n';
                        });
                        break;

                    default: // it_name + it_price + it_whole_price + Shopify textbox
                        text = tags.eq(2).text() ? tags.eq(2).text() : tags.eq(1).text() ? tags.eq(1).text() : tags.eq(0).text();
                        row[hdr_title] = val.includes('textarea') ?
                            (tags.attr('placeholder') ? tags.attr('placeholder') : tags.text().replace(/([\n\r\[\]]+|[ ]{2,})/g, '')) :
                            text.replace(/([\n\r\[\]]+|[ ]{2,})/g, '').replace(/(\d),(\d)/g, '$1$2');

                        let split_val = row[hdr_title].split(/\s+/g)
                        row[hdr_title] = (row[hdr_title].match(/\d+\s+\d+/g) && split_val.length) > 1 ? split_val[0] : row[hdr_title];
                }
            });
        }
        if (row.hasOwnProperty('it_name') && row.it_name) data.push(row);
    });
    return $(data);
}

function getTourValues(key, details, tail, returnFunc) {
    details.url = 'http://api.visitkorea.or.kr/openapi/service/rest/' + details.service + '/' + details.area + '?serviceKey=' + key + '&numOfRows=' + details.numOfRows +
        '&pageNo=' + details.pageNo + '&MobileOS=ETC&MobileApp=AppTest&_type=json' + tail;
    loadAjax(details, returnFunc, '#result');
}

function getID(url, i) {
    const match_result = (i ? /(?:(?:(?:ctgr|item)I[dD])=|[/])(?<id>\d+)/g : /(?:(?:barcode|(?:ctgr|item)I[dD])=|[/])(?<id>\d+)/g).exec(url);
    return (match_result) ? match_result.groups.id : '';
}

function formatCode(node, level = 0) {
    let indentBefore = new Array(level++ + 1).join('    '),
        indentAfter = new Array(level - 1).join('    '),
        textNode = '', xmlSerializer = new XMLSerializer();

    $.each(node, function (key, val) {
        if (/^\d+/.exec(key)) key = 'ItemNo' + key;
        let is_string = !(val.constructor === ({}).constructor || val.constructor === ([]).constructor),
            value = (is_string) ? val.toString().replace(/([&<>])/g, escape('$1')).replace(/(^<img [^>]+)>/g, '$1/>') : formatCode(val, level);

        let item = $.parseXML(value.length ? '<' + key + '>' + value + '</' + key + '>' : '<' + key + '/>');
        textNode += '\n' + indentBefore + xmlSerializer.serializeToString(item) + '\n' + indentAfter;
    })
    return textNode;
}

function createTable(data) {
    let html = $('<table></table>'), head_row = $('<tr></tr>');
    html.attr('class', 'table table-striped table-hover')

    head_row.append($('<th>index</th>'));
    $.each(data.first()[0], function (value) {
        head_row.append($(`<th>${value}</th>`));
    })
    html.append(head_row);

    $.each(data, function (i, row) {
        let body_row = $('<tr></tr>');
        if (row.nodeType !== 1 && row.nodeType !== 9 && row.hasOwnProperty('nodeType')) return;

        body_row.append($(`<td>${i + 1}</td>`));
        $.each(row, function (_, col) {
            body_row.append($(`<td>${col}</td>`));
        });
        if (body_row.children().length > 0) html.append(body_row)
    })
    return html;
}


/*** Tour API Functions ***
 * Other Tour API Specific Functions
 * */
function getTourItems(url, node) {
    const values = node[0].response.body.items.item;
    $.each(values, function (_, val) {
        if (val.hasOwnProperty('cat2') && TOUR_to_ECK_id.hasOwnProperty(val.cat2)) {
            val.cat3 = TOUR_to_ECK_id[val.cat2];
            val.cat2 = val.cat3.slice(0, 4);
            val.cat1 = val.cat3.slice(0, 2);
        }
    })
    return values;
}

function getTourValuesXML(key, details, tail, returnFunc) {
    details.url = 'http://api.visitkorea.or.kr/openapi/service/rest/' + details.service + '/' + details.area + '?serviceKey=' + key + '&numOfRows=' + details.numOfRows +
        '&pageNo=' + details.pageNo + '&MobileOS=ETC&MobileApp=AppTest&_type=xml' + tail;
    loadAjax(details, returnFunc, '#result');
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
        $.map(container.find('item'), function (elem, _i) {
            elem = $(elem)
            let opt = $(document.createElement('option'));
            opt.val(elem.find('code').text())
                .text(elem.find('name').text());
            div.append(opt);
        })
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
        opt.val(item.text())
            .text(item.text());
        div.append(opt);
    });
}

function changeLastDiv(elem) {
    let key = elem.val();
    const select_div = $('#' + key);
    if (select_div) {
        $('.last').attr('hidden', '');
        select_div.removeAttr('hidden');
    }
}


/*** Google Analytics Traffic Javascript ***
 * Functions related to chat box.
 * */

function getAnalyticValues(respText, details, _) {
    if (respText.rows) {
        details.types.forEach(function (type, i) {
            let text = respText.rows[0][i];
            $('#' + type).text(text);
        });
    }
}

(function (w, d, s, g, js, fs) {
    g = w.gapi || (w.gapi = {});
    g.analytics = {
        q: [], ready: function (f) {
            this.q.push(f);
        }
    };
    js = d.createElement(s);
    fs = d.getElementsByTagName(s)[0];
    js.src = 'https://apis.google.com/js/platform.js';
    fs.parentNode.insertBefore(js, fs);
    js.onload = function () {
        g.load('analytics');
    };
}(window, document, 'script'));

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    };
    i[r].l = 1 * new Date();
    a = s.createElement(o);
    m = s.getElementsByTagName(o)[0];
    a.async = true;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');


/*** Chat Javascript ***
 * Functions related to chat box.
 * */
function chatClick() {
    const head = $('.chat-head'), arrow = head.find('i');
    if (arrow.hasClass('fa-chevron-down')) {
        arrow.addClass('fa-chevron-up');
        arrow.removeClass('fa-chevron-down');
    } else {
        arrow.addClass('fa-chevron-down');
        arrow.removeClass('fa-chevron-up');
    }
}

function autoScroll(div) {
    setInterval(function () {
        let pos = div.scrollTop();
        div.scrollTop(++pos);
    }, 100);
}

function addMsg(input, url) {
    const chat_div = $('#chat-content'), $this = $(input);
    if (event.keyCode === 13) {
        const msg = '<p>' + $this.val() + '</p>', last_div = chat_div.find("div[class*='media-chat']").last();
        msgSend($this, url);
        if (last_div.hasClass('media-chat-reverse') || chat_div.children().length < 1) {
            const text = "<div class='media media-chat'><img class='avatar' src='/static/images/user.png' alt='...' width='42'><div class='media-body'>" + msg + "</div></div>";
            chat_div.append(text);
        } else last_div.find("div[class*='media-body']").append(msg);
        $this.val('');
        autoScroll(chat_div)
    }
}

function msgSend(elem, url) {
    const chat_div = $('#chat-content'), xhttp = new XMLHttpRequest();
    xhttp.open('POST', url);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const resp = JSON.parse(this.response);
            const text = "<div class='media media-chat media-chat-reverse'><div class='media-body'><p>" + resp.text + "</p></div></div>";
            chat_div.append(text);
        }
    };
    const data = JSON.stringify({"text": elem.val()});
    xhttp.send(data);
}









