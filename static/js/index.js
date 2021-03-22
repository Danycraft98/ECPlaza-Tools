// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    const btn = $('#myBtn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) btn.attr('style', 'display: block;');
    else btn.attr('style', 'display: none;');
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


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
    let result_div = $('#resultML'), table_div = $('#nav-table'), url;
    if (!respText) result_div.text('None');
    else if (typeof respText.trim === "function") respText = $(document.createElement('html')).attr('id', 'temp').html($(respText.trim()));

    if (details.hasOwnProperty('html_file')) url = details.html_file;
    else url = details.url;

    if (details.hasOwnProperty('app_name')) respText = getAppValues(details.app_name, respText);
    table_div.html(createTable($(respText)));

    $('#url').text(details.method + ' ' + url);
    result_div.text(formatCode(respText));
}


function formatCode(node, level = 0) {
    let indentBefore = new Array(level++ + 1).join('    '),
        indentAfter = new Array(level - 1).join('    '),
        textNode;

    $.each(node, function (key, val) {
        textNode += '\n' + indentBefore + '<' + key + '>';

        if (val.constructor === ({}).constructor || val.constructor === ([]).constructor) textNode += formatCode(val, level);
        else textNode += val;
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