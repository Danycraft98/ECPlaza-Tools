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
function loadAjax(details, returnFunc, container, is_external = true) {
    $.ajax($.extend(details, {
        url: is_external ? (details.url.includes('cors-bypass-ecplaza') ? details.url : 'https://cors-bypass-ecplaza.herokuapp.com/' + details.url) : details.url,
        crossDomain: true, mode: 'cors', credentials: 'include', origin: "*",
        beforeSend: function () {
            if (container) $(container).html('Loading...');
            else console.log('Loading...')
        },
        success: (resp) => {
            returnFunc(resp, details);
        },
        error: (resp, err) => {
            console.log(`Error Message: ${err}\n\nResponse:${JSON.stringify(resp, null, 4)}`);
        },
    }));
}

function loadAPIData(details) {
    $.ajax($.extend(details, {
        username: $('#username').val(), password: $('#password').val(), dataType: 'json', //, contentType: "application/json",
        error: (resp, err) => {
            if (resp.responseText.includes('ID already exists')) {
                let data = details.data, pk = data.hasOwnProperty('it_id_extra') ? data.it_id_extra : data.hasOwnProperty('contentid') ? data.contentid : ''
                loadAPIData($.extend(details, {url: `${details.url}${pk}/`, method: 'PUT'}))
            } else console.log(`Error Message: ${err}\n\nResponse:${JSON.stringify(resp, null, 4)}`);
        }
    }));
}

//*** Basic Functions in submitting form and returning result. ***
function submitForm(e) {
    $('#resultML,#nav-table,#json_data').text('');

    e.preventDefault();
    $('.hidden').removeClass('hidden');
    let file = null, details = {};
    $.map($(e.target).find(":input:visible:not('button,:radio'),#id_serviceKey"), (raw_tag) => {
        let tag = $(raw_tag), name = tag.attr('name');
        file = name.includes('_file') ? tag.get(0).files[0] : '';
        if (tag.val()) details[tag.attr('name')] = tag.val();
        if (tag.text().includes('맛집')) details.contentTypeId = 39;
    });

    if (e.target.id.includes('postman')) {
        if (details.hasOwnProperty('url')) loadAjax(details, compileResult, '#result');
        else {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                details.method = 'GET';
                file = reader.result;
                if (details.hasOwnProperty('html_file')) compileResult(file, details);
                else $.each(file.split('\n'), function (_, url) {
                    if (url === '') return;
                    details = $.extend(details, {url: url});
                    loadAjax(details, compileResult, '#result');
                });
            }
        }
    } else getTourValues(details, compileResult, true);
}

function compileResult(respText, details) {
    let result_div = $('#resultML'), table_div = $('#nav-table'), url_div = $('#url'), is_tour = /visitkorea/g.exec(details.url),
        raw_data = getMethods(respText).includes('trim') ? $(respText.trim()) : $(respText), final_data = [],
        refined_data = is_tour ? getTourItems(details.url, raw_data) : /(http|app)/g.exec(details.url) ? getAppValues(details, raw_data) : raw_data,
        api_url = `/api/v1/${is_tour ? (url_div.text().includes('searchFestival') ? 'events' : 'restaurants') : 'products'}/`;
    $(refined_data).each(async function (i, item) {
        if (!i) url_div.text(`${details.method} ${details.url}\n`);
        if (/detail|itemid/g.exec(details.url.toLowerCase()) || details.area && details.area.includes('detail')) {
            // Detail Zone
            let sub_api_url = `${api_url}${details.contentId}/`;
            loadAPIData({
                method: "GET", url: sub_api_url , success: (resp) => {
                    if (is_tour) {
                        if (/Image|Info/g.exec(details.area) && !resp.hasOwnProperty(details.area)) resp[details.area] = [];
                        if (/Common|Intro/g.exec(details.area)) $.extend(resp, item)
                        else resp[details.area].push(item);
                        loadAPIData({method: "PUT", data: JSON.stringify(resp), url: sub_api_url, contentType: "application/json"});
                    } else {
                        // HTML Parser Detail Zone
                    }
                }
            });
        } else {
            // List Zone
            final_data.push(item);
            loadAPIData({method: "POST", data: item, url: api_url});
            await details.promise;
            delete details.promise;

            if (is_tour) {
                let sub_data = $.extend(details, {contentTypeId: item.contenttypeid, contentId: item.contentid, index: i, pageNo: 1, numOfRows: 10})
                getTourValues($.extend(JSON.parse(JSON.stringify(sub_data)), {area: 'detailCommon', defaultYN: 'Y', addrinfoYN: 'Y', overviewYN: 'Y'}), compileResult, false);
                getTourValues($.extend(JSON.parse(JSON.stringify(sub_data)), {area: 'detailIntro'}), compileResult, false)
                getTourValues($.extend(JSON.parse(JSON.stringify(sub_data)), {area: 'detailInfo'}), compileResult, false)
                getTourValues($.extend(JSON.parse(JSON.stringify(sub_data)), {area: 'detailImage'}), compileResult, false)
            } else {
                /* loadAjax($.extend(details, {url: item.url}), compileResult); */
            }
        }
    });
    if (details.hasOwnProperty('service')) table_div.html(createTable($(final_data)));
    else table_div.append(createTable($(refined_data)));
    result_div.text(`${formatCode(final_data)}`);
}

