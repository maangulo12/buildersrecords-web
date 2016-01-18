(function() {
    'use strict';

    angular
        .module('app.projects.overview')
        .controller('OverviewController', OverviewController);

    OverviewController.$inject = ['store', 'categoryService', 'fundService'];

    function OverviewController(store, categoryService, fundService) {
        var vm = this;
        vm.project = store.get('project');
        updateContent();
        updateFunds();

        var options = {
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

        function updateContent() {
            return categoryService.retrieveList()
                .then(populateProgressBars)
                .then(populatePieChart)
                .then(populateTable)
                .catch(error);

            function populateProgressBars(response) {
                vm.categoryList = response.data.objects;

                angular.forEach(vm.categoryList, function(category) {
	                var totalExpenditure = 0;
	                var totalBudget = 0;
	                angular.forEach(category.expenditures, function(expenditure) {
	                    totalExpenditure += expenditure.cost;
	                });
	                angular.forEach(category.items, function(item) {
	                    totalBudget += item.actual;
	                });
	                category.totalExpenditure = totalExpenditure;
	                category.totalBudget = totalBudget;

                    if (totalBudget == 0 && totalBudget < totalExpenditure) {
                        category.spent = 100;
                        category.left  = 0;
                    } else {
                        category.spent = Math.round(totalExpenditure / totalBudget * 100);
                        category.left = Math.round((totalBudget - totalExpenditure) / totalBudget * 100);
                    }
	            });
                return response;
            }
            function populatePieChart(response) {
                var categoryList = response.data.objects;
                options.series[0].data = [];

	            if (categoryList.length == 0) {
	                options.series[0].data.push({ name: 'No Data', y: 0.01 });
	            } else {
	                angular.forEach(categoryList, function(category) {
	                    if (category.items.length != 0) {
	                        var categoryTotal = 0;
	                        angular.forEach(category.items, function(item) {
	                            categoryTotal += item.actual;
	                        });
	                        options.series[0].data.push({ name: category.name, y: categoryTotal });
	                    }
	                });
	            }
                $('#piechart-container').highcharts(options);
                return response;
            }
            function populateTable(response) {
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
                vm.grandTotalSpent = Math.round(grandTotalExpenditure / grandTotalActual * 100);
                vm.grandTotalLeft  = Math.round((grandTotalActual - grandTotalExpenditure) / grandTotalActual * 100);
            }
	    }

	    function updateFunds() {
            return fundService.retrieveList()
                .then(populateProgressBars)
                .catch(error);

            function populateProgressBars(response) {
                vm.fundList = response.data.objects;

	            angular.forEach(vm.fundList, function(fund) {
                    var totalExpenditure = 0;
                    var totalDraw        = 0;
	                angular.forEach(fund.expenditures, function(expenditure) {
	                    totalExpenditure += expenditure.cost;
	                });
	                angular.forEach(fund.draws, function(draw) {
	                    totalDraw += draw.amount;
	                });
                    fund.totalExpenditure = totalExpenditure;
                    fund.totalDraw        = totalDraw;
                    fund.spent            = Math.round(totalExpenditure / fund.amount * 100);
                    fund.left             = Math.round((fund.amount - totalExpenditure) / fund.amount * 100);
                    fund.drawReceived     = Math.round(totalDraw / fund.amount * 100);
                    fund.drawLeft         = Math.round((fund.amount - totalDraw) / fund.amount * 100);
	            });
            }
	    }

        function error(response) {
            vm.errorMsgGet = true;
        }
    }
})();
