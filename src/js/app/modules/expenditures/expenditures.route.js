(function() {
    'use strict';

    angular
        .module('app.projects.expenditures')
        .config(route);

    function route($stateProvider) {
        $stateProvider.state('expenditures', {
            url: '/projects/expenditures',
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
                    templateUrl:  'src/js/app/modules/expenditures/expenditures.html',
                    controller:   'ExpendituresController',
                    controllerAs: 'vm'
                }
            },
            data: {
                requiresLogin: true
            }
        });
    }
})();
