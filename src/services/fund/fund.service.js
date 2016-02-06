/**
 * @ngdoc service
 * @name fundService
 * @description
 *
 * This is the service module for Fund.
**/
(function() {
    'use strict';

    angular
        .module('app.service.fund', [])
        .factory('fundService', fundService);

    fundService.$inject = ['$http', 'store', '$q', 'API_URL'];

    function fundService($http, store, $q, API_URL) {
        var url = API_URL + '/api/funds';
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
            return $http.put(url + '/' + fund.id, data)
                .then(success)
                .catch(error);
        }

        function remove(fund) {
            return $http.delete(url + '/' + fund.id)
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
