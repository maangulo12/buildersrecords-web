(function() {
  'use strict';

  angular
    .module('app')
    .config(configurationBlock);

  configurationBlock.$inject = ['$urlRouterProvider', '$locationProvider', 'jwtInterceptorProvider', '$httpProvider'];

  function configurationBlock($urlRouterProvider, $locationProvider, jwtInterceptorProvider, $httpProvider) {
    // Route to home page if url is not found
    $urlRouterProvider.otherwise('/');
    // Turn on html5mode
    $locationProvider.html5Mode(true);
    // Add the JWT to the header of every request
    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('jwt');
    };
    $httpProvider.interceptors.push('jwtInterceptor');
  }
})();
