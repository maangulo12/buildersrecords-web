(function() {
    'use strict';

    angular
        .module('app.projects.subcontractors')
        .controller('SubcontractorsController', SubcontractorsController);

    SubcontractorsController.$inject = ['$scope', 'store', 'subcontractorService'];

    function SubcontractorsController($scope, store, subcontractorService) {
        var vm = this;
        vm.project = store.get('project');
        showSubcontractors();

        // GET function
        function showSubcontractors() {
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

        // CLICKED function
        $scope.clickedCheckbox = function() {
            var isSelected = false;
            angular.forEach(vm.subcontractorList, function(subcontractor) {
                if (subcontractor.selected) {
                    isSelected = true;
                }
            });
            vm.selected = isSelected;
        };

        // ADD functions
        $scope.addModal = function() {
            vm.subcontractor = {};
            $scope.addForm.$setPristine();
            $('#add-button').button('reset');
            $('#add-modal').modal('show');
        };
        $scope.add = function() {
            $('#add-button').button('loading');

            return addSubcontractor()
                .then(success)
                .catch(error);

            function addSubcontractor() {
                return subcontractorService.create(vm.subcontractor);
            }
            function success() {
                $('#add-modal').modal('hide');
                showSubcontractors();
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

            angular.forEach(vm.subcontractorList, function(subcontractor) {
                if (subcontractor.selected) {
                    return deleteSubcontractor(subcontractor)
                        .then(success)
                        .catch(error);
                }
            });

            function deleteSubcontractor(subcontractor) {
                return subcontractorService.remove(subcontractor);
            }
            function success() {
                $('#delete-many-modal').modal('hide');
                vm.selected = false;
                showSubcontractors();
            }
            function error() {
                vm.errorDeleteMany = true;
                $('#delete-many-button2').button('reset');
            }
        };

        // DELETE functions
        $scope.deleteModal = function(subcontractor) {
            vm.errorDelete = false;
            vm.subcontractor = {};
            vm.subcontractor = subcontractor;
            $('#delete-button').button('reset');
            $('#delete-modal').modal('show');
        };
        $scope.delete = function() {
            $('#delete-button').button('loading');

            return deleteSubcontractor()
                .then(success)
                .catch(error);

            function deleteSubcontractor() {
                return subcontractorService.remove(vm.subcontractor);
            }
            function success() {
                $('#delete-modal').modal('hide');
                showSubcontractors();
            }
            function error() {
                vm.errorDelete = true;
                $('#delete-button').button('reset');
            }
        };

        // UPDATE functions
        $scope.updateModal = function(subcontractor) {
            vm.subcontractor         = {};
            vm.subcontractor.id      = subcontractor.id;
            vm.subcontractor.company = subcontractor.company;
            vm.subcontractor.person  = subcontractor.person;
            vm.subcontractor.number  = subcontractor.number;
            $scope.updateForm.$setPristine();
            $('#update-button').button('reset');
            $('#update-modal').modal('show');
        };
        $scope.update = function() {
            $('#update-button').button('loading');

            return updateSubcontractor()
                .then(success)
                .catch(error);

            function updateSubcontractor() {
                return subcontractorService.update(vm.subcontractor);
            }
            function success() {
                $('#update-modal').modal('hide');
                showSubcontractors();
            }
            function error() {
                $scope.updateForm.$invalid = true;
                $('#update-button').button('reset');
            }
        };
    }
})();
