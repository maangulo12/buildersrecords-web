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
        // populateSubcontractorsDropdown();
        // populateItemsDropdown();
        // populateFundsDropdown();

        // GET Expenditures
        function updateExpenditures() {
            getExpenditures()
                .then(populateTable)
                .catch(error);

            function getExpenditures() {
                return expenditureService.retrieveList()
                    .then(success);

                function success(data) {
                    vm.expenditureList = data.objects;
                    return vm.expenditureList;
                }
            }
            function populateTable() {
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

	    // // POPULATE FUNDS DROPDOWN function
	    // function populateFundsDropdown() {
	    //     FundService.getFunds().then(function(response) {
	    //         var list = [];
	    //         angular.forEach(response.data.objects, function(fund) {
	    //             list.push({
	    //                 id  : fund.id,
	    //                 name: fund.name
	    //             });
	    //         });
	    //         $scope.fund_list = list;
		//
	    //     }, function(error) {
	    //         $scope.error_msg_get = true;
	    //     });
	    // }
		//
	    // // ADD EXPENDITURE functions
	    // $scope.showAddExpenditureModal = function() {
	    //     $scope.addDisabled = false;
	    //     $scope.expenditure = {};
	    //     $scope.expenditure.date = new Date();
	    //     $scope.add_expenditure_form.$setPristine();
	    //     $('#add_expenditure_modal').modal('show');
	    // }
	    // $scope.addExpenditure = function() {
	    //     $scope.addDisabled = true;
	    //     if ($scope.expenditure.question == 1) {
	    //         $scope.expenditure.vendor = $scope.expenditure.subcontractor.name;
	    //     }
	    //     ExpenditureService.addExpenditure($scope.expenditure).then(function(response) {
	    //         $('#add_expenditure_modal').modal('hide');
	    //         updateProgressBars();
	    //         // This needs re-work
	    //         // Add element to the expenditure list
	    //         updateTable();
	    //     }, function(error) {
	    //         $scope.add_expenditure_form.$invalid = true;
	    //     });
	    // }
		//
	    // // DELETE EXPENDITURES functions
	    // $scope.showDeleteExpendituresModal = function() {
	    //     if (!$('#delete_button').hasClass('disabled')) {
	    //         $scope.deleteDisabled = false;
	    //         $scope.error_msg_delete = false;
	    //         $('#delete_expenditures_modal').modal('show');
	    //     }
	    // }
	    // $scope.deleteExpenditures = function() {
	    //     $scope.deleteDisabled = true;
	    //     angular.forEach($scope.expenditure_list, function(expenditure) {
	    //         if (expenditure.selected) {
	    //             ExpenditureService.deleteExpenditure(expenditure.id).then(function(response) {
	    //                 $('#delete_expenditures_modal').modal('hide');
	    //                 $scope.selected = false;
	    //                 updateProgressBars();
		//
	    //                 var index = $scope.expenditure_list.indexOf(expenditure);
	    //                 if (index !== -1) {
	    //                     $scope.expenditure_list.splice(index, 1);
	    //                 }
	    //             }, function(error) {
	    //                 $scope.error_msg_delete = true;
	    //             });
	    //         }
	    //     });
	    // }
		//
	    // // DELETE SINGLE EXPENDITURE functions
	    // $scope.showSingleDeleteExpenditureModal = function() {
	    //     $scope.deleteSingleDisabled = false;
	    //     $scope.error_msg_delete_single = false;
	    //     $('#delete_single_expenditure_modal').modal('show');
	    // }
	    // $scope.deleteSingleExpenditure = function() {
	    //     $scope.deleteSingleDisabled = true;
	    //     ExpenditureService.deleteExpenditure(store.get('expenditure').id).then(function(response) {
	    //         $('#delete_single_expenditure_modal').modal('hide');
	    //         updateProgressBars();
		//
	    //         var index = $scope.expenditure_list.indexOf(store.get('expenditure'));
	    //         if (index !== -1) {
	    //             $scope.expenditure_list.splice(index, 1);
	    //         }
	    //     }, function(error) {
	    //         $scope.error_msg_delete_single = true;
	    //     });
	    // }
		//
	    // // UPDATE EXPENDITURE functions
	    // $scope.showEditExpenditureModal = function() {
	    //     $scope.updateDisabled = false;
	    //     $scope.updated_expenditure        = {};
	    //     $scope.updated_expenditure.date   = new Date(store.get('expenditure').date);
	    //     $scope.updated_expenditure.vendor = store.get('expenditure').vendor;
	    //     $scope.updated_expenditure.item   = {
	    //         id  : store.get('expenditure').items.id,
	    //         name: store.get('expenditure').items.name,
	    //         category: {
	    //             id  : store.get('expenditure').categories.id,
	    //             name: store.get('expenditure').categories.name,
	    //         }
	    //     };
	    //     $scope.updated_expenditure.notes = store.get('expenditure').notes;
	    //     $scope.updated_expenditure.cost = store.get('expenditure').cost;
	    //     $scope.updated_expenditure.fund = {
	    //         id  : store.get('expenditure').funds.id,
	    //         name: store.get('expenditure').funds.name
	    //     };
	    //     $scope.edit_expenditure_form.$setPristine();
	    //     $('#edit_expenditure_modal').modal('show');
	    // }
	    // $scope.updateExpenditure = function() {
	    //     $scope.updateDisabled = true;
	    //     ExpenditureService.updateExpenditure($scope.updated_expenditure).then(function(response) {
	    //         $('#edit_expenditure_modal').modal('hide');
	    //         updateProgressBars();
	    //         // This needs re-work
	    //         // Update element in the list
	    //         updateTable();
	    //     }, function(error) {
	    //         $scope.edit_expenditure_form.$invalid = true;
	    //     });
	    // }
    }
})();
