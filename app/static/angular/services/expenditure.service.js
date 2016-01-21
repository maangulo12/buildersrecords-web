(function() {
    'use strict';

    angular
        .module('app.service.expenditure', [])
        .factory('expenditureService', expenditureService);

    expenditureService.$inject = ['$http', 'store', '$filter'];

    function expenditureService($http, store, $filter) {
        var url = store.get('url') + '/api/expenditures';
        var service = {
            retrieveList:       retrieveList,
            create:             create,
            update:             update,
            remove:             remove,
            retrieveByCategory: retrieveByCategory,
            removeByCategory:   removeByCategory
        };
        return service;

        function retrieveList() {
            return $http.get(url + query('project_id', 'equals', store.get('project').id))
                .then(success)
                .catch(error);
        }

        function create(vm) {
            var data = {
                date:        $filter('date')(vm.date,'yyyy-MM-dd'),
                vendor:      vm.vendor,
                notes:       vm.notes,
                cost:        vm.cost,
                fund_id:     vm.fund.id,
                category_id: vm.item.category.id,
                item_id:     vm.item.id,
                project_id:  store.get('project').id
            };
            return $http.post(url, data)
                .then(success)
                .catch(error);
        }

        function update(vm) {
            var data = {
                date:        $filter('date')(vm.date,'yyyy-MM-dd'),
                vendor:      vm.vendor,
                notes:       vm.notes,
                cost:        vm.cost,
                fund_id:     vm.fund.id,
                category_id: vm.item.category.id,
                item_id:     vm.item.id,
                project_id:  store.get('project').id
            };
            return $http.put(url + '/' + store.get('expenditure').id, data)
                .then(success)
                .catch(error);
        }

        function remove(expenditureId) {
            return $http.delete(url + '/' + expenditureId)
                .then(success)
                .catch(error);
        }

        function retrieveByCategory() {
			return $http.get(url + query('category_id', 'equals', store.get('category').id))
                .then(success)
                .catch(error);
        }

        function removeByCategory() {
            return $http.delete(url + query('category_id', 'equals', store.get('category').id))
                .then(success)
                .catch(error);
        }
    }

    function success(response) {
        return response.data;
    }

    function error(response) {
        return response;
    }

    function query(name, op, val) {
        return '?q={"filters":[{"name":"' + name + '","op":"' + op + '","val":"' + val + '"}]}';
    }
})();
