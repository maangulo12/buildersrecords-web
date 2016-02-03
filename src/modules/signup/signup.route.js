(function() {
    'use strict';

    angular
        .module('app.signup')
        .config(route);

    route.$inject = ['$stateProvider'];

    function route($stateProvider) {
        $stateProvider.state('signup', {
            url: '/signup',
            views: {
                'nav': {
                    templateUrl: 'www/html/nav1.html'
                },
                'body': {
                    templateUrl:  'www/html/signup.html',
                    controller:   'SignupController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
