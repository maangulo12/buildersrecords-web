(function() {
    'use strict';

    angular
        .module('app.login')
        .config(route);

    route.$inject = ['$stateProvider'];

    function route($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            views: {
                'nav': {
                    templateUrl: 'www/html/nav1.html'
                },
                'body': {
                    templateUrl:  'www/html/login.html',
                    controller:   'LoginController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