function toDatabase(url) {
    let is_tour = url.includes('kculture'), is_food = $('code#url').text().includes('searchFestival');
    loadAPIData({
        method: "GET", url: `/api/v1/${is_tour ? (is_food ? 'events' : 'restaurants') : 'products'}/`, success: (data) => {
            url += is_tour ? (is_food ? '70' : '60') : '';
            delete data.entered_date;
            let datetime_obj = new Date(), details = {url: url, method: 'POST'},
                datetime = `${datetime_obj.toLocaleString('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'})} ${datetime_obj.toLocaleString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'})}`,
                final_data = $.extend(details, {
                    headers: {
                        "content-type": "application/json"
                    }, data: JSON.stringify($.extend({total_count: data.length, crawling_time: datetime}, is_tour ? {kculture: data} : {product: data}), null)
                });
            console.log(final_data)
            loadAjax(final_data, alert); //, '',false);
        }
    });
}


/*** Data Organizing Functions ***
 * All Visual Data Organizer
 * */
function getAppValues(details, node) {
    let rtn_app_list;
    $.map(url_to_app, (app_list, app_name) => {
        if (details.url.includes(app_name)) rtn_app_list = app_list;
    })
    let app_name = /detail|itemid/g.exec(details.url.toLowerCase()) ? rtn_app_list[1] : rtn_app_list[0],
        config = app_prop[app_name], data = [], type = app_name.split('_')[1],
        headers = ['it_name', 'it_img_json', 'it_origin', 'ca_id_extra', 'it_id_extra', 'it_url', 'it_price', 'it_whole_price'];

    if (type === 'D') headers = headers.concat(['it_intro', 'it_desc']);
    $.each(node.find(config[0]), function (index, raw_node) {
        let row = getAppDetailValues(headers, node, raw_node, app_name, index);
        if (row.hasOwnProperty('it_name') && row.it_name) data.push(row);
    });
    return $(data);
}

