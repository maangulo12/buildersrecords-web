(function() {
    'use strict';

    angular
        .module('app.signup')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$scope', 'store', '$state', 'authService', 'stripeService', 'subscriptionService', 'mailService'];

    function SignupController($scope, store, $state, authService, stripeService, subscriptionService, mailService) {
        var vm = this;
        vm.plan = 'free';
        store.remove('jwt');

        $scope.signUp = function() {
            var btn = $('#signup_button').button('loading');
            var valid = stripeService.validateCard(vm);

            if (valid) {
                createToken()
                    .then(createSubscription)
                    .then(sendRegistrationEmail)
                    .then(authenticateUser)
                    .then(routeToTutorial)
                    .catch(error);

                function createToken() {
                    return stripeService.createToken(vm);
                }
                function createSubscription(response) {
                    return subscriptionService.create(vm, response.id);
                }
                function sendRegistrationEmail(response) {
                    return mailService.sendRegistration(vm);
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
