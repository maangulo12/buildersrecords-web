(function() {
    'use strict';

    angular
        .module('app.service.stripe', [])
        .factory('stripeService', stripeService);

    stripeService.$inject = ['$http', 'store', '$q'];

    function stripeService($http, store, $q) {
        var url = store.get('url') + '/api/stripe';
        var service = {
            validateCard:         validateCard,
            createCardToken:      createCardToken,
            createSubscription:   createSubscription,
            retrieveSubscription: retrieveSubscription,
            updateSubscription:   updateSubscription
        };
        return service;

        function validateCard(vm) {
            var num = Stripe.card.validateCardNumber(vm.cardNumber);
            var exp = Stripe.card.validateExpiry(vm.expMonth, vm.expYear);
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
                number:    vm.cardNumber,
                cvc:       vm.cvc,
                exp_month: vm.expMonth,
                exp_year:  vm.expYear,
                name:      vm.cardName.toUpperCase()
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

        function createSubscription(vm, tokenId) {
            var data = {
                email:    vm.email,
                username: vm.username,
                password: vm.password,
                plan:     vm.plan,
                token_id: tokenId
            };
            return $http.post(url, data)
                .then(success)
                .catch(error);
        }

        function retrieveSubscription() {
            return $http.get(url + '/' + store.get('user').stripe)
                .then(success)
                .catch(error);
        }

        function updateSubscription(tokenId) {
            var data = {
                stripe_id: store.get('user').stripe,
                token_id:  tokenId
            };
            return $http.put(url + '/' + store.get('user').stripe, data)
                .then(success)
                .catch(error);
        }
    }

    function success(response) {
        return response.data;
    }

    function error(response) {
        return response;
    }
})();