function getAppDetailValues(headers, node, raw_node, app_name, index) {
    let sub_node = $(raw_node), config = app_prop[app_name], row = {}, text, [store_name, type] = app_name.split('_');
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
                    if (i === 1) item_url = $(item_url.split('> ')).each(() => {
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
                    const match_result = (4 - i ? /(?:(?:ctgr|item)I[dD]=|[/])(?<id>\d+)/g : /(?:(?:barcode|(?:ctgr|item)I[dD])=|[/])(?<id>\d+)/g).exec(item_url);
                    let item_id = (match_result) ? match_result.groups.id : '';
                    row[hdr_title] = HT_to_ECK_id[item_id] ? HT_to_ECK_id[item_id] : item_id;
                    break;

                case 8:
                case 9: // it_intro + it_desc
                    let found_tags = (i === 8) ? tags.find('th, td') : tags.find('th, td, img'),
                        images = [], key;
                    row[hdr_title] = {};
                    $.each(found_tags, (_, item) => {
                        item = $(item);
                        let tagName = item.prop('tagName');
                        if (tagName === 'IMG') images.push(item.prop('outerHTML'));
                        else if (tagName === 'TH') {
                            key = item.text();
                            row[hdr_title][key] = '';
                        } else row[hdr_title][key] = item.text();
                    });
                    if (images.length) row[hdr_title].images = images.toString();

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
    return row;
}


function getTourValues(details, returnFunc, asnyc, rtype = 'json') {
    $.extend(details, {url: `http://api.visitkorea.or.kr/openapi/service/rest/${details.service}/${details.area}?MobileOS=ETC&MobileApp=ECPlazaTools&_type=${rtype}`, method: 'GET', asnyc: asnyc})
    $.map(details, function (val, key) {
        if (!['service', 'area', 'url', 'promise', 'method', 'beforeSend', 'success', 'error'].includes(key)) details.url += `&${key}=${val}`;
    });
    loadAjax(details, returnFunc, '#result');
}

function formatCode(node, level = 0) {
    let indentBefore = new Array(level++ + 1).join('    '),
        indentAfter = new Array(level - 1).join('    '),
        textNode = '', xmlSerializer = new XMLSerializer();

    $.map(node, function (val, key) {
        if (/^\d+/.exec(key)) key = 'ItemNo' + key;

        val = typeof val === 'string' && val.includes('{') && val.includes('}') ? JSON.parse(val) : val
        let value = (typeof val !== 'object') ? (typeof val === 'string' && val.includes('{') && val.includes('}') ? JSON.parse(val) :
            val.toString().replace(/([&<])[^a-z/>]*(>)?/g, escape('$1$2')).replace(/(<img [^>]+)>/g, '$1/>')) : formatCode(val, level);

        try {
            let item = $.parseXML(value.length ? `<${key}>${value}</${key}>` : `<${key}/>`);
            textNode += `\n${indentBefore}${xmlSerializer.serializeToString(item)}\n${indentAfter}`;
        } catch (e) {
            textNode += `\n${indentBefore}<${key}/>\n${indentAfter}`;
        }
    })
    return textNode;
}

function createTable(data) {
    let table = $('<table><thead><tr></tr></thead><tbody></tbody></table>'),
        headers = Object.keys(data[0]);

    headers.splice(0, 0, 'Index');
    if (headers.includes('addr1') && !headers.includes('addr2')) headers.splice(headers.indexOf('addr1') + 1, 0, 'addr2');
    table.attr('class', 'table table-striped table-hover');

    $.map(headers, function (key) {
        table.find('tr').append($(`<th>${key}</th>`));
    })

    $.each(data, function (i, row) {
        let body_row = $('<tr></tr>');
        if (row.nodeType !== 1 && row.nodeType !== 9 && row.hasOwnProperty('nodeType')) return;
        $.map(headers, function (key) {
            if (row.hasOwnProperty(key)) {
                if (typeof row[key] === 'object') {
                    row[key] = JSON.stringify(row[key])
                }
            }
            let item = row.hasOwnProperty(key) ? $(`<td>${row[key]}</td>`) : key === 'Index' ? $(`<td>${i + 1}</td>`) : $('<td></td>');
            if (item.text().length > 50) item.text(item.text().substring(0, Math.min(50, item.text().length)) + '...');
            body_row.append(item);
        });
        if (body_row.children().length > 0) table.find('tbody').append(body_row)
    })
    return table;
}


/*** Tour API Functions ***
 * Other Tour API Specific Functions1
 * */
function getTourItems(url, node) {
    const body = node[0].response.body, values = body ? body.items.item : [{}];
    $.map(values, function (val) {
        if (val.hasOwnProperty('cat2') && TOUR_to_ECK_id.hasOwnProperty(val.cat2)) {
            val.cat3 = TOUR_to_ECK_id[val.cat2];
            val.cat2 = val.cat3.slice(0, 4);
            val.cat1 = val.cat3.slice(0, 2);
        }
    })
    return values;
}

function getCat(respText, details) {
    let container = $(respText.documentElement), div_selection = [$('#id_cat1'), $('#id_cat2'), $('#id_cat3')],
        switch_val = details.url.includes('cat2') ? 2 : (details.url.includes('cat1') ? 1 : 0), div = div_selection[switch_val],
        is_equal = switch_val > 0 ? div_selection[switch_val - 1] && div_selection[switch_val - 1].children().last().text() === container.find('code,name').last().text() : false;
    if (switch_val === 1) div_selection[2].html('');

    if (is_equal) div.html('');
    else {
        div.html('<option></option>');
        $.map(container.find('item'), function (elem) {
            div.append($(`<option value='${$(elem).find('code').text()}'>${$(elem).find('name').text()}</option>`));
        })
    }
}

function getContentId(respText, _url) {
    let container = $(respText.documentElement), div = $('#id_contentId');
    div.html('');
    container.find('item').each(() => {
        let item = $(this).find('contentid');
        let opt = $(document.createElement('option'));
        opt.val(item.text())
            .text(item.text());
        div.append(opt);
    });
}

function changeLastDiv(elem) {
    let key = elem.val(), select_div = $('.' + key).first(), all_div = $('.last');
    if (select_div) {
        all_div.attr('hidden', '');
        if (elem.text().includes('지역')) select_div = all_div.last();
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
    js.onload = () => {
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
    setInterval(() => {
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
    xhttp.onreadystatechange = () => {
        if (this.readyState === 4 && this.status === 200) {
            const resp = JSON.parse(this.response);
            const text = "<div class='media media-chat media-chat-reverse'><div class='media-body'><p>" + resp.text + "</p></div></div>";
            chat_div.append(text);
        }
    };
    const data = JSON.stringify({"text": elem.val()});
    xhttp.send(data);
}









