(function() {
    'use strict';

    angular
        .module('app.account.billing')
        .config(route);

    function route($stateProvider) {
        $stateProvider.state('billing', {
            url: '/account/billing',
            resolve: {
                User: function(userService, $q) {
                    return userService.retrieve()
                        .then(responseHandler)
                        .catch(errorHandler);

                    function responseHandler(response) {
                        return response.data;
                    }
                    function errorHandler(response) {
                        return $q.reject(response.data);
                    }
                }
            },
            views: {
                'nav': {
                    templateUrl: 'src/js/app/partials/navs/nav2.html',
                    controller: function($scope, User) {
                        $scope.username = User.username;
                    }
                },
                'body': {
                    templateUrl:  'src/js/app/modules/billing/billing.html',
                    controller:   'BillingController',
                    controllerAs: 'vm'
                }
            },
            data: {
                requiresLogin: true
            }
        });
    }
})();
