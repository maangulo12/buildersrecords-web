(function() {
    'use strict';

    angular
        .module('app.service.projects', [])
        .factory('projectsService', projectsService);

    projectsService.$inject = ['$http', 'store'];

    function projectsService($http, store) {
        var url = store.get('api_url') + '/api/projects';
        var service = {
            retrieveList: retrieveList,
            create:       create,
            update:       update,
            remove:       remove
        };
        return service;

        function retrieveList() {
            return $http.get(url + query('user_id', 'equals', store.get('user').id));
        }

        function create(vm) {
            var data = {
                name:         vm.name,
                address:      vm.address,
                city:         vm.city,
                state:        vm.state,
                zipcode:      vm.zipcode,
                home_sq:      vm.home_sq,
                project_type: vm.type,
                user_id:      store.get('user').id
            };
            return $http.post(url, data);
        }

        function update() {

        }

        function remove() {

        }
    }

    function query(name, op, val) {
        return '?q={"filters":[{"name":"' + name + '","op":"' + op + '","val":"' + val + '"}]}';
    }
})();
