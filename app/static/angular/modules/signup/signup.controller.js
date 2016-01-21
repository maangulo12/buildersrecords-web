(function() {
    'use strict';

    angular
        .module('app.signup')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$scope', 'store', '$state', 'stripeService', 'authService'];

    function SignupController($scope, store, $state, stripeService, authService) {
        var vm = this;
        vm.plan = 'free';
        store.remove('jwt');

        $scope.signUp = function() {
            var btn = $('#signup-button').button('loading');
            var valid = stripeService.validateCard(vm);

            if (valid) {
                createToken()
                    .then(subscribeUser)
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
        }
    }
})();
