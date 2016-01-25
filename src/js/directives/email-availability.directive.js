(function() {
    'use strict';

    /**
    * @desc checks if an email address already exists
    * @example <input ng-model="myModel" email-availability></input>
    */
    angular
        .module('app.directive.email-availability', [])
        .directive('emailAvailability', emailAvailability);

    emailAvailability.$inject = ['$q', 'utilityService'];

    function emailAvailability($q, utilityService) {
        var directive = {
            restrict: 'A',
            require:  'ngModel',
            link:     linkFunc,
        };
        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            ctrl.$asyncValidators.emailAvailability = function(email) {
                return verifyEmail(email)
                    .then(success)
                    .catch(error);

                function verifyEmail(email) {
                    return utilityService.verifyEmail(email);
                }
                function success(response) {
                    ctrl.$setValidity('emailAvailability', true);
                    return $q.resolve(response);
                }
                function error(response) {
                    ctrl.$setValidity('emailAvailability', false);
                    return $q.reject(response);
                }
            };
        }
    }
})();
