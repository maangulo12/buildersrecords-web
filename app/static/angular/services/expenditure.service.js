(function() {
    'use strict';

    angular
        .module('app.service.expenditure', [])
        .factory('expenditureService', expenditureService);

    expenditureService.$inject = ['$http', 'store', '$q', '$filter'];

    function expenditureService($http, store, $q, $filter) {
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

        function create(expenditure) {
            var data = {
                date:        $filter('date')(expenditure.date,'yyyy-MM-dd'),
                vendor:      expenditure.vendor,
                notes:       expenditure.notes,
                cost:        expenditure.cost,
                fund_id:     expenditure.fund.id,
                category_id: expenditure.item.category.id,
                item_id:     expenditure.item.id,
                project_id:  store.get('project').id
            };
            return $http.post(url, data)
                .then(success)
                .catch(error);
        }

        function update(expenditure) {
            var data = {
                date:        $filter('date')(expenditure.date,'yyyy-MM-dd'),
                vendor:      expenditure.vendor,
                notes:       expenditure.notes,
                cost:        expenditure.cost,
                fund_id:     expenditure.fund.id,
                category_id: expenditure.item.category.id,
                item_id:     expenditure.item.id,
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
