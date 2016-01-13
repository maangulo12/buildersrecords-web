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
            var btn = $('#signup_button').button('loading');
            var valid = stripeService.validateCard(vm);

            if (valid) {
                createToken()
                    .then(subscribeUserToStripe)
                    .then(saveUserInformation)
                    .then(authenticateUser)
                    .then(routeToTutorial)
                    .catch(error);

                function createToken() {
                    return stripeService.createCardToken(vm);
                }
                function subscribeUserToStripe(response) {
                    return stripeService.createSubscription(vm, response.id);
                }
                function saveUserInformation(response) {
                    return userService.create(vm, response.data.id);
                }
                function authenticateUser(response) {
                    return authService.authenticate(vm.username, vm.password);
                }
                function routeToTutorial(response) {
                    $state.go('tutorial');
                }
            } else {
                error();
            }

            function error() {
                // Display Error Message
                $scope.signupForm.$invalid = true;
                $scope.signupForm.$submitted = true;
                btn.button('reset');
            }
        }
    }
})();
