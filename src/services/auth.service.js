/**
 * @ngdoc service
 * @name authService
 * @description
 *
 * This is the service module for Auth.
**/
(function() {
    'use strict';

    angular
        .module('app.service.auth', [])
        .factory('authService', authService);

    authService.$inject = ['$http', 'store', 'jwtHelper', '$q'];

    function authService($http, store, jwtHelper, $q) {
        var url = store.get('url') + '/api/auth';
        var service = {
            authenticate: authenticate
        };
        return service;

        function authenticate(login, password) {
            var data = {
                login:    login,
                password: password
            };
            return $http.post(url, data)
                .then(success)
                .catch(error);

            function success(response) {
                var token   = response.data.token;
                var payload = jwtHelper.decodeToken(token);
                var user    = {
                    id:     payload.user_id,
                    stripe: payload.stripe_id
                };
                store.set('jwt', token);
                store.set('user', user);
                return $q.resolve(response);
            }
            function error(response) {
                return $q.reject(response);
            }
        }
    }
})();
