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
            return $http.post(url, data);
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
            return $http.put(url + '/' + store.get('item').id, data);
        }

        function remove(itemId) {
            return $http.delete(url + '/' + itemId);
        }

        function retrieveByCategory() {
            return $http.get(url + query('category_id', 'equals', store.get('category').id));
        }

        function removeByCategory() {
            return $http.delete(url + query('category_id', 'equals', store.get('category').id));
        }
    }

    function query(name, op, val) {
        return '?q={"filters":[{"name":"' + name + '","op":"' + op + '","val":"' + val + '"}]}';
    }
})();
