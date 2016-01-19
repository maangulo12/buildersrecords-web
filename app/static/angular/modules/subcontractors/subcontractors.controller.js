(function() {
    'use strict';

    angular
        .module('app.projects.budget')
        .controller('SubcontractorsController', SubcontractorsController);

    SubcontractorsController.$inject = ['$scope', 'store', 'subcontractorService'];

    function SubcontractorsController($scope, store, subcontractorService) {
        var vm = this;
        vm.project = store.get('project');
        updateSubcontractors();

	    function updateSubcontractors() {
            return getSubcontractors();

            function getSubcontractors() {
                return subcontractorService.retrieveList()
                    .then(getSuccess);

                function getSuccess(data) {
                    vm.subcontractorList = data.objects;
                    return vm.subcontractorList;
                }
            }
	    }

        // function getCategories() {
        //     return categoryService.retrieveList()
        //         .then(getSuccess);
        //
        //     function getSuccess(data) {
        //         vm.categoryList = data.objects;
        //         return vm.categoryList;
        //     }
        // }
        //
	    // // CLICKED EVENTS functions
	    // $scope.clickedSubcontractor = function(subcontractor) {
	    //     var index = vm.subcontractorList.indexOf(subcontractor);
	    //     if (index !== -1) {
	    //         store.set('subcontractor', subcontractor);
	    //         return true;
	    //     }
	    //     return false;
	    // }
	    // $scope.clickedSingleCheckbox = function(subcontractor) {
	    //     if (subcontractor.selected) {
	    //         $scope.selected = true;
	    //     } else {
	    //         var is_selected = false;
	    //         angular.forEach(vm.subcontractorList, function(e) {
	    //             if (e.selected) {
	    //                 is_selected = true;
	    //             }
	    //         });
	    //         $scope.selected = is_selected;
	    //     }
	    // }
        //
	    // // ADD SUBCONTRACTOR functions
	    // $scope.showAddSubcontractorModal = function() {
	    //     $scope.addDisabled = false;
	    //     $scope.subcontractor = {};
	    //     $scope.add_subcontractor_form.$setPristine();
	    //     $('#add_subcontractor_modal').modal('show');
	    // }
	    // $scope.addSubcontractor = function() {
	    //     $scope.addDisabled = true;
	    //     SubcontractorService.addSubcontractor($scope.subcontractor).then(function(response) {
	    //         $('#add_subcontractor_modal').modal('hide');
	    //         // This needs re-work
	    //         // Add element to the expenditure list
	    //         updateTable();
	    //     }, function(error) {
	    //         $scope.add_subcontractor_form.$invalid = true;
	    //     });
	    // }
        //
	    // // DELETE SUBCONTRACTOR functions
	    // $scope.showDeleteSubcontractorsModal = function() {
	    //     if (!$('#delete_button').hasClass('disabled')) {
	    //         $scope.deleteDisabled = false;
	    //         $scope.error_msg_delete = false;
	    //         $('#delete_subcontractors_modal').modal('show');
	    //     }
	    // }
	    // $scope.deleteSubcontractors = function() {
	    //     $scope.deleteDisabled = true;
	    //     angular.forEach(vm.subcontractorList, function(subcontractor) {
	    //         if (subcontractor.selected) {
	    //             SubcontractorService.deleteSubcontractor(subcontractor.id).then(function(response) {
	    //                 $('#delete_subcontractors_modal').modal('hide');
	    //                 $scope.selected = false;
        //
	    //                 var index = vm.subcontractorList.indexOf(subcontractor);
	    //                 if (index !== -1) {
	    //                     vm.subcontractorList.splice(index, 1);
	    //                 }
	    //             }, function(error) {
	    //                 $scope.error_msg_delete = true;
	    //             });
	    //         }
	    //     });
	    // }
        //
	    // // DELETE SINGLE SUBCONTRACTOR functions
	    // $scope.showSingleDeleteSubcontractorModal = function() {
	    //     $scope.deleteSingleDisabled = false;
	    //     $scope.error_msg_delete_single = false;
	    //     $('#delete_single_subcontractor_modal').modal('show');
	    // }
	    // $scope.deleteSingleSubcontractor = function() {
	    //     $scope.deleteSingleDisabled = true;
	    //     SubcontractorService.deleteSubcontractor(store.get('subcontractor').id).then(function(response) {
	    //         $('#delete_single_subcontractor_modal').modal('hide');
        //
	    //         var index = vm.subcontractorList.indexOf(store.get('subcontractor'));
	    //         if (index !== -1) {
	    //             vm.subcontractorList.splice(index, 1);
	    //         }
	    //     }, function(error) {
	    //         $scope.error_msg_delete_single = true;
	    //     });
	    // }
        //
	    // // UPDATE SUBCONTRACTOR functions
	    // $scope.showEditSubcontractorModal = function() {
	    //     $scope.updateDisabled = false;
	    //     $scope.updated_subcontractor                = {};
	    //     $scope.updated_subcontractor.name           = store.get('subcontractor').name;
	    //     $scope.updated_subcontractor.company        = store.get('subcontractor').company;
	    //     $scope.updated_subcontractor.contact_number = store.get('subcontractor').contact_number;
	    //     $scope.edit_subcontractor_form.$setPristine();
	    //     $('#edit_subcontractor_modal').modal('show');
	    // }
	    // $scope.updateSubcontractor = function() {
	    //     $scope.updateDisabled = true;
	    //     SubcontractorService.updateSubcontractor($scope.updated_subcontractor).then(function(response) {
	    //         $('#edit_subcontractor_modal').modal('hide');
	    //         // This needs re-work
	    //         // Update element in the list
	    //         updateTable();
	    //     }, function(error) {
	    //         $scope.edit_subcontractor_form.$invalid = true;
	    //     });
	    // }
    }
})();
