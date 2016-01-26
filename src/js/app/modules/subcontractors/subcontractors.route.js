(function() {
    'use strict';

    angular
        .module('app.projects.subcontractors')
        .config(route);

    function route($stateProvider) {
        $stateProvider.state('subcontractors', {
            url: '/projects/subcontractors',
            resolve: {
                User: updateUser
            },
            views: {
                'nav': {
                    templateUrl:  'static/angular/partials/navs/nav2.html',
                    controller:   NavController,
                    controllerAs: 'vm'
                },
                'body': {
                    templateUrl:  'static/angular/modules/subcontractors/subcontractors.html',
                    controller:   'SubcontractorsController',
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