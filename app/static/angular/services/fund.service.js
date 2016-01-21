(function() {
    'use strict';

    angular
        .module('app.service.fund', [])
        .factory('fundService', fundService);

    fundService.$inject = ['$http', 'store', '$q'];

    function fundService($http, store, $q) {
        var url = store.get('url') + '/api/funds';
        var service = {
            retrieveList: retrieveList,
            create:       create,
            update:       update,
            remove:       remove
        };
        return service;

        function retrieveList() {
			return $http.get(url + query('project_id', 'equals', store.get('project').id))
                .then(success)
                .catch(error);
        }

        function create(fund) {
            var data = {
                name:       fund.name,
                loan:       fund.loan,
                amount:     fund.amount,
                project_id: store.get('project').id
            };
            return $http.post(url, data)
                .then(success)
                .catch(error);
        }

        function update(fund) {
            var data = {
                name:       fund.name,
                amount:     fund.amount,
                project_id: store.get('project').id
            };
            return $http.put(url + '/' + store.get('fund').id, data)
                .then(success)
                .catch(error);
        }

        function remove() {
            return $http.delete(url + '/' + store.get('fund').id)
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
        function query(name, op, val) {
            return '?q={"filters":[{"name":"' + name + '","op":"' + op + '","val":"' + val + '"}]}';
        }
    }
})();
