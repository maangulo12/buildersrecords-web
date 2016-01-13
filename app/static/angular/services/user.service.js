(function() {
    'use strict';

    angular
        .module('app.service.user', [])
        .factory('userService', userService);

    userService.$inject = ['$http', 'store'];

    function userService($http, store) {
        var url = store.get('api_url') + '/api/users';
        var service = {
            create:   create,
            retrieve: retrieve
        };
        return service;

        function create(vm, stripe_id) {
            var data = {
                email:     vm.email,
                username:  vm.username,
                password:  vm.password,
                stripe_id: stripe_id
            };
            return $http.post(url, data);
        }

        function retrieve() {
            return $http.get(url + '/' + store.get('user').id);
        }
    }
})();
