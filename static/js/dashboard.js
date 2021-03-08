function load_data(resp) {
    gapi.analytics.ready(function () {

        /* Authorize the user with an access token obtained server side.*/
        gapi.analytics.auth.authorize({'serverAuth': {'access_token': resp}});


        const report = new gapi.analytics.report.Data({
            query: {
                access_token: resp,
                ids: 'ga:237994931',
                metrics: 'ga:1dayUsers,ga:transactionRevenue,ga:goalCompletionsAll,ga:pageviews',
                dimensions: 'ga:date'
            }
        });
        report.on('success', function handleCoreAPIResponse(resp) {
            const result_dict = resp.totalsForAllResults;
            $('#active-number').text(result_dict['ga:1dayUsers']);
            $('#trans-number').text(result_dict['ga:transactionRevenue']);
            $('#goal-number').text(result_dict['ga:goalCompletionsAll']);
            $('#view-number').text(result_dict['ga:pageviews']);
        })
        report.execute();

        const userChart = new gapi.analytics.googleCharts.DataChart({
            query: {
                'access_token': resp,
                'ids': 'ga:237994931',
                'start-date': '30daysAgo',
                'end-date': 'yesterday',
                'metrics': 'ga:sessions,ga:users,ga:newUsers',
                'dimensions': 'ga:date'
            },
            chart: {
                'container': 'user-chart',
                'type': 'LINE',
                'options': {
                    'width': '100%'
                }
            }
        });
        userChart.execute();


        const activeUserChart = new gapi.analytics.googleCharts.DataChart({
            query: {
                access_token: resp,
                ids: 'ga:237994931',
                'start-date': '30daysAgo',
                'end-date': 'yesterday',
                metrics: 'ga:7dayUsers',
                dimensions: 'ga:date'
            },
            chart: {
                'container': 'active-user-chart',
                'type': 'LINE',
                'options': {
                    'width': '100%'
                }
            }
        });
        activeUserChart.execute();

        const viewChart = new gapi.analytics.googleCharts.DataChart({
            query: {
                'access_token': resp,
                'ids': 'ga:237994931',
                'start-date': '30daysAgo',
                'end-date': 'yesterday',
                'metrics': 'ga:pageviews',
                'dimensions': 'ga:pagePathLevel1',
                'sort': '-ga:pageviews',
                'filters': 'ga:pagePathLevel1!=/',
                'max-results': 7
            },
            chart: {
                'container': 'view-chart',
                'type': 'TABLE',
                'options': {
                    'width': '100%',
                }
            }
        });
        viewChart.execute();

        //ga:deviceCategory

        const deviceChart = new gapi.analytics.googleCharts.DataChart({
            query: {
                'access_token': resp,
                'ids': 'ga:237994931', // <-- Replace with the ids value for your view.
                'start-date': '30daysAgo',
                'end-date': 'yesterday',
                'metrics': 'ga:sessions',
                'dimensions': 'ga:deviceCategory',
                //'sort': '-ga:pageviews',
                //'filters': 'ga:pagePathLevel1!=/',
                'max-results': 7
            },
            chart: {
                'container': 'device-chart',
                'type': 'PIE',
                'options': {
                    'width': '100%',
                    'pieHole': 4 / 9,
                }
            }
        });
        deviceChart.execute();
    });
}