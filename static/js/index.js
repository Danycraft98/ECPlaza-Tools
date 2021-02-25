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
    let container = $(respText.documentElement), div = $('#id_cat1');
    if (url.includes('cat1')) div = $('#id_cat2');
    div.html('');
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
}


function change_last_div(elem) {
    const select_div = $('#' + elem.val());
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

    const xmlArr = text.split('\n'), result_div = $('#result'), indent = '\t';
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


function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('');
}