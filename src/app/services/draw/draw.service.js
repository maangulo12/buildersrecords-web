(function() {
    'use strict';

    angular
        .module('app.service.draw', [])
        .factory('drawService', drawService);

    drawService.$inject = ['$http', 'store', '$q', 'API_URL'];

    function drawService($http, store, $q, API_URL) {
        var url = API_URL + '/api/draws';
        var service = {
            create:       create,
            update:       update,
            remove:       remove,
            removeByFund: removeByFund
        };
        return service;

        function create(draw) {
            var data = {
                date:    draw.date,
                amount:  draw.amount,
                fund_id: store.get('fund').id
            };
            return $http.post(url, data)
                .then(success)
                .catch(error);
        }

        function update(draw) {
            var data = {
                date:    draw.date,
                amount:  draw.amount,
                fund_id: store.get('fund').id
            };
            return $http.put(url + '/' + store.get('draw').id, data)
                .then(success)
                .catch(error);
        }

        function remove(drawId) {
            return $http.delete(url + '/' + drawId)
                .then(success)
                .catch(error);
        }

        function removeByFund(fund) {
            return $http.delete(url + query('fund_id', 'equals', fund.id))
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
