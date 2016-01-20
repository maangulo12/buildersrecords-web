(function() {
    'use strict';

    angular
        .module('app.service.item', [])
        .factory('itemService', itemService);

    itemService.$inject = ['$http', 'store'];

    function itemService($http, store) {
        var url = store.get('api_url') + '/api/items';
        var service = {
            retrieveList:       retrieveList,
            create:             create,
            update:             update,
            remove:             remove,
            retrieveByCategory: retrieveByCategory,
            removeByCategory:   removeByCategory
        };
        return service;

        function retrieveList() {
            return $http.get(url + query('project_id', 'equals', store.get('project').id))
                .then(success)
                .catch(error);
        }

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
                .then(success)
                .catch(error);
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
                .then(success)
                .catch(error);
        }

        function remove(itemId) {
            return $http.delete(url + '/' + itemId)
                .then(success)
                .catch(error);
        }

        function retrieveByCategory() {
            return $http.get(url + query('category_id', 'equals', store.get('category').id))
                .then(success)
                .catch(error);
        }

        function removeByCategory() {
            return $http.delete(url + query('category_id', 'equals', store.get('category').id))
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
