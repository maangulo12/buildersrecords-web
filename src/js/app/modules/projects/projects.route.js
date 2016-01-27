(function() {
    'use strict';

    angular
        .module('app.projects')
        .config(route);

    function route($stateProvider) {
        $stateProvider.state('projects', {
            url: '/projects',
            resolve: {
                User: updateUser
            },
            views: {
                'nav': {
                    templateUrl:  'src/js/app/partials/navs/nav2.html',
                    controller:   NavController,
                    controllerAs: 'vm'
                },
                'body': {
                    templateUrl:  'src/js/app/modules/projects/projects.html',
                    controller:   'ProjectsController',
                    controllerAs: 'vm'
                }
            },
            data: {
                requiresLogin: true
            }
        });
    }

    function updateUser(userService, $q) {
        return getUser()
            .then(success)
            .catch(error);

        function getUser() {
            return userService.retrieve();
        }
        function success(response) {
            return $q.resolve(response.data);
        }
        function error(response) {
            return $q.reject(response);
        }
    }

    function NavController(User) {
        var vm = this;
        vm.username = User.username;
    }
})();
