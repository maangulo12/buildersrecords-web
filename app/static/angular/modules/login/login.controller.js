(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'store', '$state', 'authService'];

    function LoginController($scope, store, $state, authService) {
        var vm = this;
        store.remove('jwt');

        $scope.logIn = function() {
            var btn = $('#login-button').button('loading');
            authenticate()
                .then(routeToProjects)
                .catch(error);

            function authenticate() {
                return authService.authenticate(vm.username, vm.password);
            }
            function routeToProjects(response) {
                $state.go('projects');
            }
            function error(response) {
                $scope.loginForm.$invalid = true;
                $scope.loginForm.$submitted = true;
                vm.password = '';
                btn.button('reset');
            }
        }
    }
})();
