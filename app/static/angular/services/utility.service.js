(function() {
    'use strict';

    angular
        .module('app.service.utility', [])
        .factory('utilityService', utilityService);

    utilityService.$inject = ['$http', 'store'];

    function utilityService($http, store) {
        var url = store.get('api_url') + '/api/utility';
        var service = {
            verifyEmail:    verifyEmail,
            verifyUsername: verifyUsername
        };
        return service;

        function verifyEmail(email) {
            return $http.post(url + '/email', { email : email });
        }

        function verifyUsername(username) {
            return $http.post(url + '/username', { username : username });
        }
    }
})();
