(function() {
    'use strict';

    angular
        .module('app.projects.overview')
        .controller('OverviewController', OverviewController);

    OverviewController.$inject = ['store', 'chartService', 'categoryService', 'fundService'];

    function OverviewController(store, chartService, categoryService, fundService) {
        var vm = this;
        vm.project = store.get('project');
        var options = chartService.setPieChartOptions();
        showCategories();
        showFunds();

        // GET Categories
        function showCategories() {
            return getCategories()
                .then(populateProgressBars)
                .then(populatePieChart)
                .then(populateTable)
                .catch(error);

            function getCategories() {
                return categoryService.retrieveList()
                    .then(success)
                    .catch(error);

                    function success(response) {
                        vm.categoryList = response.data.objects;
                        return vm.categoryList;
                    }
            }
            function populateProgressBars() {
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

                    if (totalBudget === 0 && totalBudget < totalExpenditure) {
                        category.spent = 100;
                        category.left  = 0;
                    } else {
                        category.spent = Math.round(totalExpenditure / totalBudget * 100);
                        category.left  = Math.round((totalBudget - totalExpenditure) / totalBudget * 100);
                    }
                });
            }
            function populatePieChart() {
                options.series[0].data = [];

                if (vm.categoryList.length === 0) {
                    options.series[0].data.push({ name: 'No Data', y: 0.01 });
                } else {
                    angular.forEach(vm.categoryList, function(category) {
                        if (category.items.length !== 0) {
                            var categoryTotal = 0;
                            angular.forEach(category.items, function(item) {
                                categoryTotal += item.actual;
                            });
                            options.series[0].data.push({ name: category.name, y: categoryTotal });
                        }
                    });
                }
                $('#piechart-container').highcharts(options);
            }
            function populateTable() {
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

        // GET Funds
        function showFunds() {
            return getFunds()
                .then(populateProgressBars)
                .catch(error);

            function getFunds() {
                return fundService.retrieveList()
                    .then(success)
                    .catch(error);

                    function success(response) {
                        vm.fundList = response.data.objects;
                        return vm.fundList;
                    }
            }
            function populateProgressBars() {
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

        // Error
        function error() {
            vm.errorGet = true;
        }
    }
})();
