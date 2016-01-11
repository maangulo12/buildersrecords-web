(function() {
    'use strict';

    /**
    * @desc checks if an email address already exists
    * @example <input email-availability></input>
    */
    angular
        .module('app.directive.email-availability', [])
        .directive('emailAvailability', emailAvailability);

    function emailAvailability($q, authService) {
        var directive = {
            restrict: 'A',
            require:  'ngModel',
            link:     linkFunc,
        };
        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            ctrl.$asyncValidators.emailAvailability = function(email) {
                return authService.checkEmail(email)
                    .then(responseHandler)
                    .catch(errorHandler);

                function responseHandler(response) {
                    ctrl.$setValidity('emailAvailability', true);
                    return response;
                }
                function errorHandler(response) {
                    ctrl.$setValidity('emailAvailability', false);
                    return $q.reject(response);
                }
            }
        }
    }
})();
