function loadGoogleData(resp, google_view_id) {
    gapi.analytics.ready(function () {

        /* Authorize the user with an access token obtained server side and set default query object.*/
        gapi.analytics.auth.authorize({'serverAuth': {'access_token': resp}});
        let query = {'access_token': resp, 'ids': google_view_id, 'start-date': 'yesterday', 'end-date': 'yesterday'}

        /* Retrieve numerical data for the right table on top.*/
        let rt_query = $.extend(query, {metrics: 'ga:transactionRevenue,ga:goalCompletionsAll,ga:pageviews', dimensions: 'ga:date',})
        gapi.client.analytics.data.ga.get(rt_query).then(function handleCoreAPIResponse(resp) {
            const result_dict = resp.result.totalsForAllResults;
            $('#trans-number').text(result_dict['ga:transactionRevenue']);
            $('#goal-number').text(result_dict['ga:goalCompletionsAll']);
            $('#view-number').text(result_dict['ga:pageviews']);
        });
        rt_query.metrics = 'rt:activeUsers'; rt_query.dimensions = 'rt:userType';
        gapi.client.analytics.data.realtime.get(rt_query).then(function handleCoreAPIResponse(resp) {
            $('#active-number').text(resp.result.totalsForAllResults['rt:activeUsers'])
        });

        /* Retrieve chart data.*/
        query['start-date'] = '8daysAgo';
        createChart($.extend(query, {'metrics': 'ga:sessions,ga:users,ga:newUsers', 'dimensions': 'ga:date'}), 'user-chart', 'LINE', {'width': '100%'});
        createChart($.extend(query, {'metrics': 'ga:7dayUsers', 'dimensions': 'ga:date'}), 'active-user-chart', 'LINE', {'width': '100%'});
        createChart($.extend(query, {
            'metrics': 'ga:pageviews',
            'dimensions': 'ga:pagePathLevel1',
            //'sort': '-ga:pageviews',
            'filters': 'ga:pagePathLevel1!=/',
            'max-results': 7
        }), 'view-chart', 'TABLE', {'width': '100%'});
        createChart($.extend(query, {
            'metrics': 'ga:organicSearches',
            'dimensions': 'ga:source',
            'max-results': 7
        }), 'view-referral-chart', 'TABLE', {'width': '100%'});
        //createChart($.extend(query, {'metrics': 'ga:sessions', 'dimensions': 'ga:deviceCategory', 'max-results': 7}), 'device-chart', 'PIE', {'width': '100%', 'pieHole': 4 / 9,});
        createChart($.extend(query, {'metrics': 'ga:sessions', 'dimensions': 'ga:country,ga:region', 'max-results': 100}), 'device-chart', 'PIE', {'width': '100%', 'pieHole': 4 / 9,}); //GEO
    });
}


function createChart(query, container, type, options) {
    let chart = new gapi.analytics.googleCharts.DataChart({
        query: query,
        chart: {
            'container': container, 'type': type, 'options': options
        }
    });
    chart.execute();
}