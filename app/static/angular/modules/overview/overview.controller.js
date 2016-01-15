(function() {
    'use strict';

    angular
        .module('app.projects.overview')
        .controller('OverviewController', OverviewController);

    OverviewController.$inject = ['$scope', 'store', 'categoryService'];

    function OverviewController($scope, store, categoryService) {
        var vm = this;
        vm.project = store.get('project');
        var options = chartOptions();
        var barchart = $('#barchart-container').highcharts(options);
        displayChart();
        displayTable();

        function chartOptions() {
            var opt = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                tooltip: {
                    headerFormat: '<span style="font-size:14px"> {point.key} </span><table>',
                    pointFormat:  '<tr><td style="color: {series.color}"> {series.name}: </td>' +
                                  '<td> <b> ${point.y:.2f} </b> </td></tr>',
                    footerFormat: '</table>',
                    shared:       true,
                    useHTML:      true
                },
                xAxis: {
                    categories: [],
                    crosshair: true
                },
                yAxis: {
                    title: {
                        text: 'Dollars'
                    }
                },
                series: [{
                    name: 'Estimated Cost',
                    data: []
                }, {
                    name: 'Actual Cost',
                    data: []
                }, {
                    name: 'Paid',
                    data: []
                }],
                credits: {
                    enabled: false
                }
            };
            return opt;
        }

        function displayChart() {
            return categoryService.retrieveList()
                .then(getSuccess)
                .catch(error);

            function getSuccess(response) {
                options.xAxis.categories = [];
	            options.series[0].data   = [];
	            options.series[1].data   = [];
	            options.series[2].data   = [];

	            if (response.data.objects.length == 0) {
	                options.xAxis.categories.push('No categories');
	                options.series[0].data.push(0.00);
	                options.series[1].data.push(0.00);
	                options.series[2].data.push(0.00);
	            } else {
	                angular.forEach(response.data.objects, function(category) {
	                    var totalEstimated   = 0;
	                    var totalActual      = 0;
	                    var totalExpenditure = 0;

	                    angular.forEach(category.items, function(item) {
	                        totalEstimated += item.estimated;
	                        totalActual    += item.actual;
	                    });
	                    angular.forEach(category.expenditures, function(expenditure) {
	                        totalExpenditure += expenditure.cost;
	                    });
	                    options.xAxis.categories.push(category.name);
	                    options.series[0].data.push(totalEstimated);
	                    options.series[1].data.push(totalActual);
	                    options.series[2].data.push(totalExpenditure);
	                });
	            }
	            barchart = new Highcharts.Chart(options);
            }
            function error(response) {
                vm.errorMsgGet = true;
            }
        }

        function displayTable() {
            return categoryService.retrieveList()
                .then(getSuccess)
                .catch(error);

            function getSuccess(response) {
                vm.categoryList = response.data.objects;

                var grandTotalEstimated   = 0;
                var grandTotalActual      = 0;
                var grandTotalExpenditure = 0;

	            angular.forEach(response.data.objects, function(category) {
	                var totalEstimated   = 0;
	                var totalActual      = 0;
	                var totalExpenditure = 0;
	                angular.forEach(category.items, function(item) {
	                    totalEstimated += item.estimated;
	                    totalActual    += item.actual;
	                });
	                angular.forEach(category.expenditures, function(expenditure) {
	                    totalExpenditure += expenditure.cost;
	                });
                    category.total_estimated   = totalEstimated;
                    category.total_actual      = totalActual;
                    category.total_expenditure = totalExpenditure;
                    grandTotalEstimated   += totalEstimated;
                    grandTotalActual      += totalActual;
                    grandTotalExpenditure += totalExpenditure;

	                if (totalExpenditure >= totalActual) {
	                    category.paid   = 100;
	                    category.unpaid = 0;
	                } else {
	                    category.paid   = Math.round(totalExpenditure / totalActual * 100);
	                    category.unpaid = totalActual - totalExpenditure;
	                }
	            });
	            $scope.grandTotalEstimated   = grandTotalEstimated;
	            $scope.grandTotalActual      = grandTotalActual;
	            $scope.grandTotalExpenditure = grandTotalExpenditure;
            }
            function error(response) {
                vm.errorMsgGet = true;
            }
        }
    }
})();
