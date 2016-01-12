(function() {
    'use strict';

    angular.module('app', [
        'ngMessages',
        'ui.validate',
        'ui.router',
        'angular-jwt',
        'angular-storage',
        'smart-table',

        'app.directives',
        'app.directive.email-availability',
        'app.directive.username-availability',

        'app.services',
        'app.service.auth',
        'app.service.mail',
        'app.service.projects',
        'app.service.stripe',
        'app.service.subscription',
        'app.service.user',

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
