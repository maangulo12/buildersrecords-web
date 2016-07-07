(function() {
    'use strict';

    /**
    * @desc Smart-table custom pagination
    * @example <page-select></page-select>
    */
    angular
        .module('app.directive.page-select', [])
        .directive('pageSelect', pageSelect);

    function pageSelect() {
        var directive = {
            restrict: 'E',
            template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
            link:     linkFunc,
        };
        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            scope.$watch('currentPage', function(c) {
                scope.inputPage = c;
            });
        }
    }
})();
