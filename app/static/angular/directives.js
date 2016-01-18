var app = angular.module('app.directives', []);

// DIRECTIVE: format='number'
// Formats input field to allow numbers only
app.directive('format', function ($filter) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            if (!ctrl) {
                return;
            }
            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });
            ctrl.$parsers.unshift(function (viewValue) {
                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                element.val($filter(attrs.format)(plainNumber));
                return plainNumber;
            });
        }
    }
});
