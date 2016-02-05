(function() {
    'use strict';

    angular
        .module('app.projects.cost')
        .config(route);

    route.$inject = ['$stateProvider'];

    function route($stateProvider) {
        $stateProvider.state('cost', {
            url: '/projects/cost',
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
                    templateUrl:  'www/html/cost.html',
                    controller:   'CostController',
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
