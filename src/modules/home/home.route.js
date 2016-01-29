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
                    templateUrl: 'www/templates/nav1.html'
                },
                'body': {
                    templateUrl:  'www/templates/home.html',
                    controller:   'HomeController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
