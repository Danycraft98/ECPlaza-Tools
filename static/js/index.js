/*** App Name to Content Properties ***
 * Store name: [outer div, content tags, category tag]
 *
 * List: [Name, Image, Origin Store, Category ID, Item ID, Link, Price, Wholesale Price]
 * Detail: [Name, Image, Origin Store, Category ID, Item ID, Link, Price, Wholesale Price, Options, Details]
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
            "div[class*='price']", "div[class*='price']", 'select', "table[class*='table'],div[class*='detail_product_img']"]], //"div[id*='detail_cont01']"
    },
    HT_to_ECK_id = {}


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
function loadAjax(container, details, returnFunc) {
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
            $(container).html('Loading...');
        },
        fail: resp => console.log(resp, details.request, details.url)
    }, details)
    $.ajax(request_item).done(function (resp) {
        returnFunc(resp, details, details.request);
    });
}

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
        if (details.hasOwnProperty('url')) loadAjax('#result', details, writeResult);
        else if (details.hasOwnProperty('html_file')) parseFile(file, details, 'GET')
        else {
            writeResult(details.text, details, 'GET');
        }
    } else getTourInfo(key, details, tail, writeResult);

}

function APIPostResult(respText, _details, _method) {
    alert(JSON.stringify(respText))
}

function parseFile(respText, details, method) {
    const reader = new FileReader();
    reader.readAsText(respText)
    reader.onload = function () {
        respText = reader.result
        writeResult(respText, details, method);
    }
}

function writeResult(respText, details) {
    let result_div = $('#resultML'), table_div = $('#nav-table'), raw_data, refined_data;
    if (!respText) {
        result_div.text('None');
        table_div.text('None');
        return;
    } else if (details.hasOwnProperty('text')) {
        result_div.text(details.text);
        respText = $(details.text)
    }

    let url = !details.hasOwnProperty('html_file') ? (details.url ? details.url :
        respText.find("meta[property='og:url']") ? respText.find("meta[property*='og:url']").attr('content') : respText.find("a[rel='nofollow']").attr('href')) :
        details.html_file;
    raw_data = typeof respText.trim === "function" ? $(document.createElement('html')).attr('id', 'temp').html($(respText.trim())) : $(respText);
    refined_data = /http|app/g.exec(url) ? getAppValues(url, raw_data) : raw_data;

    if (details.hasOwnProperty('service')) table_div.html(createTable($(refined_data[0].response.body.items.item)));
    else table_div.html(createTable(refined_data));

    details.method = details.hasOwnProperty('service') ? 'GET' : details.method;
    $('#url').text(details.method + ' ' + url);
    result_div.text(formatCode(refined_data));
}

function toDatabase(url) {
    let datetime_obj = new Date();
    let datetime = datetime_obj.toLocaleString('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'})
        + datetime_obj.toLocaleString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'});

    let data = $(JSON.parse($('#json_data').val()));
    const details = {url: url, method: 'POST'}
    loadAjax(document.createElement('div'), $.extend(details, {data: JSON.stringify({total_count: 1, crawling_time: datetime, product: data.toArray()})}), APIPostResult);
}



/*** Data Organizing Functions ***
 * All Visual Data Organizer
 * */
function getAppValues(url, node) {
    let app_list = url_to_app[url.split(/\./g)[1]], app_name = /detail|itemid/g.exec(url.toLowerCase()) ? app_list[1] : app_list[0],
        config = app_prop[app_name], data = [], [store_name, type] = app_name.split('_'),
        headers = ['it_name', 'it_img_json', 'it_origin', 'ca_id_extra', 'it_id_extra', 'it_url', 'it_price', 'it_whole_price'];

    if (type === 'D') headers = headers.concat(['it_intro', 'it_desc']);
    node.find(config[0]).each(function (index) {
        let sub_node = $(this), row = {}, text;
        if (sub_node.find(config[1][0]).length) {
            if (type === 'D' && index > 0) return;
            // console.log(sub_node.find(config[1][0]).text());
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
                        let item_id = getID(item_url, 4 - i);
                        row[hdr_title] = HT_to_ECK_id[item_id] ? HT_to_ECK_id[item_id] : item_id;
                        break;

                    case 8:
                    case 9: // it_intro + it_desc
                        console.log(tags)
                        tags = i === 9 ? tags.find('th,td') : tags.find('option');
                        console.log(tags)
                        row[hdr_title] = '';
                        tags.each(() => {
                            text = text.replace(/([\n\r\[\]]+|[ ]{2,})/g, '');
                            row[hdr_title] += ($(this).prop('tagName') === 'TH') ? text + ':' : text + '\n';
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
        if (row.it_name) data.push(row);
    });
    return $(data);
}

function formatCode(node, level = 0) {
    let indentBefore = new Array(level++ + 1).join('    '),
        indentAfter = new Array(level - 1).join('    '),
        textNode = '';

    $.each(node, function (key, val) {
        textNode += '\n' + indentBefore + '<' + key + '>' + ((val.constructor === ({}).constructor || val.constructor === ([]).constructor) ? formatCode(val, level) : val);
        textNode += '</' + key + '>\n' + indentAfter;
    })
    return textNode;
}

function createTable(data) {
    $('#json_data').val(JSON.stringify(data));

    let html = $('<table></table>'), head_row = $('<tr></tr>');
    html.attr('class', 'table table-striped table-hover')

    $.each(data.first()[0], function (value) {
        let head_item = $('<th></th>').text(value);
        head_row.append(head_item);
    })
    html.append(head_row);

    $.each(data, function (_, row) {
        let body_row = $('<tr></tr>');
        if (row.nodeType !== 1 && row.nodeType !== 9 && row.hasOwnProperty('nodeType')) return;
        $.each(row, function (_, col) {
            let body_item = $('<td></td>').html(col);
            body_row.append(body_item);
        });
        if (body_row.children().length > 0) html.append(body_row)
    })
    console.log(html)
    return html;
}


/*** Tour API Functions ***
 * All Tour API Specific Functions
 * */
function getTourInfo(key, details, tail, returnFunc) {
    details.url = 'http://api.visitkorea.or.kr/openapi/service/rest/' + details.service + '/' + details.area + '?serviceKey=' + key + '&numOfRows=' + details.numOfRows +
        '&pageNo=' + details.pageNo + '&MobileOS=ETC&MobileApp=AppTest&_type=json' + tail;
    loadAjax('#result', details, returnFunc);
}

function getCat(respText, details) {
    const url = details.url;
    console.log(respText)
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

function getID(url, i) {
    const match_result = (i ? /(?:(?:(?:ctgr|item)I[dD])=|[/])(?<id>\d+)/g : /(?:(?:barcode|(?:ctgr|item)I[dD])=|[/])(?<id>\d+)/g).exec(url);
    return (match_result) ? match_result.groups.id : '';
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
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
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









