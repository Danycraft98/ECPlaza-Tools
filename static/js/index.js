function set_required() {
    $(":input[name='value']").prop('required', function () {
        return $(this).is(':visible');
    });
}


function load_ajax(container, details, return_func) {
    const request_item = {
        url: details.url, method: details.request,
        async: true, crossDomain: true,
        data: details.data, credentials: 'include',
        /*headers: {
            'cache-control': 'no-cache',
            'postman-token': 'e044290e-4cb5-3056-fbc3-de2c26cecb79',
        },*/
        beforeSend: function () {
            $(container).html('Loading...');
        },
        fail: resp => console.log(resp, details.request, details.url)
    }
    $.ajax(request_item).done(function (resp) {
        return_func(resp, details, details.request);
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


function write_result(respText, details, method) {
    const result_div = $('#resultML'), table_div = $('#nav-table');
    let html = $(document.createElement('html')), url;
    if (!respText) result_div.text('None');
    if (typeof respText.trim === "function") html.html(respText.trim());
    else html = $(respText.documentElement);

    if (details.hasOwnProperty('html_file')) url = details.html_file;
    else url = details.url;

    $('#url').text(method + ' ' + url);
    result_div.text(formatML(html.get(0), 0).outerHTML);
    if (details.hasOwnProperty('app_name')) table_div.html(get_app_values(details.app_name, html));
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
        table_div.html(create_table('', data, header));
    }
}


function create_table(app_name, data, header) {
    let html = $(document.createElement('table')), head_row = $(document.createElement('tr'));
    html.attr('class', 'table table-striped table table-hover')
    header.forEach(function (value) {
        let head_item = $(document.createElement('th'));
        head_item.text(value);
        head_row.append(head_item);
    });
    html.append(head_row);

    let body_row = $(document.createElement('tr'));
    data.forEach(function (row) {
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


function create_json(data) {
    const rows = [],
        headersText = [],
        $headers = data.find("th");

    // Loop through grabbing everything
    data.find('tr').each(function (index) {
        let $cells = $(this).find("td");
        rows[index] = {};

        $cells.each(function (cellIndex) {
            // Set the header text
            if (headersText[cellIndex] === undefined) {
                headersText[cellIndex] = $($headers[cellIndex]).text();
            }
            // Update the row object with the header/cell combo
            rows[index][headersText[cellIndex]] = $(this).text();
        });
    });

    // Let's put this in the object like you want and convert to JSON (Note: jQuery will also do this for you on the Ajax request)
    return {"rows": rows};
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


function getMethods(obj) {
    let properties = new Set(), currentObj = obj;
    do {
        Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}