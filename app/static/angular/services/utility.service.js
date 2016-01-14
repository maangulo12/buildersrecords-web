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
            data.append('name', vm.name);
            data.append('address', vm.address);
            data.append('city', vm.city);
            data.append('state', vm.state);
            data.append('zipcode', vm.zipcode);
            data.append('home_sq', vm.home_sq);
            data.append('project_type', vm.type);
            data.append('user_id', store.get('user').id);

            var config = {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            };
            return $http.post(url + '/ubuildit', data, config);
        }
    }
})();
