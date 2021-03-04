window.dataLayer = window.dataLayer || [];


function get_text(respText, url) {
    const container = $("#chart-container"),
        parsedResponse = $((new window.DOMParser()).parseFromString(respText, "text/html")),
        graph = parsedResponse.find('#chart-container');
    container.html(graph.html());
}