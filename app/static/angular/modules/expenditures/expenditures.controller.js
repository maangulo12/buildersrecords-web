(function() {
    'use strict';

    angular
        .module('app.projects.expenditures')
        .controller('ExpendituresController', ExpendituresController);

    ExpendituresController.$inject = ['$scope', 'store', 'categoryService', 'expenditureService'];

    function ExpendituresController($scope, store, categoryService, expenditureService) {
        var vm = this;
        vm.project = store.get('project');
        updateExpenditures();
        // updateProgressBars();
        // updateTable();
        // populateSubcontractorsDropdown();
        // populateItemsDropdown();
        // populateFundsDropdown();

        function updateExpenditures() {
            getExpenditures()
                .then(populateTable)
                .catch(error);

            function getExpenditures() {
                return expenditureService.retrieveList()
                    .then(getSuccess);

                function getSuccess(data) {
                    vm.expenditureList = data.objects;
                    return vm.expenditureList;
                }
            }
            function populateTable(response) {
                var total = 0;

                angular.forEach(vm.expenditureList, function(expenditure) {
                    total += expenditure.cost;
                });
                vm.totalCost = total;
            }
            function error(response) {
                vm.errorMsgGet = true;
            }
        }

		//
	    // // CLICKED EVENTS functions
	    // $scope.clickedExpenditure = function(expenditure) {
	    //     var index = $scope.expenditure_list.indexOf(expenditure);
	    //     if (index !== -1) {
	    //         store.set('expenditure', expenditure);
	    //         return true;
	    //     }
	    //     return false;
	    // }
	    // $scope.clickedSingleCheckbox = function(expenditure) {
	    //     if (expenditure.selected) {
	    //         $scope.selected = true;
	    //     } else {
	    //         var is_selected = false;
	    //         angular.forEach($scope.expenditure_list, function(e) {
	    //             if (e.selected) {
	    //                 is_selected = true;
	    //             }
	    //         });
	    //         $scope.selected = is_selected;
	    //     }
	    // }
		//
	    // // POPULATE SUBCONTRACTORS DROPDOWN function
	    // function populateSubcontractorsDropdown() {
	    //     SubcontractorService.getSubcontractors().then(function(response) {
	    //         $scope.subcontractor_list = response.data.objects;
	    //     }, function(error) {
	    //         $scope.error_msg_get = true;
	    //     });
	    // }
		//
	    // // POPULATE ITEMS DROPDOWN function
	    // function populateItemsDropdown() {
	    //     ItemService.getItems().then(function(response) {
	    //         var list = [];
	    //         angular.forEach(response.data.objects, function(item) {
	    //             list.push({
	    //                 id  : item.id,
	    //                 name: item.name,
	    //                 category: {
	    //                     id  : item.categories.id,
	    //                     name: item.categories.name,
	    //                 }
	    //             });
	    //         });
	    //         $scope.item_list = list;
		//
	    //     }, function(error) {
	    //         $scope.error_msg_get = true;
	    //     });
	    // }
		//
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
