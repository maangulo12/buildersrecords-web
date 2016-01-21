(function() {
    'use strict';

    angular
        .module('app.service.user', [])
        .factory('userService', userService);

    userService.$inject = ['$http', 'store'];

    function userService($http, store) {
        var url = store.get('url') + '/api/users';
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

        function updateUser(vm) {
            var data = {
                email:    vm.email,
                username: vm.username
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
    }

    function success(response) {
        return response.data;
    }

    function error(response) {
        return response;
    }
})();
