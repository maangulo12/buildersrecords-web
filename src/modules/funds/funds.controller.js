(function() {
    'use strict';

    angular
        .module('app.projects.funds')
        .controller('FundsController', FundsController);

    FundsController.$inject = ['$scope', 'store', 'fundService', 'drawService'];

    function FundsController($scope, store, fundService, drawService) {
        var vm = this;
        vm.project = store.get('project');
        showFunds();

        // GET function
        function showFunds() {
            return getFunds()
                .then(updateTable)
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
            function updateTable() {
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
            function error(response) {
                vm.errorGet = true;
            }
        }

        // CLICKED functions
        $scope.clickedFund = function(fund) {
            var index = vm.fundList.indexOf(fund);
            if (index !== -1) {
                store.set('fund', fund);
                return true;
            }
            return false;
        };
        $scope.clickedDraw = function(draw) {
            var index = store.get('fund').draws.indexOf(draw);
            if (index !== -1) {
                store.set('draw', draw);
                return true;
            }
            return false;
        };
        $scope.clickedAllCheckbox = function() {
            angular.forEach(store.get('fund').draws, function(draw) {
                draw.selected = store.get('fund').checkboxAll;
                store.get('fund').selected = draw.selected;
            });
        };
        $scope.clickedCheckbox = function(draw) {
            if (draw.selected) {
                store.get('fund').selected = true;
            } else {
                var isSelected = false;
                angular.forEach(store.get('fund').draws, function(d) {
                    if (d.selected) {
                        isSelected = true;
                    }
                });
                store.get('fund').selected = isSelected;
            }
        };

        $scope.addFundModal = function() {
            vm.fund         = {};
            vm.loanQuestion = [{ value: true, name: 'Yes' }, { value: false, name: 'No' }];
            $scope.addFundForm.$setPristine();
            $('#add-fund-button').button('reset');
            $('#add-fund-modal').modal('show');
        };
        $scope.addFund = function() {
            $('#add-fund-button').button('loading');

            return addFund()
                .then(success)
                .catch(error);

            function addFund() {
                return fundService.create(vm.fund);
            }
            function success(response) {
                $('#add-fund-modal').modal('hide');
                showFunds();
            }
            function error(response) {
                $scope.addFundForm.$invalid = true;
                $('#add-fund-button').button('reset');
            }
        };

        $scope.showDeleteFundModal = function() {
            vm.errorMsgDelete = false;
            $('#delete-fund-modal').modal('show');
        };
        $scope.deleteFund = function() {
            var btn = $('#delete-fund-button').button('loading');

            if (store.get('fund').draws === 0) {
                deleteFund()
                    .then(deleteSuccess)
                    .catch(error);
            } else {
                deleteDraws()
                    .then(deleteFund)
                    .then(deleteSuccess)
                    .catch(error);
            }

            function deleteDraws() {
                return drawService.removeByFund();
            }
            function deleteFund() {
                return fundService.remove();
            }
            function deleteSuccess(response) {
                $('#delete-fund-modal').modal('hide');
                btn.button('reset');
                showFunds();
            }
            function error(response) {
                vm.errorMsgDelete = true;
                btn.button('reset');
            }
        };

        $scope.showEditFundModal = function() {
            vm.updatedFund        = {};
            vm.updatedFund.name   = store.get('fund').name;
            vm.updatedFund.amount = store.get('fund').amount;
            $scope.editFundForm.$setPristine();
            $('#edit-fund-modal').modal('show');
        };
        $scope.updateFund = function() {
            var btn = $('#update-fund-button').button('loading');

            updateFund()
                .then(updateSuccess)
                .catch(error);

            function updateFund() {
                return fundService.update(vm.updatedFund);
            }
            function updateSuccess(response) {
                $('#edit-fund-modal').modal('hide');
                btn.button('reset');
                showFunds();
            }
            function error(response) {
                $scope.editFundForm.$invalid = true;
                btn.button('reset');
            }
        };

        $scope.showAddDrawModal = function() {
            vm.draw      = {};
            vm.draw.date = new Date();
            $scope.addDrawForm.$setPristine();
            $('#add-draw-modal').modal('show');
        };
        $scope.addDraw = function() {
            var btn = $('#add-draw-button').button('loading');

            addDraw()
                .then(addSuccess)
                .catch(error);

            function addDraw() {
                return drawService.create(vm.draw);
            }
            function addSuccess(response) {
                $('#add-draw-modal').modal('hide');
                btn.button('reset');
                showFunds();
            }
            function error(response) {
                $scope.addDrawForm.$invalid = true;
                btn.button('reset');
            }
        };

        $scope.showDeleteDrawsModal = function() {
            if (store.get('fund').selected) {
                vm.errorMsgDeleteDraws = false;
                $('#delete-draws-modal').modal('show');
            }
        };
        $scope.deleteDraws = function() {
            var btn = $('#delete-draw-button').button('loading');

            angular.forEach(store.get('fund').draws, function(draw) {
                if (draw.selected) {
                    deleteDraw(draw.id)
                        .then(deleteSuccess)
                        .catch(error);
                }
            });

            function deleteDraw(draw_id) {
                return drawService.remove(draw_id);
            }
            function deleteSuccess(response) {
                $('#delete-draws-modal').modal('hide');
                btn.button('reset');
                showFunds();
            }
            function error(response) {
                vm.errorMsgDeleteDraws = true;
                btn.button('reset');
            }
        };

        $scope.showEditDrawModal = function() {
            vm.updatedDraw        = {};
            vm.updatedDraw.date   = new Date(store.get('draw').date);
            vm.updatedDraw.amount = store.get('draw').amount;
            $scope.editDrawForm.$setPristine();
            $('#edit-draw-modal').modal('show');
        };
        $scope.updateDraw = function() {
            var btn = $('#update-draw-button').button('loading');

            updateDraw()
                .then(updateSuccess)
                .catch(error);

            function updateDraw() {
                return drawService.update(vm.updatedDraw);
            }
            function updateSuccess(response) {
                $('#edit-draw-modal').modal('hide');
                btn.button('reset');
                showFunds();
            }
            function error(response) {
                $scope.editDrawForm.$invalid = true;
                btn.button('reset');
            }
        };
    }
})();
