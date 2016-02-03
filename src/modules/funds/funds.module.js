(function() {
    'use strict';

    angular.module('app.projects.funds', [
        /* Vendor modules */
        'ngMessages',
        'ui.router',
        'angular-storage',
        'smart-table',
        /* App directives */
        'app.directive.format',
        /* App services */
        'app.service.draw',
        'app.service.fund'
    ]);
})();
