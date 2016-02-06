(function() {
    'use strict';

    angular.module('app.projects.cost', [
        /* Vendor modules */
        'ngMessages',
        'ui.router',
        'angular-storage',
        'smart-table',
        /* App directives */
        'app.directive.format',
        /* App services */
        'app.service.category',
        'app.service.expenditure',
        'app.service.item'
    ]);
})();
