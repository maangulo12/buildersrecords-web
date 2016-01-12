(function() {
    'use strict';

    angular
        .module('app.account.billing')
        .controller('BillingController', BillingController);

    BillingController.$inject = ['$scope'];

    function BillingController($scope) {
        var vm = this;

		// getSubscription();
		//
	    // function getSubscription() {
	    //     Subscription.retrieve().then(responseHandler, errorHandler);
	    //     function responseHandler(response) {
	    //         $scope.user = {};
	    //         $scope.user.card = {};
	    //         $scope.user.card.name  = response.data.sources.data[0].name;
	    //         $scope.user.card.last4 = response.data.sources.data[0].last4;
	    //         $scope.user.card.brand = response.data.sources.data[0].brand;
	    //         $scope.user.plan       = response.data.subscriptions.data[0].plan.id;
	    //     }
	    //     function errorHandler(response) {
	    //         $scope.error_msg_get = true;
	    //     }
	    // }
		//
	    // $scope.showUpdateCardModal = function() {
	    //     $scope.updated_card = {};
	    //     $scope.updated_card_form.$setPristine();
	    //     $('#update_card_modal').modal('show');
	    // }
	    // $scope.updateCard = function() {
	    //     var btn = $('#update_card_button').button('loading');
	    //     var val_card = Stripe.card.validateCardNumber($scope.updated_card.card_number);
	    //     var val_exp  = Stripe.card.validateExpiry($scope.updated_card.exp_month, $scope.updated_card.exp_year);
	    //     var val_cvc  = Stripe.card.validateCVC($scope.updated_card.cvc);
		//
	    //     if (val_card && val_exp && val_cvc) {
	    //         var data = {
	    //             number:    $scope.updated_card.card_number,
	    //             cvc:       $scope.updated_card.cvc,
	    //             exp_month: $scope.updated_card.exp_month,
	    //             exp_year:  $scope.updated_card.exp_year,
	    //             name:      $scope.updated_card.card_name.toUpperCase()
	    //         };
	    //         // Remember to change this to live key
	    //         Stripe.setPublishableKey('pk_test_KY3H8e295UxwoHrrqHBobKRC');
	    //         Stripe.card.createToken(data, stripeResponseHandler);
	    //     } else {
	    //         error();
	    //     }
	    //     function stripeResponseHandler(status, response) {
	    //         if (response.error) {
	    //             error();
	    //         } else {
	    //             Subscription.update(response.id).then(responseHandler, errorHandler);
	    //         }
	    //     }
	    //     function responseHandler(response) {
	    //         $('#update_card_modal').modal('hide');
	    //         getSubscription();
	    //     }
	    //     function errorHandler(response) {
	    //         error();
	    //     }
	    //     function error() {
	    //         $scope.updated_card_form.$invalid = true;
	    //         btn.button('reset');
	    //     }
	    // }
    }
})();
