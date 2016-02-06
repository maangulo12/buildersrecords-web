'use strict';

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        preprocessors: {
            'src/**/*.spec.js': ['browserify']
        },
        frameworks: [
            'browserify',
            'mocha'
        ],
        files: [
            'vendor/jquery/jquery-1.11.3.min.js',
            'vendor/bootstrap/bootstrap.min.js',
            'vendor/angularjs/1.4.5/angular.min.js',
            'vendor/angularjs/1.4.5/angular-mocks.js',
            'vendor/angularjs/1.4.5/angular-messages.min.js',
            'vendor/angular-ui/validate.min.js',
            'vendor/angular-ui/angular-ui-router.min.js',
            'vendor/angular-jwt/angular-jwt.min.js',
            'vendor/angular-storage/angular-storage.min.js',
            'vendor/smart-table/smart-table.min.js',
            'vendor/highcharts/highcharts.min.js',
            'src/app.module.js',
            'src/*.js',
            'src/**/*.module.js',
            'src/**/*.js'
        ],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-browserify',
            'karma-mocha'
        ]
    });
};
