(function() {
    'use strict';

    /**
    * @desc checks if a username already exists
    * @example <input ng-model="myModel" username-availability></input>
    */
    angular
        .module('app.directive.username-availability', [])
        .directive('usernameAvailability', usernameAvailability);

    usernameAvailability.$inject = ['$q', 'utilityService'];

    function usernameAvailability($q, utilityService) {
        var directive = {
            restrict: 'A',
            require:  'ngModel',
            link:     linkFunc,
        };
        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            ctrl.$asyncValidators.usernameAvailability = function(username) {
                return utilityService.verifyUsername(username)
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
