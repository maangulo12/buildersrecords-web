(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['$scope', 'store', 'projectService', 'utilityService'];

    function ProjectsController($scope, store, projectService, utilityService) {
        var vm = this;
        updateProjects();

        // GET function
        function updateProjects() {
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
                vm.getError = true;
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
        }

        // ADD functions
        $scope.addModal = function() {
            vm.project = {};
            $scope.addForm.$setPristine();
            $('#add-modal').modal('show');
        }
        $scope.add = function() {
            var btn = $('#add-button').button('loading');

            if ($('#project-file').length && $('#project-file')[0].files[0]) {
                parseFile()
                    .then(success)
                    .catch(error);
            } else {
                createProject()
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
                btn.button('reset');
                updateProjects();
            }
            function error(response) {
                $scope.addForm.$invalid = true;
                btn.button('reset');
            }
        }

        // DELETE functions
        $scope.deleteModal = function(project) {
            vm.deleteError = false;
            vm.deleted = project;
            $('#delete-modal').modal('show');
        }
        $scope.delete = function() {
            var btn = $('#delete-button').button('loading');

            deleteProject()
                .then(success)
                .catch(error);

            function deleteProject() {
                return projectService.remove(vm.deleted);
            }
            function success(response) {
                $('#delete-modal').modal('hide');
                btn.button('reset');
                updateProjects();
            }
            function error(response) {
                vm.deleteError = true;
                btn.button('reset');
            }
        }

        // UPDATE functions
        $scope.updateModal = function(project) {
            vm.updated         = {};
            vm.updated.id      = project.id;
            vm.updated.name    = project.name;
            vm.updated.address = project.address;
            vm.updated.city    = project.city;
            vm.updated.state   = project.state;
            vm.updated.zipcode = project.zipcode;
            vm.updated.homeSq  = project.home_sq;
            $scope.updateForm.$setPristine();
            $('#update-modal').modal('show');
        }
        $scope.update = function() {
            var btn = $('#update-button').button('loading');

            updateProject()
                .then(success)
                .catch(error);

            function updateProject() {
                return projectService.update(vm.updated);
            }
            function success() {
                $('#update-modal').modal('hide');
                btn.button('reset');
                updateProjects();
            }
            function error() {
                $scope.updateForm.$invalid = true;
                btn.button('reset');
            }
        }
    }
})();
