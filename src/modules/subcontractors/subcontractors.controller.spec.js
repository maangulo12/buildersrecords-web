(function() {
    'use strict';

    var assert = require('chai').assert;

    // Testing purposes
    describe('Array', function(){
        describe('#indexOf()', function(){
            it('should return -1 when the value is not present', function(){
                assert.equal(-1, [1,2,3].indexOf(5));
                assert.equal(-1, [1,2,3].indexOf(0));
            });
        });
    });

    describe('SubcontractorsController Test', function() {
        it('should get Subcontractors', function() {
            // TODO
        });

        it('should add Subcontractor', function() {
            // TODO
        });

        it('should delete many Subcontractors', function() {
            // TODO
        });

        it('should delete Subcontractor', function() {
            // TODO
        });

        it('should update Subcontractor', function() {
            // TODO
        });
    });
})();
