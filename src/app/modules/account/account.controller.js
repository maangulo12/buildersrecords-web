(function() {
    'use strict';

    angular
        .module('app.account')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['$scope', 'User', 'userService'];

    function AccountController($scope, User, userService) {
        var vm = this;
        vm.account          = {};
        vm.account.email    = User.email;
        vm.account.username = User.username;

        $scope.updateAccount = function() {
            var btn = $('#update-account-button').button('loading');

            return updateAccount()
                .then(success)
                .catch(error);

            function updateAccount() {
                return userService.updateUser(vm.account);
            }
            function success(response) {
                vm.updateAccountSuccess = true;
                btn.button('reset');
            }
            function error() {
                $scope.accountForm.$invalid = true;
                vm.updateAccountError = true;
                btn.button('reset');
            }
        };

        // Needs work
        // Check if current password matches
        // Hash new password in the backend
        $scope.updatePassword = function() {
            var btn = $('#update-password-button').button('loading');

            return updatePassword()
                .then(success)
                .catch(error);

            function updatePassword() {
                return userService.updatePassword(vm.account.newPassword);
            }
            function success(response) {
                vm.updatePasswordSuccess = true;
                btn.button('reset');
            }
            function error(response) {
                $scope.passwordForm.$invalid = true;
                vm.updatePasswordError = true;
                btn.button('reset');
            }
        };
    }
})();
