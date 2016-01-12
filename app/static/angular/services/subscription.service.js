(function() {
    'use strict';

    angular
        .module('app.service.subscription', [])
        .factory('subscriptionService', subscriptionService);

    subscriptionService.$inject = ['$http', 'store'];

    function subscriptionService($http, store) {
        var url = store.get('api_url') + '/api/subscriptions';
        var service = {
            retrieve: retrieve,
            create:   create,
            update:   update
        };
        return service;

        function retrieve() {
            return $http.get(url + '/' + store.get('user').stripe_id);
        }

        function create(vm, token_id) {
            var data = {
                email:    vm.email,
                username: vm.username,
                password: vm.password,
                plan:     vm.plan,
                token_id: token_id
            };
            return $http.post(url, data);
        }

        function update(token_id) {
            var data = {
                stripe_id: store.get('user').stripe_id,
                token_id:  token_id
            };
            return $http.put(url + '/' + store.get('user').stripe_id, data);
        }
    }
})();
