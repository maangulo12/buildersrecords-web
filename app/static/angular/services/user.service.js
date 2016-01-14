(function() {
    'use strict';

    angular
        .module('app.service.user', [])
        .factory('userService', userService);

    userService.$inject = ['$http', 'store'];

    function userService($http, store) {
        var url = store.get('api_url') + '/api/users';
        var service = {
            retrieve:       retrieve,
            updateUser:     updateUser,
            updatePassword: updatePassword
        };
        return service;

        function retrieve() {
            return $http.get(url + '/' + store.get('user').id);
        }

        function updateUser(vm) {
            var data = {
                email:    vm.email,
                username: vm.username
            };
            return $http.put(url + '/' + store.get('user').id, data);
        }

        function updatePassword(password) {
            return $http.put(url + '/' + store.get('user').id, { password: password });
        }
    }
})();
