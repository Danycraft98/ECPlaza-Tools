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


function write_result(respText, url) {
    let text = new XMLSerializer().serializeToString(respText.documentElement);
    text = text.replace(/(<([a-zA-Z]+\b)[^>]*>)(?!<\/\2>|[\w\s])/g, "$1\n") //add \n after tag if not followed by the closing tag of pair or text node
        .replace(/(<\/[a-zA-Z]+[^>]*>)/g, "$1\n") //add \n after closing tag
        .replace(/>\s+(.+?)\s+<(?!\/)/g, ">\n$1\n<") //add \n between sets of angled brackets and text node between them
        .replace(/>(.+?)<([a-zA-Z])/g, ">\n$1\n<$2") //add \n between angled brackets and text node between them
        .replace(/\?></, "?>\n<") //detect a header of XML

    const xmlArr = text.split('\n'), result_div = $('#result');
    let tabs = '', start = 0;
    if (/^<[?]xml/.test(xmlArr[0])) start++;

    const indent = "\t";
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