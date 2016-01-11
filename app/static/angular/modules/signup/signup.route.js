(function() {
    'use strict';

    angular
        .module('app.signup')
        .config(route);

    function route($stateProvider) {
        $stateProvider.state('signup', {
            url: '/signup',
            views: {
                'nav': {
                    templateUrl: 'static/angular/partials/navs/nav1.html'
                },
                'body': {
                    templateUrl:  'static/angular/modules/signup/signup.html',
                    controller:   'SignupController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
