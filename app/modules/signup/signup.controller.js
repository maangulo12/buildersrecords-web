(function() {
    'use strict';

    angular
        .module('app.signup')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$scope', 'store', '$state', 'userService', 'authService'];

    function SignupController($scope, store, $state, userService, authService) {
        var vm = this;
        vm.plan = 'free';
        store.remove('jwt');

        $scope.signUp = function() {
            var btn = $('#signup-button').button('loading');

            return createUser()
                .then(authenticateUser)
                .then(goTutorial)
                .catch(error);

            function createUser() {
                return userService.create(vm);
            }
            function authenticateUser() {
                return authService.authenticate(vm.username, vm.password);
            }
            function goTutorial() {
                $state.go('tutorial');
            }
            function error() {
                $scope.signupForm.$invalid = true;
                btn.button('reset');
            }
        };
    }
})();
