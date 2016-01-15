(function() {
    'use strict';

    angular
        .module('app.service.fund', [])
        .factory('fundService', fundService);

    fundService.$inject = ['$http', 'store'];

    function fundService($http, store) {
        var url = store.get('api_url') + '/api/funds';
        var service = {
            retrieve: retrieve
        };
        return service;

        function retrieve() {
			return $http.get(url + query('project_id', 'equals', store.get('project').id));
        }
    }

    function query(name, op, val) {
        return '?q={"filters":[{"name":"' + name + '","op":"' + op + '","val":"' + val + '"}]}';
    }
})();
