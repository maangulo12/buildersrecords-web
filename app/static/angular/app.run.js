(function() {
    'use strict';

    angular
        .module('app')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', '$state', 'store', 'jwtHelper'];

    function runBlock($rootScope, $state, store, jwtHelper) {
        // CHANGES THESE FOR PRODUCTION DEPLOYMENT
        store.set('api_url', 'https://buildersrecords-api-staging.herokuapp.com');
        Stripe.setPublishableKey('pk_test_KY3H8e295UxwoHrrqHBobKRC');
        // Restricts access to routes that require login
        // Checks if the token is expired
        $rootScope.$on('$stateChangeStart', change);
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
