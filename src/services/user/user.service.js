(function() {
    'use strict';

    angular
        .module('app.service.user', [])
        .factory('userService', userService);

    userService.$inject = ['$http', 'store', '$q', 'API_URL'];

    function userService($http, store, $q, API_URL) {
        var url = API_URL + '/api/users';
        var service = {
            retrieve:       retrieve,
            updateUser:     updateUser,
            updatePassword: updatePassword
        };
        return service;

        function retrieve() {
            return $http.get(url + '/' + store.get('user').id)
                .then(success)
                .catch(error);
        }

        function updateUser(user) {
            var data = {
                email:    user.email,
                username: user.username
            };
            return $http.put(url + '/' + store.get('user').id, data)
                .then(success)
                .catch(error);
        }

        function updatePassword(password) {
            return $http.put(url + '/' + store.get('user').id, { password: password })
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
