(function() {
    'use strict';

    angular
        .module('app.service.user', [])
        .factory('userService', userService);

    userService.$inject = ['$http', 'store'];

    function userService($http, store) {
        var url = store.get('api_url') + '/api/users';
        var service = {
            retrieve: retrieve
        };
        return service;

        function retrieve() {
            return $http.get(url + '/' + store.get('user').id);
        }
    }
})();
