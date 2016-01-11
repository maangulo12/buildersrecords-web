(function() {
    'use strict';

    angular
        .module('app.signup')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$scope', 'store', '$state', 'authService', 'stripeService', 'Subscription', 'Mail'];

    function SignupController($scope, store, $state, authService, stripeService, Subscription, Mail) {
        var vm = this;
        store.remove('jwt');
        vm.plan = 'monthly';

        $scope.signUp = function() {
            var btn = $('#signup_button').button('loading');
            var isValid = stripeService.validate(vm);

            if (isValid) {
                console.log('MADE IT');
                getToken()


            } else {
                error();
            }

            function getToken() {
                return stripeService.createToken(vm)
                    .then()
                    .catch();

                function responseHandler() {
                    Subscription.create($scope.signup, response.id)
                        .then(responseHandler1)
                        .catch(errorHandler1);
                }
            }

            function stripeResponseHandler(status, response) {
                if (response.error) {
                    error();
                } else {

                }
            }
            function responseHandler1(response) {
                Mail.sendRegistrationEmail($scope.signup);
                Auth.authenticate($scope.signup)
                    .then(responseHandler2)
                    .catch(errorHandler2);
            }
            function errorHandler1(response) {
                error();
            }
            function responseHandler2(response) {
                Utility.storeToken(response);
                $state.go('tutorial');
            }
            function errorHandler2(response) {
                $state.go('login');
            }
            function error() {
                $scope.signup_form.$invalid = true;
                btn.button('reset');
            }
        }
    }
})();
