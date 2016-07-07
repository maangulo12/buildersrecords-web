(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['$scope', 'store', 'projectService', 'utilityService'];

    function ProjectsController($scope, store, projectService, utilityService) {
        var vm = this;
        showProjects();

        // GET function
        function showProjects() {
            return getProjects()
                .then(success)
                .catch(error);

            function getProjects() {
                return projectService.retrieveList();
            }
            function success(response) {
                vm.projectList = response.data.objects;
                return vm.projectList;
            }
            function error(response) {
                vm.errorGet = true;
            }
        }

        // CLICKED function
        $scope.clicked = function(project) {
            var index = vm.projectList.indexOf(project);
            if (index !== -1) {
                store.set('project', project);
                return true;
            }
            return false;
        };

        // ADD functions
        $scope.addModal = function() {
            vm.project = {};
            $scope.addForm.$setPristine();
            $('#add-button').button('reset');
            $('#add-modal').modal('show');
        };
        $scope.add = function() {
            $('#add-button').button('loading');

            if ($('#project-file').length && $('#project-file')[0].files[0]) {
                return parseFile()
                    .then(success)
                    .catch(error);
            } else {
                return createProject()
                    .then(success)
                    .catch(error);
            }

            function parseFile() {
                var file = $('#project-file')[0].files[0];
                return utilityService.parseUbuilditFile(vm.project, file);
            }
            function createProject() {
                return projectService.create(vm.project);
            }
            function success(response) {
                $('#add-modal').modal('hide');
                showProjects();
            }
            function error(response) {
                $scope.addForm.$invalid = true;
                $('#add-button').button('reset');
            }
        };

        // DELETE functions
        $scope.deleteModal = function(project) {
            vm.errorDelete = false;
            vm.deleted = project;
            $('#delete-button').button('reset');
            $('#delete-modal').modal('show');
        };
        $scope.delete = function() {
            $('#delete-button').button('loading');

            return deleteProject()
                .then(success)
                .catch(error);

            function deleteProject() {
                return projectService.remove(vm.deleted);
            }
            function success(response) {
                $('#delete-modal').modal('hide');
                showProjects();
            }
            function error(response) {
                vm.errorDelete = true;
                $('#delete-button').button('reset');
            }
        };

        // UPDATE functions
        $scope.updateModal = function(project) {
            vm.project         = {};
            vm.project.id      = project.id;
            vm.project.name    = project.name;
            vm.project.address = project.address;
            vm.project.city    = project.city;
            vm.project.state   = project.state;
            vm.project.zipcode = project.zipcode;
            vm.project.homeSq  = project.home_sq;
            $scope.updateForm.$setPristine();
            $('#update-button').button('reset');
            $('#update-modal').modal('show');
        };
        $scope.update = function() {
            $('#update-button').button('loading');

            return updateProject()
                .then(success)
                .catch(error);

            function updateProject() {
                return projectService.update(vm.project);
            }
            function success() {
                $('#update-modal').modal('hide');
                showProjects();
            }
            function error() {
                $scope.updateForm.$invalid = true;
                $('#update-button').button('reset');
            }
        };
    }
})();
