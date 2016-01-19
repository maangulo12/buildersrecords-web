(function() {
    'use strict';

    angular
        .module('app.service.draw', [])
        .factory('drawService', drawService);

    drawService.$inject = ['$http', 'store'];

    function drawService($http, store) {
        var url = store.get('api_url') + '/api/draws';
        var service = {
            create:     create,
            update:     update,
            remove:     remove,
            removeBulk: removeBulk
        };
        return service;

        function create(vm) {
            var data = {
                date:    vm.date,
                amount:  vm.amount,
                fund_id: store.get('fund').id
            };
            return $http.post(url, data)
                .then(successHandler)
                .catch(errorHandler);
        }

        function update(vm) {
            var data = {
                date:    vm.date,
                amount:  vm.amount,
                fund_id: store.get('fund').id
            };
            return $http.put(url + '/' + store.get('draw').id, data)
                .then(successHandler)
                .catch(errorHandler);
        }

        function remove(draw_id) {
            return $http.delete(url + '/' + draw_id)
                .then(successHandler)
                .catch(errorHandler);
        }

        function removeBulk() {
            return $http.delete(url + query('fund_id', 'equals', store.get('fund').id))
                .then(successHandler)
                .catch(errorHandler);
        }
    }

    function successHandler(response) {
        return response.data;
    }

    function errorHandler(response) {
        return response;
    }

    function query(name, op, val) {
        return '?q={"filters":[{"name":"' + name + '","op":"' + op + '","val":"' + val + '"}]}';
    }
})();
