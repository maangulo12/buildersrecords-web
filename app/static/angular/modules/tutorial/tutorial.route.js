(function() {
    'use strict';

    angular
        .module('app.tutorial')
        .config(route);

    function route($stateProvider) {
        $stateProvider.state('tutorial', {
            url: '/tutorial',
            views: {
                'nav': {
                    templateUrl: 'static/angular/partials/navs/nav1.html'
                },
                'body': {
                    templateUrl:  'static/angular/modules/tutorial/tutorial.html',
                    controller:   'TutorialController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
