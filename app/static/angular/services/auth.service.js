(function() {
    'use strict';

    angular
        .module('app.service.auth', [])
        .factory('authService', authService);

    authService.$inject = ['$http', 'store', 'jwtHelper', '$q'];

    function authService($http, store, jwtHelper, $q) {
        var url = store.get('api_url') + '/api/auth';
        var service = {
            authenticate:  authenticate,
            checkEmail:    checkEmail,
            checkUsername: checkUsername
        };
        return service;

        // POST /api/auth (authenticates user)
        function authenticate(login, password) {
            var data = {
                login:    login,
                password: password
            };
            return $http.post(url, data)
                .then(responseHandler)
                .catch(errorHandler);

                function responseHandler(response) {
                    var token   = response.data.token;
                    var payload = jwtHelper.decodeToken(token);
                    var user    = {
                        id:        payload.user_id,
                        stripe_id: payload.stripe_id
                    };
                    store.set('jwt', token);
                    store.set('user', user);
                    return response;
                }
                function errorHandler(response) {
                    return $q.reject(response);
                }
        }

        // POST /api/auth/<email> (checks if email already exists)
        function checkEmail(email) {
            return $http.post(url + '/email', { email : email });
        }

        // POST /api/auth/<username> (checks if username already exists)
        function checkUsername(username) {
            return $http.post(url + '/username', { username : username });
        }
    }
})();
