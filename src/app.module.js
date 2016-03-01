(function() {
    'use strict';

    angular.module('app', [
        /* Vendor modules */
        'ngMessages',
        'ui.validate',
        'ui.router',
        'angular-jwt',
        'angular-storage',
        'smart-table',
        /* App directives */
        'app.directive.email-availability',
        'app.directive.format',
        'app.directive.page-select',
        'app.directive.username-availability',
        /* App services */
        'app.service.auth',
        'app.service.category',
        'app.service.chart',
        'app.service.draw',
        'app.service.expenditure',
        'app.service.fund',
        'app.service.item',
        'app.service.project',
        'app.service.stripe',
        'app.service.subcontractor',
        'app.service.user',
        'app.service.utility',
        /* App modules */
        'app.home',
        'app.login',
        'app.signup',
        'app.tutorial',
        'app.projects',
        'app.projects.overview',
        'app.projects.cost',
        'app.projects.funds',
        'app.projects.expenditures',
        'app.projects.subcontractors',
        'app.account',
        // 'app.account.billing'
    ]);
})();
