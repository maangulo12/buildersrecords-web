(function() {
    'use strict';

    angular
        .module('app.projects.expenditures')
        .controller('ExpendituresController', ExpendituresController);

    ExpendituresController.$inject = ['$scope', 'store', 'expenditureService', 'subcontractorService', 'itemService', 'fundService'];

    function ExpendituresController($scope, store, expenditureService, subcontractorService, itemService, fundService) {
        var vm = this;
        vm.project = store.get('project');
        updateExpenditures();
        updateSubcontractors();
        updateItems();
        updateFunds();

        // GET Expenditures
        function updateExpenditures() {
            getExpenditures()
                .then(calculateTotal)
                .catch(error);

            function getExpenditures() {
                return expenditureService.retrieveList()
                    .then(success);

                function success(data) {
                    vm.expenditureList = data.objects;
                    return vm.expenditureList;
                }
            }
            function calculateTotal() {
                var total = 0;

                angular.forEach(vm.expenditureList, function(expenditure) {
                    total += expenditure.cost;
                });
                vm.totalCost = total;
            }
            function error() {
                vm.getError = true;
            }
        }

        // GET Subcontractors
        function updateSubcontractors() {
            return getSubcontractors();

            function getSubcontractors() {
                return subcontractorService.retrieveList()
                    .then(success)
                    .catch(error);

                function success(data) {
                    vm.subcontractorList = data.objects;
                    return vm.subcontractorList;
                }
                function error() {
                    vm.getError = true;
                }
            }
        }

        // GET Items
        function updateItems() {
            return getItems()
                .then(populateList)
                .catch(error);

            function getItems() {
                return itemService.retrieveList()
                    .then(success);

                function success(data) {
                    vm.itemList = data.objects;
                    return vm.itemList;
                }
            }
            function populateList() {
                var list = [];
                angular.forEach(vm.itemList, function(item) {
                    list.push({
                        id  : item.id,
                        name: item.name,
                        category: {
                            id  : item.categories.id,
                            name: item.categories.name,
                        }
                    });
                });
                vm.itemList = list;
            }
            function error() {
                vm.getError = true;
            }
        }

        // GET Funds
        function updateFunds() {
            return getFunds()
                .then(populateList)
                .catch(error);

            function getFunds() {
                return fundService.retrieveList()
                    .then(success);

                function success(data) {
                    vm.fundList = data.objects;
                    return vm.fundList;
                }
            }
            function populateList() {
                var list = [];
                angular.forEach(vm.fundList, function(fund) {
                    list.push({
                        id  : fund.id,
                        name: fund.name
                    });
                });
                vm.fundList = list;
            }
            function error() {
                vm.getError = true;
            }
        }

        // CLICKED Expenditure
        $scope.clicked = function(expenditure) {
            var index = vm.expenditureList.indexOf(expenditure);
            if (index !== -1) {
                store.set('expenditure', expenditure);
                return true;
            }
            return false;
        }

        // CLICKED Checkbox
        $scope.clickedCheckbox = function(expenditure) {
            if (expenditure.selected) {
                vm.selected = true;
            } else {
                var isSelected = false;
                angular.forEach(vm.expenditureList, function(e) {
                    if (e.selected) {
                        isSelected = true;
                    }
                });
                vm.selected = isSelected;
            }
        }

        // ADD functions
        $scope.addModal = function() {
            vm.expenditure      = {};
            vm.expenditure.date = new Date();
            $scope.addForm.$setPristine();
            $('#add-modal').modal('show');
        }
        $scope.add = function() {
            var btn = $('#add-button').button('loading');

            if (vm.expenditure.question == 1) {
                vm.expenditure.vendor = vm.expenditure.subcontractor.name;
            }

            addExpenditure()
                .then(success)
                .catch(error);

            function addExpenditure() {
                return expenditureService.create(vm.expenditure);
            }
            function success() {
                $('#add-modal').modal('hide');
                btn.button('reset');
                updateExpenditures();
            }
            function error() {
                $scope.addForm.$invalid = true;
                btn.button('reset');
            }
        }

        // DELETE MANY functions
        $scope.deleteManyModal = function() {
            if (!$('#delete-many-button1').hasClass('disabled')) {
                vm.deleteManyError = false;
                $('#delete-many-modal').modal('show');
            }
        }
        $scope.delete = function() {
            var btn = $('#delete-many-button2').button('loading');

            angular.forEach(vm.expenditureList, function(expenditure) {
                if (expenditure.selected) {
                    deleteExpenditure(expenditure.id)
                        .then(success)
                        .catch(error);

                    // This needs work
                    var index = vm.expenditureList.indexOf(expenditure);
                    if (index !== -1) {
                        vm.expenditureList.splice(index, 1);
                    }
                }
            });

            function deleteExpenditure(expenditureId) {
                return expenditureService.remove(expenditureId);
            }
            function success() {
                $('#delete-many-modal').modal('hide');
                btn.button('reset');
                vm.selected = false;
            }
            function error() {
                vm.deleteManyError = true;
                btn.button('reset');
            }
        }

        // DELETE functions
        $scope.deleteModal = function() {
            vm.deleteError = false;
            $('#delete-modal').modal('show');
        }
        $scope.delete = function() {
            var btn = $('#delete-button').button('loading');

            deleteExpenditure()
                .then(success)
                .catch(error);

            function deleteExpenditure() {
                return expenditureService.remove(store.get('expenditure').id);
            }
            function success() {
                $('#delete-modal').modal('hide');
                btn.button('reset');

                // This needs work
                var index = vm.expenditureList.indexOf(store.get('expenditure'));
                if (index !== -1) {
                    vm.expenditureList.splice(index, 1);
                }
            }
            function error() {
                vm.deleteError = true;
                btn.button('reset');
            }
        }

        // UPDATE functions
        $scope.updateModal = function() {
            vm.updated        = {};
            vm.updated.date   = new Date(store.get('expenditure').date);
            vm.updated.vendor = store.get('expenditure').vendor;
            vm.updated.item   = {
                id  : store.get('expenditure').items.id,
                name: store.get('expenditure').items.name,
                category: {
                    id  : store.get('expenditure').categories.id,
                    name: store.get('expenditure').categories.name,
                }
            };
            vm.updated.notes = store.get('expenditure').notes;
            vm.updated.cost = store.get('expenditure').cost;
            vm.updated.fund = {
                id  : store.get('expenditure').funds.id,
                name: store.get('expenditure').funds.name
            };
            $scope.updateForm.$setPristine();
            $('#update-modal').modal('show');
        }
        $scope.update = function() {
            var btn = $('#update-button').button('loading');

            updateExpenditure()
                .then(success)
                .catch(error);

            function updateExpenditure() {
                return expenditureService.update(vm.updated);
            }
            function success() {
                $('#update-modal').modal('hide');
                btn.button('reset');
                updateExpenditures();
            }
            function error() {
                $scope.updateForm.$invalid = true;
                btn.button('reset');
            }
        }
    }
})();
