/**
 * @ngdoc service
 * @name categoryService
 * @description
 *
 * This is the service module for Category.
**/
(function() {
    'use strict';

    angular
        .module('app.service.category', [])
        .factory('categoryService', categoryService);

    categoryService.$inject = ['$http', 'store', '$q'];

    function categoryService($http, store, $q) {
        var url = store.get('url') + '/api/categories';
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

        function create(name) {
            var data = {
                name:       name,
                project_id: store.get('project').id
            };
            return $http.post(url, data)
                .then(success)
                .catch(error);
        }

        function update(category) {
            var data = {
                name:       category.name,
                project_id: store.get('project').id
            };
            return $http.put(url + '/' + category.id, data)
                .then(success)
                .catch(error);
        }

        function remove(category) {
            return $http.delete(url + '/' + category.id)
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
