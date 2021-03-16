$('#search').submit(function (e) {
    e.preventDefault();
    tail = '';
    $(this).find(":input:visible:not('button')").each(function (i) {
        let tag = $(this);
        if (tag.val()) {
            if (i < 4) details[tag.attr('name')] = tag.val();
            else tail += '&' + tag.attr('name') + '=' + tag.val();
        }
    })
    getTourInfo(key, details, tail, writeResult);
});

$('.input-date input').each(function () {
    $(this).datepicker({
        format: 'yyyymmdd', endDate: 'today',
        startView: 2, todayBtn: 'linked',
        clearBtn: true, orientation: 'bottom auto'
    });
});


function getTourInfo(key, details, tail, returnFunc) {
    details.url = 'http://api.visitkorea.or.kr/openapi/service/rest/' + details.service + '/' + details.area + '?serviceKey=' + key + '&numOfRows=' + details.numOfRows +
        '&pageNo=' + details.pageNo + '&MobileOS=ETC&MobileApp=AppTest' + tail;
    loadAjax('#result', details, returnFunc);
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


function changeLastDiv(elem) {
    let key = elem.val();
    if (key === 'areaBasedList') key = 'categoryCode'
    const select_div = $('#' + key);
    if (select_div) {
        $('.last').attr('hidden', '');
        select_div.removeAttr('hidden');
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