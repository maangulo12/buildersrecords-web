(function() {
    'use strict';

    angular
        .module('app.projects.subcontractors')
        .config(route);

    function route($stateProvider) {
        $stateProvider.state('subcontractors', {
            url: '/projects/subcontractors',
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
                    templateUrl: 'static/angular/partials/navs/nav2.html',
                    controller: function($scope, User) {
                        $scope.username = User.username;
                    }
                },
                'body': {
                    templateUrl:  'static/angular/modules/subcontractors/subcontractors.html',
                    controller:   'SubcontractorsController',
                    controllerAs: 'vm'
                }
            },
            data: {
                requiresLogin: true
            }
        });
    }
})();
