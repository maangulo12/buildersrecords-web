(function() {
    'use strict';

    angular
        .module('app.service.subcontractor', [])
        .factory('subcontractorService', subcontractorService);

    subcontractorService.$inject = ['$http', 'store'];

    function subcontractorService($http, store) {
        var url = store.get('api_url') + '/api/subcontractors';
        var service = {
            retrieveList: retrieveList
        };
        return service;

        function retrieveList() {
            return $http.get(url + query('project_id', 'equals', store.get('project').id))
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
