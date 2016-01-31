/**
 * @ngdoc service
 * @name subcontractorService
 * @description
 *
 * This is the service module for Subcontractor.
**/
(function() {
    'use strict';

    angular
        .module('app.service.subcontractor', [])
        .factory('subcontractorService', subcontractorService);

    subcontractorService.$inject = ['$http', 'store', '$q'];

    function subcontractorService($http, store, $q) {
        var url = store.get('url') + '/api/subcontractors';
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

        function create(subcontractor) {
            var data = {
                name:           subcontractor.name,
                company:        subcontractor.company,
                contact_number: subcontractor.contactNumber,
                project_id:     store.get('project').id
            };
            return $http.post(url, data)
                .then(success)
                .catch(error);
        }

        function update(subcontractor) {
            var data = {
                name:           subcontractor.name,
                company:        subcontractor.company,
                contact_number: subcontractor.contactNumber,
                project_id:     store.get('project').id
            };
            return $http.put(url + '/' + subcontractor.id, data)
                .then(success)
                .catch(error);
        }

        function remove(subcontractor) {
            return $http.delete(url + '/' + subcontractor.id)
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
