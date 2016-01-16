(function() {
    'use strict';

    angular
        .module('app.projects.overview')
        .controller('OverviewController', OverviewController);

    OverviewController.$inject = ['$scope', 'store', 'categoryService'];

    function OverviewController($scope, store, categoryService) {
        var vm = this;
        vm.project = store.get('project');

        getCategories()
            .then(updateChart)
            .then(updateTable)
            .catch(error);

        var options = {
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

        function getCategories() {
            return categoryService.retrieveList();
        }

        function updateChart(response) {
            var categoryList = response.data.objects;

            if (categoryList.length == 0) {
                options.xAxis.categories.push('No categories');
                options.series[0].data.push(0.00);
                options.series[1].data.push(0.00);
                options.series[2].data.push(0.00);
            } else {
                angular.forEach(categoryList, function(category) {
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
            $('#barchart-container').highcharts(options);
            return response;
        }

        function updateTable(response) {
            vm.categoryList = response.data.objects;
            var grandTotalEstimated   = 0;
            var grandTotalActual      = 0;
            var grandTotalExpenditure = 0;

            angular.forEach(vm.categoryList, function(category) {
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
                category.totalEstimated   = totalEstimated;
                category.totalActual      = totalActual;
                category.totalExpenditure = totalExpenditure;
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
            vm.grandTotalEstimated   = grandTotalEstimated;
            vm.grandTotalActual      = grandTotalActual;
            vm.grandTotalExpenditure = grandTotalExpenditure;
        }

        function error(response) {
            vm.errorMsgGet = true;
        }
    }
})();
