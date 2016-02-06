(function() {
    'use strict';

    angular
        .module('app')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', '$state', 'store', 'jwtHelper', 'PUBLISHABLE_KEY'];

    function runBlock($rootScope, $state, store, jwtHelper, PUBLISHABLE_KEY) {
        // Set Stripe publishable key
        Stripe.setPublishableKey(PUBLISHABLE_KEY);
        // Restricts access to routes that require login
        $rootScope.$on('$stateChangeStart', change);
        // Change function
        function change(e, to) {
            if (to.data && to.data.requiresLogin) {
                if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
                    e.preventDefault();
                    $state.go('login');
                }
            }
        }
    }
})();
