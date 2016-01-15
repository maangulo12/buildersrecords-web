(function() {
    'use strict';

    angular
        .module('app.service.category', [])
        .factory('categoryService', categoryService);

    categoryService.$inject = ['$http', 'store'];

    function categoryService($http, store) {
        var url = store.get('api_url') + '/api/categories';
        var service = {
            retrieve: retrieve
        };
        return service;

        function retrieve() {
			return $http.get(url + query('project_id', 'equals', store.get('project').id));
        }
    }

    function query(name, op, val) {
        return '?q={"filters":[{"name":"' + name + '","op":"' + op + '","val":"' + val + '"}]}';
    }
})();
