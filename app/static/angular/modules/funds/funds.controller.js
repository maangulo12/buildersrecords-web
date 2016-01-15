(function() {
    'use strict';

    angular
        .module('app.projects.funds')
        .controller('FundsController', FundsController);

    FundsController.$inject = ['$scope', 'store', 'fundService'];

    function FundsController($scope, store, fundService) {
        var vm = this;
        vm.project = store.get('project');
        $scope.loan_question = [{ value: true, name: 'Yes' },
                                { value: false, name: 'No' }];
        getFunds();

	    $scope.clickedFund = function(fund) {
	        var index = vm.fundList.indexOf(fund);
	        if (index !== -1) {
	            store.set('fund', fund);
	            return true;
	        }
	        return false;
	    }

	    $scope.clickedDraw = function(draw) {
	        var index = store.get('fund').draws.indexOf(draw);
	        if (index !== -1) {
	            store.set('draw', draw);
	            return true;
	        }
	        return false;
	    }

	    $scope.clickedAllCheckbox = function() {
	        angular.forEach(store.get('fund').draws, function(draw) {
	            draw.selected = store.get('fund').checkboxAll;
	            store.get('fund').selected = draw.selected;
	        });
	    }
	    $scope.clickedSingleCheckbox = function(draw) {
	        if (draw.selected) {
	            store.get('fund').selected = true;
	        } else {
	            var is_selected = false;
	            angular.forEach(store.get('fund').draws, function(d) {
	                if (d.selected) {
	                    is_selected = true;
	                }
	            });
	            store.get('fund').selected = is_selected;
	        }
	    }

	    function getFunds() {
            return fundService.retrieve()
                .then(getSuccess)
                .catch(error);

            function getSuccess(response) {
                vm.fundList = response.data.objects;

	            angular.forEach(response.data.objects, function(fund) {
	                var totalExpenditure = 0;

	                angular.forEach(fund.expenditures, function(expenditure) {
	                    totalExpenditure += expenditure.cost;
	                });
	                fund.total_expenditure = totalExpenditure;

	                var totalDraw = 0;
	                angular.forEach(fund.draws, function(draw) {
	                    totalDraw += draw.amount;
	                });
	                fund.total_draw = totalDraw;

	                fund.spent = Math.round(totalExpenditure / fund.amount * 100);
	                fund.left  = Math.round((fund.amount - totalExpenditure) / fund.amount * 100);

	                fund.draw_received = Math.round(totalDraw / fund.amount * 100);
	                fund.draw_left     = Math.round((fund.amount - totalDraw) / fund.amount * 100);
	            });
            }
            function error(response) {
	            $scope.errorMsgGet = true;
            }
	    }

		//
	    // // ADD FUND functions
	    // $scope.showAddFundModal = function() {
	    //     $scope.addDisabled = false;
	    //     $scope.fund = {};
	    //     $scope.add_fund_form.$setPristine();
	    //     $('#add_fund_modal').modal('show');
	    // }
	    // $scope.addFund = function() {
	    //     $scope.addDisabled = true;
	    //     FundService.addFund($scope.fund).then(function(response) {
	    //         $('#add_fund_modal').modal('hide');
	    //         getFunds();
	    //     }, function(error) {
	    //         $scope.add_fund_form.$invalid = true;
	    //     });
	    // }
		//
	    // // DELETE FUND functions
	    // $scope.showDeleteFundModal = function() {
	    //     $scope.deleteDisabled = false;
	    //     $scope.error_msg_delete = false;
	    //     $('#delete_fund_modal').modal('show');
	    // }
	    // $scope.deleteFundAndDraws = function() {
	    //     $scope.deleteDisabled = true;
	    //     if (store.get('fund').draws == 0) {
	    //         deleteFund();
	    //     } else {
	    //         DrawService.deleteBulkDraws().then(function(response) {
	    //             deleteFund();
	    //         }, function(error) {
	    //             $scope.error_msg_delete = true;
	    //         });
	    //     }
	    // }
	    // function deleteFund() {
	    //     FundService.deleteFund().then(function(response) {
	    //         $('#delete_fund_modal').modal('hide');
	    //         getFunds();
	    //     }, function(error) {
	    //         $scope.error_msg_delete = true;
	    //     });
	    // }
		//
	    // // UPDATE FUND functions
	    // $scope.showEditFundModal = function() {
	    //     $scope.updateDisabled = false;
	    //     $scope.updated_fund        = {};
	    //     $scope.updated_fund.name   = store.get('fund').name;
	    //     $scope.updated_fund.loan   = store.get('fund').loan;
	    //     $scope.updated_fund.amount = store.get('fund').amount;
	    //     $scope.edit_fund_form.$setPristine();
	    //     $('#edit_fund_modal').modal('show');
	    // }
	    // $scope.updateFund = function() {
	    //     $scope.updateDisabled = true;
	    //     FundService.updateFund($scope.updated_fund).then(function(response) {
	    //         $('#edit_fund_modal').modal('hide');
	    //         getFunds();
	    //     }, function(error) {
	    //         $scope.edit_fund_form.$invalid = true;
	    //     });
	    // }
		//
	    // // ADD DRAW functions
	    // $scope.showAddDrawModal = function() {
	    //     $scope.addDrawDisabled = false;
	    //     $scope.draw = {};
	    //     $scope.draw.date = new Date();
	    //     $scope.add_draw_form.$setPristine();
	    //     $('#add_draw_modal').modal('show');
	    // }
	    // $scope.addDraw = function() {
	    //     $scope.addDrawDisabled = true;
	    //     DrawService.addDraw($scope.draw).then(function(response) {
	    //         $('#add_draw_modal').modal('hide');
	    //         getFunds();
	    //     }, function(error) {
	    //         $scope.add_draw_form.$invalid = true;
	    //     });
	    // }
		//
	    // // DELETE DRAWS functions
	    // $scope.showDeleteDrawsModal = function() {
	    //     $scope.deleteDrawDisabled = false;
	    //     if (store.get('fund').selected) {
	    //         $scope.error_msg_delete_draws = false;
	    //         $('#delete_draws_modal').modal('show');
	    //     }
	    // }
	    // $scope.deleteDraws = function() {
	    //     $scope.deleteDrawDisabled = true;
	    //     angular.forEach(store.get('fund').draws, function(draw) {
	    //         if (draw.selected) {
	    //             DrawService.deleteDraw(draw.id).then(function(response) {
	    //                 $('#delete_draws_modal').modal('hide');
	    //                 getFunds();
	    //                 store.get('fund').selected = false;
	    //             }, function(error) {
	    //                 $scope.error_msg_delete_draws = 'Could not delete your draw(s).';
	    //             });
	    //         }
	    //     });
	    // }
		//
	    // // UPDATE DRAW functions
	    // $scope.showEditDrawModal = function() {
	    //     $scope.updateDrawDisabled = false;
	    //     $scope.updated_draw = {};
	    //     $scope.updated_draw.date = new Date(store.get('draw').date);
	    //     $scope.updated_draw.amount = store.get('draw').amount;
	    //     $scope.edit_draw_form.$setPristine();
	    //     $('#edit_draw_modal').modal('show');
	    // }
	    // $scope.updateDraw = function() {
	    //     $scope.updateDrawDisabled = true;
	    //     DrawService.updateDraw($scope.updated_draw).then(function(response) {
	    //         $('#edit_draw_modal').modal('hide');
	    //         getFunds();
	    //     }, function(error) {
	    //         $scope.edit_draw_form.$invalid = true;
	    //     });
	    // }
    }
})();
