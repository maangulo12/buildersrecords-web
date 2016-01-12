(function() {
    'use strict';

    angular
        .module('app.service.mail', [])
        .factory('mailService', mailService);

    mailService.$inject = ['$http', 'store'];

    function mailService($http, store) {
        var url = store.get('api_url') + '/api/mail';
        var service = {
            sendRegistration: sendRegistration
        };
        return service;

        function sendRegistration(vm) {
            var data = {
                email:    vm.email,
                username: vm.username
            };
            return $http.post(url + '/registration', data);
        }
    }
})();
