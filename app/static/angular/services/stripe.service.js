(function() {
    'use strict';

    angular
        .module('app.service.stripe', [])
        .factory('stripeService', stripeService);

    stripeService.$inject = ['$q'];

    function stripeService($q) {
        var service = {
            validateCard: validateCard,
            createToken:  createToken
        };
        return service;

        function validateCard(vm) {
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
            return $q(function(resolve, reject) {
                Stripe.card.createToken(data, responseHandler);

                function responseHandler(status, response) {
                    if (response.error) {
                        return reject(response);
                    } else {
                        return resolve(response);
                    }
                }
            });
        }
    }
})();
