/**
 * @ngdoc service
 * @name chartService
 * @description
 *
 * This is the service module for Chart.
**/
(function() {
    'use strict';

    angular
        .module('app.service.chart', [])
        .factory('chartService', chartService);

    function chartService() {
        var service = {
            setPieChartOptions: setPieChartOptions
        };
        return service;

        function setPieChartOptions() {
            return {
	            chart: {
	                type: 'pie',
	                style: {
	                    fontFamily: "Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif"
	                }
	            },
	            title: {
	                text: ''
	            },
	            tooltip: {
	                headerFormat: '<span style="font-size: 14px"> {point.key} </span><br>',
	                pointFormat:  '<span style="font-size: 14px"> <b> ${point.y:.2f} </b> </span><br>'
	            },
	            plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
	                        enabled: true,
	                        format: '<span style="font-size: 11px"> {point.name} </span><br> {point.percentage:.2f}%'
	                    }
	                }
	            },
	            series: [{
	                name: 'Categories',
	                data: []
	            }],
	            credits: {
	                enabled: false
	            }
	        };
        }
    }
})();
