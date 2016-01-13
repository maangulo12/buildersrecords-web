(function() {
    'use strict';

    angular
        .module('app.account')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['$scope'];

    function AccountController($scope) {
        var vm = this;

		// init();
		//
	    // function init() {
	    //     $scope.account          = {};
	    //     $scope.account.email    = UserObj.email;
	    //     $scope.account.username = UserObj.username;
	    // }
		//
	    // $scope.updateAccount = function() {
	    //     // Change email has to change stripe
	    //     var btn = $('#update_account_button').button('loading');
	    //     User.update($scope.account).then(responseHandler, errorHandler);
	    //     function responseHandler(response) {
	    //         $scope.update_account_success = true;
	    //         btn.button('reset');
	    //     }
	    //     function errorHandler(response) {
	    //         $scope.account_form.$invalid = true;
	    //         $scope.update_account_error = true;
	    //         btn.button('reset');
	    //     }
	    // }
		//
	    // // Needs work
	    // $scope.updatePassword = function() {
	    //     // Check if current password matches
	    //     // Hash new password in the backend
	    //     var btn = $('#update-password-btn').button('loading');
	    //     User.updatePassword($scope.user.new_password).then(responseHandler, errorHandler);
	    //     function responseHandler(response) {
	    //         // $scope.update_password_success = true;
	    //         btn.button('reset');
	    //     }
	    //     function errorHandler(response) {
	    //         $scope.password_form.$invalid = true;
	    //         // $scope.update_password_error = true;
	    //         btn.button('reset');
	    //     }
	    // }
    }
})();
