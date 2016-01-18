(function() {
    'use strict';

    angular
        .module('app.service.expenditure', [])
        .factory('expenditureService', expenditureService);

    expenditureService.$inject = ['$http', 'store'];

    function expenditureService($http, store) {
        var url = store.get('api_url') + '/api/expenditures';
        var service = {
            retrieveByCategory: retrieveByCategory,
            removeByCategory:   removeByCategory
        };
        return service;

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