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

        function create() {

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
