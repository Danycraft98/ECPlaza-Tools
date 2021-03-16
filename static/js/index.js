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


function writeResult(respText, details, method) {
    let result_div = $('#resultML'), table_div = $('#nav-table'), html = '', url;
    if (!respText) result_div.text('None');
    else if (typeof respText.trim === "function") html = $(document.createElement('html')).attr('id', 'temp').html($(respText.trim())).get(0);
    else html = respText.documentElement;

    if (details.hasOwnProperty('html_file')) url = details.html_file;
    else url = details.url;

    $('#url').text(method + ' ' + url);
    result_div.text(formatML(html).outerHTML);
    if (details.hasOwnProperty('app_name')) table_div.html(getAppValues(details.app_name, $(html)));
    else {
        const header = [], data = [];
        html.find('item').each(function (i) {
            let row = {};
            $(this).children().each(function () {
                if (i === 0) header.push(this.tagName)
                if (this.tagName.includes('image')) row[this.tagName] = $(document.createElement('img')).attr('src', $(this).text()).get(0).outerHTML;
                else row[this.tagName] = $(this).text();

            })
            data.push(row);
        })
        table_div.html(createTable(data, header));
    }
    //document.getElementById('temp').remove();
}


function createTable(data, header) {
    let html = $(document.createElement('table')), head_row = $(document.createElement('tr'));
    html.attr('class', 'table table-striped table-hover')
    header.forEach(function (value) {
        let head_item = $(document.createElement('th'));
        head_item.text(value);
        head_row.append(head_item);
    });
    html.append(head_row);

    let body_row = $(document.createElement('tr'));
    data.map(function (row) {
        body_row = $(document.createElement('tr'));
        $.each(row, function(_, col) {
            let body_item = $(document.createElement('td'));
            body_item.html(col);
            body_row.append(body_item);
        });
        if (body_row.children().length > 0) html.append(body_row)
    });
    return html;
}


function formatML(node, level = 0) {
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


function getMethods(obj) {
    let properties = new Set(), currentObj = obj;
    do {
        Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}