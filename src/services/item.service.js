/**
 * @ngdoc service
 * @name itemService
 * @description
 *
 * This is the service module for Item.
**/
(function() {
    'use strict';

    angular
        .module('app.service.item', [])
        .factory('itemService', itemService);

    itemService.$inject = ['$http', 'store', '$q'];

    function itemService($http, store, $q) {
        var url = store.get('url') + '/api/items';
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

        function create(item) {
            var data = {
                name:        item.name,
                description: item.description,
                estimated:   item.estimated,
                actual:      item.actual,
                category_id: item.category,
                project_id:  store.get('project').id
            };
            return $http.post(url, data)
                .then(success)
                .catch(error);
        }

        function update(item) {
            var data = {
                name:        item.name,
                description: item.description,
                estimated:   item.estimated,
                actual:      item.actual,
                category_id: item.category.id,
                project_id:  store.get('project').id
            };
            return $http.put(url + '/' + item.id, data)
                .then(success)
                .catch(error);
        }

        function remove(item) {
            return $http.delete(url + '/' + item.id)
                .then(success)
                .catch(error);
        }

        function retrieveByCategory(category) {
            return $http.get(url + query('category_id', 'equals', category.id))
                .then(success)
                .catch(error);
        }

        function removeByCategory(category) {
            return $http.delete(url + query('category_id', 'equals', category.id))
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
