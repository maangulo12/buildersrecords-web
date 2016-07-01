(function() {
  'use strict';

  angular
    .module('app')
    .run(runBlock);

  runBlock.$inject = ['$rootScope', '$state', 'store', 'jwtHelper'];

  function runBlock($rootScope, $state, store, jwtHelper) {
    // $stateChangeStart is fired when the state transition begins
    $rootScope.$on('$stateChangeStart', stateChangeStart);
    // Function: stateChangeStart(event, toState)
    function stateChangeStart(event, toState) {
      if (toState.data && toState.data.requiresLogin) {
        var token = store.get('jwt');
        if (!token || jwtHelper.isTokenExpired(token)) {
          event.preventDefault();
          $state.go('login');
        }
      }
    }
  }
})();
