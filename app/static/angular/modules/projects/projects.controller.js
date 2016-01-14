(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['$scope', 'store', 'projectsService', 'utilityService'];

    function ProjectsController($scope, store, projectsService, utilityService) {
        var vm = this;
        getProjects();

        function getProjects() {
            return projectsService.retrieveList()
                .then(showProjectList)
                .catch(error);

            function showProjectList(response) {
                vm.projectList = response.data.objects;
            }
            function error(response) {
                vm.errorGetProjects = true;
            }
        }

        $scope.clickedProject = function(project) {
            var index = vm.projectList.indexOf(project);
            if (index !== -1) {
                store.set('project', project);
                return true;
            }
            return false;
        }

        $scope.showNewProjectModal = function() {
            vm.project = {};
            $scope.newProjectForm.$setPristine();
            $('#new-project-modal').modal('show');
        }
        $scope.createProject = function() {
            var btn = $('#create-project-button').button('loading');
            var exists = $('#project-file').length;

            if (exists && $('#project-file')[0].files[0]) {
                parseFile()
                    .then(projectSuccess)
                    .catch(error);
            } else {
                createProject()
                    .then(projectSuccess)
                    .catch(error);
            }

            function parseFile() {
                var file = $('#project-file')[0].files[0];
                return utilityService.parseUbuilditFile(vm.project, file);
            }
            function createProject() {
                return projectsService.create(vm.project);
            }
            function projectSuccess(response) {
                $('#new-project-modal').modal('hide');
                btn.button('reset');
                getProjects();
            }
            function error(response) {
                $scope.newProjectForm.$invalid = true;
                btn.button('reset');
            }
        }

        $scope.showDeleteProjectModal = function() {
            vm.errorMsgDelete = false;
            $('#delete-project-modal').modal('show');
        }
        $scope.deleteProject = function() {
            var btn = $('#delete-project-button').button('loading');

            deleteProject()
                .then(deleteSuccess)
                .catch(error);

            function deleteProject() {
                return projectsService.remove();
            }
            function deleteSuccess(response) {
                $('#delete-project-modal').modal('hide');
                btn.button('reset');
                getProjects();
            }
            function error(response) {
                vm.errorMsgDelete = true;
                btn.button('reset');
            }
        }

        $scope.showEditProjectModal = function(project) {
            vm.updatedProject         = {};
            vm.updatedProject.name    = store.get('project').name;
            vm.updatedProject.address = store.get('project').address;
            vm.updatedProject.city    = store.get('project').city;
            vm.updatedProject.state   = store.get('project').state;
            vm.updatedProject.zipcode = store.get('project').zipcode;
            vm.updatedProject.homeSq  = store.get('project').homeSq;
            $scope.editProjectForm.$setPristine();
            $('#edit-project-modal').modal('show');
        }
        $scope.updateProject = function() {
            var btn = $('#update-project-button').button('loading');

            updateProject()
                .then(updateSuccess)
                .catch(error);

            function updateProject() {
                return projectsService.update(vm.updatedProject);
            }
            function updateSuccess() {
                $('#edit-project-modal').modal('hide');
                btn.button('reset');
                getProjects();
            }
            function error() {
                $scope.editProjectForm.$invalid = true;
                btn.button('reset');
            }
        }
    }
})();
