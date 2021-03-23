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


function parseFile(respText, details, method) {
    const reader = new FileReader();
    reader.readAsText(respText)
    reader.onload = function () {
        respText = reader.result
        writeResult(respText, details, method);
    }
}


function writeResult(respText, details, _) {
    let result_div = $('#resultML'), table_div = $('#nav-table'), raw_data, refined_data;
    if (!respText) {
        result_div.text('None');
        table_div.text('None');
        return;
    }

    let url = details.hasOwnProperty('html_file') ? details.html_file : details.url;
    raw_data = typeof respText.trim === "function" ? $(document.createElement('html')).attr('id', 'temp').html($(respText.trim())) : $(respText);
    refined_data = details.hasOwnProperty('app_name') ? getAppValues(details.app_name, raw_data) : raw_data;

    if (details.hasOwnProperty('service')) table_div.html(createTable($(refined_data[0].response.body.items.item)));
    else table_div.html(createTable(refined_data));

    details.method = details.hasOwnProperty('service') ? 'GET' : details.method;
    $('#url').text(details.method + ' ' + url);
    result_div.text(formatCode(refined_data));
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


function getMethods(obj) {
    let properties = new Set(), currentObj = obj;
    do {
        Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}