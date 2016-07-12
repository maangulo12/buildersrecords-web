(function() {
    'use strict';

    angular
        .module('app.service.stripe', [])
        .factory('stripeService', stripeService);

    stripeService.$inject = ['$http', 'store', '$q', 'API_URL'];

    function stripeService($http, store, $q, API_URL) {
        var url = API_URL + '/api/stripe';
        var service = {
            validateCard:         validateCard,
            createCardToken:      createCardToken,
            createSubscription:   createSubscription,
            retrieveSubscription: retrieveSubscription,
            updateSubscription:   updateSubscription
        };
        return service;

        function validateCard(card) {
            var num = Stripe.card.validateCardNumber(card.cardNumber);
            var exp = Stripe.card.validateExpiry(card.expMonth, card.expYear);
            var cvc = Stripe.card.validateCVC(card.cvc);

            if (num && exp && cvc) {
                return true;
            }
            else {
                return false;
            }
        }

        function createCardToken(card) {
            var data = {
                number:    card.cardNumber,
                cvc:       card.cvc,
                exp_month: card.expMonth,
                exp_year:  card.expYear,
                name:      card.cardName.toUpperCase()
            };
            return $q(function(resolve, reject) {
                Stripe.card.createToken(data, responseCallback);

                function responseCallback(status, response) {
                    if (response.error) {
                        return reject(response);
                    } else {
                        return resolve(response);
                    }
                }
            });
        }

        function createSubscription(user, tokenId) {
            var data = {
                email:    user.email,
                username: user.username,
                password: user.password,
                plan:     user.plan,
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

        // Helpers
        function success(response) {
            return $q.resolve(response);
        }
        function error(response) {
            return $q.reject(response);
        }
    }
})();
