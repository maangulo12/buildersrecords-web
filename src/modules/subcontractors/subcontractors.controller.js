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
        };

        // ADD functions
        $scope.addModal = function() {
            vm.subcontractor = {};
            $scope.addForm.$setPristine();
            $('#add-modal').modal('show');
        };
        $scope.add = function() {
            var btn = $('#add-button').button('loading');

            addSubcontractor()
                .then(success)
                .catch(error);

            function addSubcontractor() {
                return subcontractorService.create(vm.subcontractor);
            }
            function success() {
                $('#add-modal').modal('hide');
                btn.button('reset');
                showSubcontractors();
            }
            function error() {
                $scope.addForm.$invalid = true;
                btn.button('reset');
            }
        };

        // DELETE MANY functions
        $scope.deleteManyModal = function() {
            if (!$('#delete-many-button1').hasClass('disabled')) {
                vm.errorDeleteMany = false;
                $('#delete-many-modal').modal('show');
            }
        };
        $scope.deleteMany = function() {
            var btn = $('#delete-many-button2').button('loading');

            angular.forEach(vm.subcontractorList, function(subcontractor) {
                if (subcontractor.selected) {
                    deleteSubcontractor(subcontractor)
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
                showSubcontractors();
            }
            function error() {
                vm.errorDeleteMany = true;
                btn.button('reset');
            }
        };

        // DELETE functions
        $scope.deleteModal = function(subcontractor) {
            vm.errorDelete = false;
            vm.subcontractor = {};
            vm.subcontractor = subcontractor;
            $('#delete-modal').modal('show');
        };
        $scope.delete = function() {
            var btn = $('#delete-button').button('loading');

            deleteSubcontractor()
                .then(success)
                .catch(error);

            function deleteSubcontractor() {
                return subcontractorService.remove(vm.subcontractor);
            }
            function success() {
                $('#delete-modal').modal('hide');
                btn.button('reset');
                showSubcontractors();
            }
            function error() {
                vm.errorDelete = true;
                btn.button('reset');
            }
        };

        // UPDATE functions
        $scope.updateModal = function(subcontractor) {
            vm.subcontractor               = {};
            vm.subcontractor.id            = subcontractor.id;
            vm.subcontractor.name          = subcontractor.name;
            vm.subcontractor.company       = subcontractor.company;
            vm.subcontractor.contactNumber = subcontractor.contact_number;
            $scope.updateForm.$setPristine();
            $('#update-modal').modal('show');
        };
        $scope.update = function() {
            var btn = $('#update-button').button('loading');

            updateSubcontractor()
                .then(success)
                .catch(error);

            function updateSubcontractor() {
                return subcontractorService.update(vm.subcontractor);
            }
            function success() {
                $('#update-modal').modal('hide');
                btn.button('reset');
                showSubcontractors();
            }
            function error() {
                $scope.updateForm.$invalid = true;
                btn.button('reset');
            }
        };
    }
})();
