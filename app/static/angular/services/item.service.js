(function() {
    'use strict';

    angular
        .module('app.service.item', [])
        .factory('itemService', itemService);

    itemService.$inject = ['$http', 'store'];

    function itemService($http, store) {
        var url = store.get('api_url') + '/api/items';
        var service = {
            create:             create,
            update:             update,
            remove:             remove,
            retrieveByCategory: retrieveByCategory,
            removeByCategory:   removeByCategory
        };
        return service;

        function create(vm) {
            var data = {
                name:        vm.name,
                description: vm.description,
                estimated:   vm.estimated,
                actual:      vm.actual,
                category_id: vm.category,
                project_id:  store.get('project').id
            };
            return $http.post(url, data)
                .then(successHandler)
                .catch(errorHandler);
        }

        function update(vm) {
            var data = {
                name:        vm.name,
                description: vm.description,
                estimated:   vm.estimated,
                actual:      vm.actual,
                category_id: vm.category.id,
                project_id:  store.get('project').id
            };
            return $http.put(url + '/' + store.get('item').id, data)
                .then(successHandler)
                .catch(errorHandler);
        }

        function remove(itemId) {
            return $http.delete(url + '/' + itemId)
                .then(successHandler)
                .catch(errorHandler);
        }

        function retrieveByCategory() {
            return $http.get(url + query('category_id', 'equals', store.get('category').id))
                .then(successHandler)
                .catch(errorHandler);
        }

        function removeByCategory() {
            return $http.delete(url + query('category_id', 'equals', store.get('category').id))
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
