(function() {
    'use strict';

    var assert = require('chai').assert;

    describe('Array', function() {
        describe('#indexOf()', function() {
            it('should return -1 when the value is not present', function() {
                assert.equal(-1, [1,2,3].indexOf(5));
                assert.equal(-1, [1,2,3].indexOf(0));
            });
        });
    });

    // describe('PasswordController', function() {
    //   beforeEach(module('app'));
    //
    //   var $controller;
    //
    //   beforeEach(inject(function(_$controller_){
    //     // The injector unwraps the underscores (_) from around the parameter names when matching
    //     $controller = _$controller_;
    //   }));
    //
    //   describe('$scope.grade', function() {
    //     it('sets the strength to "strong" if the password length is >8 chars', function() {
    //       var $scope = {};
    //       var controller = $controller('PasswordController', { $scope: $scope });
    //       $scope.password = 'longerthaneightchars';
    //       $scope.grade();
    //       expect($scope.strength).toEqual('strong');
    //     });
    //   });
    // });
})();
