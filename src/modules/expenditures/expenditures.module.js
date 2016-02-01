(function() {
    'use strict';

    angular.module('app.projects.expenditures', [
        /* Vendor modules */
        'ngMessages',
        'ui.router',
        'angular-storage',
        'smart-table',
        /* App directives */
        'app.directive.format',
        'app.directive.page-select',
        /* App services */
        'app.service.expenditure',
        'app.service.fund',
        'app.service.item',
        'app.service.subcontractor'
    ]);
})();
