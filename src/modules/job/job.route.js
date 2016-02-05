(function() {
    'use strict';

    angular
        .module('app.projects.job')
        .config(route);

    route.$inject = ['$stateProvider'];

    function route($stateProvider) {
        $stateProvider.state('job', {
            url: '/projects/job',
            resolve: {
                User: updateUser
            },
            views: {
                'nav': {
                    templateUrl:  'www/html/nav2.html',
                    controller:   NavController,
                    controllerAs: 'vm'
                },
                'body': {
                    templateUrl:  'www/html/job.html',
                    controller:   'JobController',
                    controllerAs: 'vm'
                }
            },
            data: {
                requiresLogin: true
            }
        });
    }

    updateUser.$inject = ['userService', '$q'];

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

    NavController.$inject = ['User'];

    function NavController(User) {
        var vm = this;
        vm.username = User.username;
    }
})();