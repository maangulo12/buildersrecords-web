(function() {
    'use strict';

    angular
        .module('app.projects.subcontractors')
        .controller('SubcontractorsController', SubcontractorsController);

    SubcontractorsController.$inject = ['$scope', 'store', 'subcontractorService'];

    function SubcontractorsController($scope, store, subcontractorService) {
        var vm = this;
        vm.project = store.get('project');
        updateSubcontractors();

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

        // CLICKED Subcontractor
        $scope.clicked = function(subcontractor) {
            var index = vm.subcontractorList.indexOf(subcontractor);
            if (index !== -1) {
                store.set('subcontractor', subcontractor);
                return true;
            }
            return false;
        }

        // CLICKED Checkbox
        $scope.clickedCheckbox = function(subcontractor) {
            if (subcontractor.selected) {
                vm.selected = true;
            } else {
                var isSelected = false;
                angular.forEach(vm.subcontractorList, function(e) {
                    if (e.selected) {
                        isSelected = true;
                    }
                });
                vm.selected = isSelected;
            }
        }

        // ADD functions
        $scope.addModal = function() {
            vm.subcontractor = {};
            $scope.addForm.$setPristine();
            $('#add-modal').modal('show');
        }
        $scope.add = function() {
            var btn = $('#add-button').button('loading');

            addSubcontractor()
                .then(sucess)
                .catch(error);

            function addSubcontractor() {
                return subcontractorService.create(vm.subcontractor);
            }
            function sucess() {
                $('#add-modal').modal('hide');
                btn.button('reset');
                updateSubcontractors();
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
        $scope.deleteMany = function() {
            var btn = $('#delete-many-button2').button('loading');

            angular.forEach(vm.subcontractorList, function(subcontractor) {
                if (subcontractor.selected) {
                    deleteSubcontractor(subcontractor.id)
                        .then(success)
                        .catch(error);
                }
            });

            function deleteSubcontractor(subcontractorId) {
                return subcontractorService.remove(subcontractorId);
            }
            function success() {
                $('#delete-many-modal').modal('hide');
                btn.button('reset');
                vm.selected = false;
                updateSubcontractors();
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

            deleteSubcontractor()
                .then(success)
                .catch(error);

            function deleteSubcontractor() {
                return subcontractorService.remove(store.get('subcontractor').id);
            }
            function success() {
                $('#delete-modal').modal('hide');
                btn.button('reset');
                updateSubcontractors();
            }
            function error() {
                vm.deleteError = true;
                btn.button('reset');
            }
        }

        // UPDATE functions
        $scope.updateModal = function() {
            vm.updated               = {};
            vm.updated.name          = store.get('subcontractor').name;
            vm.updated.company       = store.get('subcontractor').company;
            vm.updated.contactNumber = store.get('subcontractor').contact_number;
            $scope.updateForm.$setPristine();
            $('#update-modal').modal('show');
        }
        $scope.update = function() {
            var btn = $('#update-button').button('loading');

            updateSubcontractor()
                .then(success)
                .catch(error);

            function updateSubcontractor() {
                return subcontractorService.update(vm.updated);
            }
            function success() {
                $('#update-modal').modal('hide');
                btn.button('reset');
                updateSubcontractors();
            }
            function error() {
                $scope.updateForm.$invalid = true;
                btn.button('reset');
            }
        }
    }
})();
