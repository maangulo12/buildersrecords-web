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

            authenticateUser()
                .then(goProjects)
                .catch(error);

            function authenticateUser() {
                return authService.authenticate(vm.username, vm.password);
            }
            function goProjects() {
                $state.go('projects');
            }
            function error() {
                $scope.loginForm.$invalid = true;
                vm.password = '';
                btn.button('reset');
            }
        }
    }
})();
