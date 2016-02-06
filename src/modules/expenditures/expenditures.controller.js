(function() {
    'use strict';

    angular
        .module('app.projects.expenditures')
        .controller('ExpendituresController', ExpendituresController);

    ExpendituresController.$inject = ['$scope', 'store', '$filter', 'expenditureService', 'subcontractorService', 'itemService', 'fundService'];

    function ExpendituresController($scope, store, $filter, expenditureService, subcontractorService, itemService, fundService) {
        var vm = this;
        vm.project = store.get('project');
        showExpenditures();
        setSubcontractors();
        setItems();
        setFunds();

        // GET Expenditures
        function showExpenditures() {
            return getExpenditures();

            function getExpenditures() {
                return expenditureService.retrieveList()
                    .then(success)
                    .catch(error);

                function success(response) {
                    vm.expenditureList = response.data.objects;
                    return vm.expenditureList;
                }
                function error() {
                    vm.errorGet = true;
                }
            }
        }

        // GET Subcontractors
        function setSubcontractors() {
            return getSubcontractors();

            function getSubcontractors() {
                return subcontractorService.retrieveList()
                    .then(success)
                    .catch(error);

                function success(response) {
                    vm.subcontractorList = response.data.objects;
                    return vm.subcontractorList;
                }
                function error() {
                    vm.errorGet = true;
                }
            }
        }

        // GET Items
        function setItems() {
            return getItems()
                .then(populateList)
                .catch(error);

            function getItems() {
                return itemService.retrieveList()
                    .then(success)
                    .catch(error);

                function success(response) {
                    vm.itemList = response.data.objects;
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
                return vm.itemList;
            }
            function error() {
                vm.errorGet = true;
            }
        }

        // GET Funds
        function setFunds() {
            return getFunds()
                .then(populateList)
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
            function populateList() {
                var list = [];
                angular.forEach(vm.fundList, function(fund) {
                    list.push({
                        id  : fund.id,
                        name: fund.name
                    });
                });
                vm.fundList = list;
                return vm.fundList;
            }
            function error() {
                vm.errorGet = true;
            }
        }

        // CLICKED function
        $scope.clickedCheckbox = function() {
            var isSelected = false;
            angular.forEach(vm.expenditureList, function(expenditure) {
                if (expenditure.selected) {
                    isSelected = true;
                }
            });
            vm.selected = isSelected;
        };

        // ADD functions
        $scope.addModal = function() {
            vm.expenditure      = {};
            vm.expenditure.date = new Date();
            $scope.addForm.$setPristine();
            $('#add-button').button('reset');
            $('#add-modal').modal('show');
        };
        $scope.add = function() {
            $('#add-button').button('loading');

            if (vm.expenditure.question == 1) {
                vm.expenditure.company = vm.expenditure.subcontractor.company;
            }

            return addExpenditure()
                .then(success)
                .catch(error);

            function addExpenditure() {
                return expenditureService.create(vm.expenditure);
            }
            function success() {
                $('#add-modal').modal('hide');
                showExpenditures();
            }
            function error() {
                $scope.addForm.$invalid = true;
                $('#add-button').button('reset');
            }
        };

        // DELETE MANY functions
        $scope.deleteManyModal = function() {
            if (!$('#delete-many-button1').hasClass('disabled')) {
                vm.errorDeleteMany = false;
                $('#delete-many-button2').button('reset');
                $('#delete-many-modal').modal('show');
            }
        };
        $scope.deleteMany = function() {
            $('#delete-many-button2').button('loading');

            angular.forEach(vm.expenditureList, function(expenditure) {
                if (expenditure.selected) {
                    return deleteExpenditure(expenditure)
                        .then(success)
                        .catch(error);
                }
            });

            function deleteExpenditure(expenditure) {
                return expenditureService.remove(expenditure);
            }
            function success() {
                $('#delete-many-modal').modal('hide');
                vm.selected = false;
                showExpenditures();
            }
            function error() {
                vm.errorDeleteMany = true;
                $('#delete-many-button2').button('reset');
            }
        };

        // DELETE functions
        $scope.deleteModal = function(expenditure) {
            vm.errorDelete = false;
            vm.expenditure = {};
            vm.expenditure.id = expenditure.id;
            $('#delete-button').button('reset');
            $('#delete-modal').modal('show');
        };
        $scope.delete = function() {
            $('#delete-button').button('loading');

            return deleteExpenditure()
                .then(success)
                .catch(error);

            function deleteExpenditure() {
                return expenditureService.remove(vm.expenditure);
            }
            function success() {
                $('#delete-modal').modal('hide');
                showExpenditures();
            }
            function error() {
                vm.errorDelete = true;
                $('#delete-button').button('reset');
            }
        };

        // UPDATE functions
        $scope.updateModal = function(expenditure) {
            var date = new Date(expenditure.date);

            vm.expenditure         = {};
            vm.expenditure.id      = expenditure.id;
            vm.expenditure.date    = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
            vm.expenditure.company = expenditure.company;
            vm.expenditure.item    = {
                id  : expenditure.items.id,
                name: expenditure.items.name,
                category: {
                    id  : expenditure.categories.id,
                    name: expenditure.categories.name,
                }
            };
            vm.expenditure.notes = expenditure.notes;
            vm.expenditure.cost  = expenditure.cost;
            vm.expenditure.fund  = {
                id:   expenditure.funds.id,
                name: expenditure.funds.name
            };
            $scope.updateForm.$setPristine();
            $('#update-button').button('reset');
            $('#update-modal').modal('show');
        };
        $scope.update = function() {
            $('#update-button').button('loading');

            return updateExpenditure()
                .then(success)
                .catch(error);

            function updateExpenditure() {
                return expenditureService.update(vm.expenditure);
            }
            function success() {
                $('#update-modal').modal('hide');
                showExpenditures();
            }
            function error() {
                $scope.updateForm.$invalid = true;
                $('#update-button').button('reset');
            }
        };
    }
})();
