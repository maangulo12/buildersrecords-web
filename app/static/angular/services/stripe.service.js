(function() {
    'use strict';

    angular
        .module('app.service.stripe', [])
        .factory('stripeService', stripeService);

    stripeService.$inject = ['$http', 'store', '$q'];

    function stripeService($http, store, $q) {
        var url = store.get('api_url') + '/api/stripe';
        var service = {
            validateCard:         validateCard,
            createCardToken:      createCardToken,
            createSubscription:   createSubscription,
            retrieveSubscription: retrieveSubscription,
            updateSubscription:   updateSubscription
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

        function createCardToken(vm) {
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

        function createSubscription(vm, token_id) {
            var data = {
                email:    vm.email,
                plan:     vm.plan,
                token_id: token_id
            };
            return $http.post(url, data);
        }

        function retrieveSubscription() {
            return $http.get(url + '/' + store.get('user').stripe_id);
        }

        function updateSubscription(token_id) {
            var data = {
                stripe_id: store.get('user').stripe_id,
                token_id:  token_id
            };
            return $http.put(url + '/' + store.get('user').stripe_id, data);
        }
    }
})();
