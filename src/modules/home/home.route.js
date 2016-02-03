(function() {
    'use strict';

    angular
        .module('app.home')
        .config(route);

    route.$inject = ['$stateProvider'];

    function route($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            views: {
                'nav': {
                    templateUrl: 'www/html/nav1.html'
                },
                'body': {
                    templateUrl:  'www/html/home.html',
                    controller:   'HomeController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
