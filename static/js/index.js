function set_required() {
    $(":input[name='value']").prop('required', function () {
        return $(this).is(':visible');
    });
}


function load_ajax(container, url, return_func) {
    $(function () {
        $.ajax({
            url: url,
            async: false,
            beforeSend: function () {
                $(container).html('Loading...');
            },
            success: resp => return_func(resp, url),
            error: resp => return_func(resp, url)
        });
    });
}


function get_tour_info(key, details, tail, return_func) {
    let url = 'http://api.visitkorea.or.kr/openapi/service/rest/' + details.service + '/' + details.area + '?serviceKey=' + key + '&numOfRows=' + details.numOfRows +
        '&pageNo=' + details.pageNo + '&MobileOS=ETC&MobileApp=AppTest' + tail;
    load_ajax('#result', url, return_func);
}


function get_cat(respText, url) {
    let container = $(respText.documentElement), div_selection = [$('#id_cat1'), $('#id_cat2') ,$('#id_cat3')], div;
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


function write_result(respText, url) {
    let text = new XMLSerializer().serializeToString(respText.documentElement), tabs = '', start = 0;
    text = text.replace(/(<([a-zA-Z]+\b)[^>]*>)(?!<\/\2>|[^<])/g, "$1\n") //add \n after tag if not followed by the closing tag of pair or text node
        .replace(/(<\/[a-zA-Z]+[^>]*>)/g, "$1\n") //add \n after closing tag
        .replace(/>\s+(.+?)\s+<(?!\/)/g, ">\n$1\n<") //add \n between sets of angled brackets and text node between them
        .replace(/>(.+?)<([a-zA-Z])/g, ">\n$1\n<$2") //add \n between angled brackets and text node between them
        .replace(/\?></, "?>\n<") //detect a header of XML

    const xmlArr = text.split('\n'), result_div = $('#result'), indent = '    ';
    if (/^<[?]xml/.test(xmlArr[0])) start++;
    for (let i = start; i < xmlArr.length; i++) {
        const line = xmlArr[i].replace(/^\s+|\s+$/g, '');
        if (/^<[/]/.test(line)) {
            tabs = tabs.replace(indent, '');
            xmlArr[i] = tabs + line;
        } else if (/<.*>.*<\/.*>|<.*[^>]\/>/.test(line)) xmlArr[i] = tabs + line;
        else if (/<.*>/.test(line)) {
            xmlArr[i] = tabs + line;
            tabs += indent;
        } else xmlArr[i] = tabs + line;
    }

    if (text) {
        $('#url').text(url.toString());
        result_div.text('\n\n' + xmlArr.join('\n'));
    } else result_div.text('None');
}


function getMethods(obj) {
    let properties = new Set()
    let currentObj = obj
    do {
        Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}