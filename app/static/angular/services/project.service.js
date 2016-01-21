(function() {
    'use strict';

    angular
        .module('app.service.project', [])
        .factory('projectService', projectService);

    projectService.$inject = ['$http', 'store'];

    function projectService($http, store) {
        var url = store.get('url') + '/api/projects';
        var service = {
            retrieveList: retrieveList,
            create:       create,
            update:       update,
            remove:       remove
        };
        return service;

        function retrieveList() {
            return $http.get(url + query('user_id', 'equals', store.get('user').id))
                .then(success)
                .catch(error);
        }

        function create(vm) {
            var data = {
                name:         vm.name,
                address:      vm.address,
                city:         vm.city,
                state:        vm.state,
                zipcode:      vm.zipcode,
                home_sq:      vm.homeSq,
                project_type: vm.type,
                user_id:      store.get('user').id
            };
            return $http.post(url, data)
                .then(success)
                .catch(error);
        }

        function update(vm) {
            var data = {
                name:    vm.name,
                address: vm.address,
                city:    vm.city,
                state:   vm.state,
                zipcode: vm.zipcode,
                home_sq: vm.homeSq,
                user_id: store.get('user').id
            };
            return $http.put(url + '/' + store.get('project').id, data)
                .then(success)
                .catch(error);
        }

        function remove() {
            return $http.delete(url + '/' + store.get('project').id)
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
