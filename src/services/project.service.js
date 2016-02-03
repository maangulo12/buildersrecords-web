/**
 * @ngdoc service
 * @name projectService
 * @description
 *
 * This is the service module for Project.
**/
(function() {
    'use strict';

    angular
        .module('app.service.project', [])
        .factory('projectService', projectService);

    projectService.$inject = ['$http', 'store', '$q'];

    function projectService($http, store, $q) {
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

        function create(project) {
            var data = {
                name:         project.name,
                address:      project.address,
                city:         project.city,
                state:        project.state,
                zipcode:      project.zipcode,
                home_sq:      project.homeSq,
                project_type: project.type,
                user_id:      store.get('user').id
            };
            return $http.post(url, data)
                .then(success)
                .catch(error);
        }

        function update(project) {
            var data = {
                name:    project.name,
                address: project.address,
                city:    project.city,
                state:   project.state,
                zipcode: project.zipcode,
                home_sq: project.homeSq,
                user_id: store.get('user').id
            };
            return $http.put(url + '/' + project.id, data)
                .then(success)
                .catch(error);
        }

        function remove(project) {
            return $http.delete(url + '/' + project.id)
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
