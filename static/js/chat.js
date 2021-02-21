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

function add_msg(input) {
    const chat_div = $('#chat-content'), $this = $(input);
    if (event.keyCode === 13) {
        const msg = '<p>' + $this.val() + '</p>',
            last_div = chat_div.find("div[class*='media-chat']").last();

        if (last_div.hasClass('media-chat-reverse')) {
            const text = "<div class='media media-chat'><img class='avatar' src='/static/images/user.png' alt='...' width='42'><div class='media-body'>" + msg + "</div></div>";
            chat_div.append(text);
        } else last_div.find("div[class*='media-body']").append(msg);
        $this.val('');
    }
}