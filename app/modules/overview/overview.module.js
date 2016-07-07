(function() {
    'use strict';

    angular.module('app.projects.overview', [
        /* Vendor modules */
        'ngMessages',
        'ui.router',
        'angular-storage',
        'smart-table',
        /* App services */
        'app.service.category',
        'app.service.chart',
        'app.service.fund'
    ]);
})();
