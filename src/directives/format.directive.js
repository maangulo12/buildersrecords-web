(function() {
    'use strict';

    /**
    * @desc formats an input number field with commas
    * @example <input ng-model="myModel" format="number"></input>
    */
    angular
        .module('app.directive.format', [])
        .directive('format', format);

    format.$inject = ['$filter'];

    function format($filter) {
        var directive = {
            restrict: 'A',
            require:  'ngModel',
            link:     linkFunc,
        };
        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            ctrl.$formatters.unshift(formatter);
            ctrl.$parsers.unshift(parser);

            function formatter(a) {
                return $filter(attr.format)(ctrl.$modelValue);
            }
            function parser(viewValue) {
                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                el.val($filter(attr.format)(plainNumber));
                return plainNumber;
            }
        }
    }
})();
