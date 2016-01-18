(function() {
    'use strict';

    angular.module('app', [
        'ngMessages',
        'ui.validate',
        'ui.router',
        'angular-jwt',
        'angular-storage',
        'smart-table',
        'app.directive.email-availability',
        'app.directive.format',
        'app.directive.page-select',
        'app.directive.username-availability',
        'app.services',
        'app.service.auth',
        'app.service.category',
        'app.service.draw',
        'app.service.expenditure',
        'app.service.fund',
        'app.service.item',
        'app.service.projects',
        'app.service.stripe',
        'app.service.user',
        'app.service.utility',
        'app.home',
        'app.login',
        'app.signup',
        'app.tutorial',
        'app.projects',
        'app.projects.overview',
        'app.projects.budget',
        'app.projects.funds',
        'app.projects.expenditures',
        'app.projects.subcontractors',
        'app.account',
        'app.account.billing'
    ]);
})();
