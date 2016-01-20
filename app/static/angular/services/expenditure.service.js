(function() {
    'use strict';

    angular
        .module('app.service.expenditure', [])
        .factory('expenditureService', expenditureService);

    expenditureService.$inject = ['$http', 'store'];

    function expenditureService($http, store) {
        var url = store.get('api_url') + '/api/expenditures';
        var service = {
            retrieveList:       retrieveList,
            retrieveByCategory: retrieveByCategory,
            removeByCategory:   removeByCategory
        };
        return service;

        function retrieveList() {
            return $http.get(url + query('project_id', 'equals', store.get('project').id))
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
