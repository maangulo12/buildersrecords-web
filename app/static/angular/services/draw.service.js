(function() {
    'use strict';

    angular
        .module('app.service.draw', [])
        .factory('drawService', drawService);

    drawService.$inject = ['$http', 'store'];

    function drawService($http, store) {
        var url = store.get('url') + '/api/draws';
        var service = {
            create:       create,
            update:       update,
            remove:       remove,
            removeByFund: removeByFund
        };
        return service;

        function create(vm) {
            var data = {
                date:    vm.date,
                amount:  vm.amount,
                fund_id: store.get('fund').id
            };
            return $http.post(url, data)
                .then(success)
                .catch(error);
        }

        function update(vm) {
            var data = {
                date:    vm.date,
                amount:  vm.amount,
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

        function removeByFund() {
            return $http.delete(url + query('fund_id', 'equals', store.get('fund').id))
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

    function query(name, op, val) {
        return '?q={"filters":[{"name":"' + name + '","op":"' + op + '","val":"' + val + '"}]}';
    }
})();
