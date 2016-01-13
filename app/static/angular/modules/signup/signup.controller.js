(function() {
    'use strict';

    angular
        .module('app.signup')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$scope', 'store', '$state', 'stripeService', 'userService', 'authService'];

    function SignupController($scope, store, $state, stripeService, userService, authService) {
        var vm = this;
        vm.plan = 'free';
        store.remove('jwt');

        $scope.signUp = function() {
            var btn = $('#signup-button').button('loading');
            var valid = stripeService.validateCard(vm);

            if (valid) {
                createToken()
                    .then(subscribeUser)
                    .then(createUser)
                    .then(authenticateUser)
                    .then(goTutorial)
                    .catch(error);
            } else {
                error();
            }

            function createToken() {
                return stripeService.createCardToken(vm);
            }
            function subscribeUser(response) {
                return stripeService.createSubscription(vm, response.id);
            }
            function createUser(response) {
                return userService.create(vm, response.data.id);
            }
            function authenticateUser(response) {
                return authService.authenticate(vm.username, vm.password);
            }
            function goTutorial(response) {
                $state.go('tutorial');
            }
            function error() {
                $scope.signupForm.$invalid = true;
                $scope.signupForm.$submitted = true;
                btn.button('reset');
            }
        }
    }
})();
