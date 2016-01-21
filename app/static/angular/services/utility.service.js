(function() {
    'use strict';

    angular
        .module('app.service.utility', [])
        .factory('utilityService', utilityService);

    utilityService.$inject = ['$http', 'store', '$q'];

    function utilityService($http, store, $q) {
        var url = store.get('url') + '/api/utility';
        var service = {
            verifyEmail:       verifyEmail,
            verifyUsername:    verifyUsername,
            parseUbuilditFile: parseUbuilditFile
        };
        return service;

        function verifyEmail(email) {
            return $http.post(url + '/email', { email : email })
                .then(success)
                .catch(error);
        }

        function verifyUsername(username) {
            return $http.post(url + '/username', { username : username })
                .then(success)
                .catch(error);
        }

        function parseUbuilditFile(vm, file) {
            var data = new FormData();
            data.append('file', file);
            data.append('name', vm.name);
            data.append('address', vm.address);
            data.append('city', vm.city);
            data.append('state', vm.state);
            data.append('zipcode', vm.zipcode);
            data.append('home_sq', vm.homeSq);
            data.append('project_type', vm.type);
            data.append('user_id', store.get('user').id);

            var config = {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            };
            return $http.post(url + '/ubuildit', data, config)
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
    }
})();
