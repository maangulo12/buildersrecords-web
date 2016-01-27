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
                    templateUrl: 'src/js/app/partials/navs/nav1.html'
                },
                'body': {
                    templateUrl:  'src/js/app/modules/signup/signup.html',
                    controller:   'SignupController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
