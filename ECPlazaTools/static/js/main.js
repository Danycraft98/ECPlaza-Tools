window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag('js', new Date());

gtag('config', 'UA-188561512-1');
$(document).ready(function () {
});

function set_required() {
    $(":input[name='value']").prop('required', function () {
        return $(this).is(':visible');
    });
}

(function (w, d, s, g, js, fs) {
    g = w.gapi || (w.gapi = {});
    g.analytics = {
        q: [], ready: function (f) {
            this.q.push(f);
        }
    };
    js = d.createElement(s);
    fs = d.getElementsByTagName(s)[0];
    js.src = 'https://apis.google.com/js/platform.js';
    fs.parentNode.insertBefore(js, fs);
    js.onload = function () {
        g.load('analytics');
    };
}(window, document, 'script'));