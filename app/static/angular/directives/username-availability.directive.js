(function() {
    'use strict';

    /**
    * @desc checks if a username already exists
    * @example <input username-availability></input>
    */
    angular
        .module('app.directive.username-availability', [])
        .directive('usernameAvailability', usernameAvailability);

    function usernameAvailability($q, authService) {
        var directive = {
            restrict: 'A',
            require:  'ngModel',
            link:     linkFunc,
        };
        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            ctrl.$asyncValidators.usernameAvailability = function(username) {
                return authService.checkUsername(username)
                    .then(responseHandler)
                    .catch(errorHandler);

                function responseHandler(response) {
                    ctrl.$setValidity('usernameAvailability', true);
                    return response;
                }
                function errorHandler(response) {
                    ctrl.$setValidity('usernameAvailability', false);
                    return $q.reject(response);
                }
            }
        }
    }
})();
