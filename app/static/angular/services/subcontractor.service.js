(function() {
    'use strict';

    angular
        .module('app.service.subcontractor', [])
        .factory('subcontractorService', subcontractorService);

    subcontractorService.$inject = ['$http', 'store'];

    function subcontractorService($http, store) {
        var url = store.get('api_url') + '/api/subcontractors';
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

        function create(vm) {
            var data = {
                name:           vm.name,
                company:        vm.company,
                contact_number: vm.contactNumber,
                project_id:     store.get('project').id
            };
            return $http.post(url, data)
                .then(successHandler)
                .catch(errorHandler);
        }

        function update(vm) {
            var data = {
                name:           vm.name,
                company:        vm.company,
                contact_number: vm.contactNumber,
                project_id:     store.get('project').id
            };
            return $http.put(url, data)
                .then(successHandler)
                .catch(errorHandler);
        }

        function remove(subcontractorId) {
            return $http.delete(url + '/' + subcontractorId)
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
