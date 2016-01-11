(function() {
    'use strict';

    angular
        .module('app.service.stripe', [])
        .factory('stripeService', stripeService);

    function stripeService() {
        var service = {
            validate:    validate,
            createToken: createToken
        };
        return service;

        function validate(vm) {
            var num = Stripe.card.validateCardNumber(vm.card_number);
            var exp = Stripe.card.validateExpiry(vm.exp_month, vm.exp_year);
            var cvc = Stripe.card.validateCVC(vm.cvc);

            if (num && exp && cvc) {
                return true;
            }
            else {
                return false;
            }
        }

        function createToken(vm) {
            var data = {
                number:    vm.card_number,
                cvc:       vm.cvc,
                exp_month: vm.exp_month,
                exp_year:  vm.exp_year,
                name:      vm.card_name.toUpperCase()
            };
            Stripe.card.createToken(data, responseHandler);

            function responseHandler(status, response) {
                if (response.error) {
                    return $q.reject(response);
                } else {
                    return response;
                }
            }
        }
    }
})();
