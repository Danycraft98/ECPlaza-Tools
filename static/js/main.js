$('#file').on('change', function () {
    const fileName = $(this).val();
    $(this).next('.custom-file-label').html(fileName.replace(/^.*[\\\/]/, ''));
})

window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag('js', new Date());

gtag('config', 'UA-188561512-1');
$(document).ready(function () {});

function set_required() {
    $(":input[name='value']").prop('required', function () {
        return !$(this).is(':visible');
    });
}