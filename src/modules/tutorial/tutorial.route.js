(function() {
    'use strict';

    angular
        .module('app.tutorial')
        .config(route);

    route.$inject = ['$stateProvider'];

    function route($stateProvider) {
        $stateProvider.state('tutorial', {
            url: '/tutorial',
            resolve: {
                User: updateUser
            },
            views: {
                'nav': {
                    templateUrl:  'html/nav2.html',
                    controller:   NavController,
                    controllerAs: 'vm'
                },
                'body': {
                    templateUrl:  'html/tutorial.html',
                    controller:   'TutorialController',
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
