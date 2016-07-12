(function() {
    'use strict';

    angular.module('app.projects', [
        /* Vendor modules */
        'ngMessages',
        'ui.router',
        'angular-storage',
        'smart-table',
        /* App directives */
        'app.directive.format',
        /* App services */
        'app.service.project',
        'app.service.utility'
    ]);
})();
