(function() {
    'use strict';

    angular
        .module('app.service.subcontractor', [])
        .factory('subcontractorService', subcontractorService);

    subcontractorService.$inject = ['$http', 'store'];

    function subcontractorService($http, store) {
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

        function create(vm) {
            var data = {
                name:           vm.name,
                company:        vm.company,
                contact_number: vm.contactNumber,
                project_id:     store.get('project').id
            };
            return $http.post(url, data)
                .then(success)
                .catch(error);
        }

        function update(vm) {
            var data = {
                name:           vm.name,
                company:        vm.company,
                contact_number: vm.contactNumber,
                project_id:     store.get('project').id
            };
            return $http.put(url + '/' + store.get('subcontractor').id, data)
                .then(success)
                .catch(error);
        }

        function remove(subcontractorId) {
            return $http.delete(url + '/' + subcontractorId)
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
