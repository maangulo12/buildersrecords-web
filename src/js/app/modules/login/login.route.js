(function() {
    'use strict';

    angular
        .module('app.login')
        .config(route);

    function route($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            views: {
                'nav': {
                    templateUrl: 'src/js/app/partials/navs/nav1.html'
                },
                'body': {
                    templateUrl:  'src/js/app/modules/login/login.html',
                    controller:   'LoginController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
