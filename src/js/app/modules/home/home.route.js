(function() {
    'use strict';

    angular
        .module('app.home')
        .config(route);

    function route($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            views: {
                'nav': {
                    templateUrl: 'src/js/app/partials/navs/nav1.html'
                },
                'body': {
                    templateUrl:  'src/js/app/modules/home/home.html',
                    controller:   'HomeController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
