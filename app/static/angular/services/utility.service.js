(function() {
    'use strict';

    angular
        .module('app.service.utility', [])
        .factory('utilityService', utilityService);

    utilityService.$inject = ['$http', 'store'];

    function utilityService($http, store) {
        var url = store.get('api_url') + '/api/utility';
        var service = {
            verifyEmail:       verifyEmail,
            verifyUsername:    verifyUsername,
            parseUbuilditFile: parseUbuilditFile
        };
        return service;

        function verifyEmail(email) {
            return $http.post(url + '/email', { email : email });
        }

        function verifyUsername(username) {
            return $http.post(url + '/username', { username : username });
        }

        function parseUbuilditFile(vm, file) {
            var data = new FormData();
            data.append('file', file);
            data.append('name', vm.project.name);
            data.append('address', vm.project.address);
            data.append('city', vm.project.city);
            data.append('state', vm.project.state);
            data.append('zipcode', vm.project.zipcode);
            data.append('home_sq', vm.project.home_sq);
            data.append('project_type', vm.project.type);
            data.append('user_id', store.get('user').id);
            
            var config = {
                transformRequest: angular.identity,
                headers: { 'content-type': undefined }
            };
            return $http.post(url + '/ubuildit/parse', data, config);
        }
    }
})();
