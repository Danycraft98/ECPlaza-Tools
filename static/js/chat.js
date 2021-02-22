function chat_click() {
    const head = $('.chat-head');
    const arrow = head.find('i');

    $('.chat-body').slideToggle('fast');
    $('.chat-text').slideToggle('fast');
    if (arrow.hasClass('fa-chevron-down')) {
        arrow.addClass('fa-chevron-up');
        arrow.removeClass('fa-chevron-down');
    } else {
        arrow.addClass('fa-chevron-down');
        arrow.removeClass('fa-chevron-up');
    }
}

function add_msg(input, url) {
    const chat_div = $('#chat-content'), $this = $(input);
    if (event.keyCode === 13) {
        const msg = '<p>' + $this.val() + '</p>', last_div = chat_div.find("div[class*='media-chat']").last();
        msgSend($this, url);
        if (last_div.hasClass('media-chat-reverse') || chat_div.children().length < 1) {
            const text = "<div class='media media-chat'><img class='avatar' src='/static/images/user.png' alt='...' width='42'><div class='media-body'>" + msg + "</div></div>";
            chat_div.append(text);
        } else last_div.find("div[class*='media-body']").append(msg);
        $this.val('');
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