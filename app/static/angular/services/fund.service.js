(function() {
    'use strict';

    angular
        .module('app.service.fund', [])
        .factory('fundService', fundService);

    fundService.$inject = ['$http', 'store'];

    function fundService($http, store) {
        var url = store.get('api_url') + '/api/funds';
        var service = {
            retrieveList: retrieveList,
            create:   create,
            update:   update,
            remove:   remove
        };
        return service;

        function retrieveList() {
			return $http.get(url + query('project_id', 'equals', store.get('project').id));
        }

        function create(vm) {
            var data = {
                name:       vm.name,
                loan:       vm.loan,
                amount:     vm.amount,
                project_id: store.get('project').id
            };
            return $http.post(url, data);
        }

        function update(vm) {
            var data = {
                name:       vm.name,
                amount:     vm.amount,
                project_id: store.get('project').id
            };
            return $http.put(url + '/' + store.get('fund').id, data);
        }

        function remove() {
            return $http.delete(url + '/' + store.get('fund').id);
        }
    }

    function query(name, op, val) {
        return '?q={"filters":[{"name":"' + name + '","op":"' + op + '","val":"' + val + '"}]}';
    }
})();