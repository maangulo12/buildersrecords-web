(function() {
    'use strict';

    angular
        .module('app.service.category', [])
        .factory('categoryService', categoryService);

    categoryService.$inject = ['$http', 'store'];

    function categoryService($http, store) {
        var url = store.get('api_url') + '/api/categories';
        var service = {
            retrieveList: retrieveList,
            create:       create,
            update:       update,
            remove:       remove
        };
        return service;

        function retrieveList() {
			return $http.get(url + query('project_id', 'equals', store.get('project').id))
                .then(successHandler)
                .catch(errorHandler);
        }

        function create(name) {
            var data = {
                name:       name,
                project_id: store.get('project').id
            };
            return $http.post(url, data)
                .then(successHandler)
                .catch(errorHandler);
        }

        function update(name) {
            var data = {
                name:       name,
                project_id: store.get('project').id
            };
            return $http.put(url + '/' + store.get('category').id, data)
                .then(successHandler)
                .catch(errorHandler);
        }

        function remove() {
            return $http.delete(url + '/' + store.get('category').id)
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
