(function() {
    'use strict';

    angular
        .module('app.account.billing')
        .controller('BillingController', BillingController);

    BillingController.$inject = ['$scope', 'stripeService'];

    function BillingController($scope, stripeService) {
        var vm = this;
        getSubscription();

        function getSubscription() {
            return stripeService.retrieveSubscription()
                .then(showSubscription)
                .catch(error);

            function showSubscription(response) {
                vm.card = {};
                vm.card.name  = response.data.sources.data[0].name;
                vm.card.last4 = response.data.sources.data[0].last4;
                vm.card.brand = response.data.sources.data[0].brand;
                vm.plan       = response.data.subscriptions.data[0].plan.id;
            }
            function error(response) {
                vm.errorMsgGet = true;
            }
        }

        $scope.showUpdateCardModal = function() {
            vm.updatedCard = {};
            $scope.editCardForm.$setPristine();
            $('#edit-card-modal').modal('show');
        };
        $scope.updateCard = function() {
            var btn = $('#update-card-button').button('loading');
            var valid = stripeService.validateCard(vm.updatedCard);

            if (valid) {
                createToken()
                    .then(updateSubscription)
                    .then(updateSuccess)
                    .catch(error);
            } else {
                error();
            }

            function createToken() {
                return stripeService.createCardToken(vm.updatedCard);
            }
            function updateSubscription(response) {
                return stripeService.updateSubscription(response.id);
            }
            function updateSuccess(response) {
                $('#edit-card-modal').modal('hide');
                btn.button('reset');
                getSubscription();
            }
            function error() {
                $scope.editCardForm.$invalid = true;
                btn.button('reset');
            }
        };
    }
})();
