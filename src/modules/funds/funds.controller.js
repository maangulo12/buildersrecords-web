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

        // ADD Fund
        $scope.addFundModal = function() {
            vm.fund = {};
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
            function success() {
                $('#add-fund-modal').modal('hide');
                showFunds();
            }
            function error() {
                $scope.addFundForm.$invalid = true;
                $('#add-fund-button').button('reset');
            }
        };

        // DELETE Fund
        $scope.deleteFundModal = function(fund) {
            vm.errorDeleteFund = false;
            vm.fund = {};
            vm.fund = fund;
            $('#delete-fund-button').button('reset');
            $('#delete-fund-modal').modal('show');
        };
        $scope.deleteFund = function() {
            $('#delete-fund-button').button('loading');

            if (vm.fund.draws.length === 0) {
                return deleteFund()
                    .then(success)
                    .catch(error);
            } else {
                return deleteDraws()
                    .then(deleteFund)
                    .then(success)
                    .catch(error);
            }

            function deleteDraws() {
                return drawService.removeByFund(vm.fund);
            }
            function deleteFund() {
                return fundService.remove(vm.fund);
            }
            function success() {
                $('#delete-fund-modal').modal('hide');
                showFunds();
            }
            function error(response) {
                vm.errorDeleteFund = true;
                $('#delete-fund-button').button('reset');
            }
        };

        // UPDATE Fund
        $scope.updateFundModal = function(fund) {
            vm.fund        = {};
            vm.fund.id     = fund.id;
            vm.fund.name   = fund.name;
            vm.fund.amount = fund.amount;
            $scope.updateFundForm.$setPristine();
            $('#update-fund-button').button('reset');
            $('#update-fund-modal').modal('show');
        };
        $scope.updateFund = function() {
            $('#update-fund-button').button('loading');

            return updateFund()
                .then(success)
                .catch(error);

            function updateFund() {
                return fundService.update(vm.fund);
            }
            function success() {
                $('#update-fund-modal').modal('hide');
                showFunds();
            }
            function error() {
                $scope.updateFundForm.$invalid = true;
                $('#update-fund-button').button('reset');
            }
        };

        // ADD Draw
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
