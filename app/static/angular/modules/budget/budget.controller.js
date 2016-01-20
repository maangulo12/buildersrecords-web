(function() {
    'use strict';

    angular
        .module('app.projects.budget')
        .controller('BudgetController', BudgetController);

    BudgetController.$inject = ['$scope', 'store', 'categoryService', 'itemService', 'expenditureService'];

    function BudgetController($scope, store, categoryService, itemService, expenditureService) {
        var vm = this;
        vm.project = store.get('project');
        updateCategories();

	    function updateCategories() {
            return getCategories()
                .then(populateTable)
                .catch(error);

            function getCategories() {
                return categoryService.retrieveList()
                    .then(getSuccess);

                function getSuccess(data) {
                    vm.categoryList = data.objects;
                    return vm.categoryList;
                }
            }
            function populateTable() {
	            var grandTotalEstimated = 0;
	            var grandTotalActual    = 0;

	            angular.forEach(vm.categoryList, function(category) {
	                var totalEstimated = 0;
	                var totalActual    = 0;
	                angular.forEach(category.items, function(item) {
	                    totalEstimated += item.estimated;
	                    totalActual    += item.actual;
	                });
                    category.totalEstimated = totalEstimated;
                    category.totalActual    = totalActual;
                    grandTotalEstimated += totalEstimated;
                    grandTotalActual    += totalActual;
	            });
	            vm.grandTotalEstimated = grandTotalEstimated;
	            vm.grandTotalActual    = grandTotalActual;
            }
            function error(response) {
                vm.errorMsgGet = true;
            }
	    }

	    $scope.clickedItem = function(item) {
	        var index = store.get('category').items.indexOf(item);
	        if (index !== -1) {
	            store.set('item', item);
	            return true;
	        }
	        return false;
	    }

	    $scope.clickedSingleCheckbox = function(category, item) {
	        if (item.selected) {
	            vm.selected = true;
	        } else {
	            var isSelected = false;
	            angular.forEach(category.items, function(e) {
	                if (e.selected) {
	                    isSelected = true;
	                }
	            });
	            vm.selected = isSelected;
	        }
	    }

	    $scope.clickedCategory = function(category) {
	        var index = vm.categoryList.indexOf(category);
	        if (index !== -1) {
	            store.set('category', category);
	            return true;
	        }
	        return false;
	    }

	    $scope.showAddItemModal = function() {
            vm.item           = {};
            vm.item.estimated = 0;
            vm.item.actual    = 0;
	        $scope.addItemForm.$setPristine();
	        $('#add-item-modal').modal('show');
	    }
	    $scope.addItem = function() {
            var btn = $('#add-item-button').button('loading');

	        if (vm.item.newCategory) {
                addCategory()
                    .then(setNewCategory)
                    .then(addItem)
                    .then(addSuccess)
                    .catch(error);
	        } else {
	            addItem()
                    .then(addSuccess)
                    .catch(error);
	        }

            function addCategory() {
                return categoryService.create(vm.item.newCategory);
            }
            function setNewCategory(data) {
                vm.item.category = data.id;
            }
            function addItem() {
                return itemService.create(vm.item);
            }
            function addSuccess() {
                $('#add-item-modal').modal('hide');
                btn.button('reset');
                updateCategories();
            }
            function error() {
                $scope.addItemForm.$invalid = true;
                btn.button('reset');
            }
	    }

	    $scope.showDeleteItemsModal = function() {
	        if (!$('#delete-button').hasClass('disabled')) {
	            vm.errorMsgDeleteItems = false;
	            $('#delete-items-modal').modal('show');
	        }
	    }
	    $scope.deleteItems = function() {
            var btn = $('#delete-items-button').button('loading');

	        angular.forEach(vm.categoryList, function(category) {
	            angular.forEach(category.items, function(item) {
	                if (item.selected) {
                        deleteItem(item.id)
                            .then(deleteSuccess)
                            .catch(error);
	                }
	            });
	        });

            function deleteItem(itemId) {
                return itemService.remove(itemId);
            }
            function deleteSuccess() {
                $('#delete-items-modal').modal('hide');
                btn.button('reset');
                vm.selected = false;
                updateCategories();
            }
            function error() {
                vm.errorMsgDeleteItems = true;
                btn.button('reset');
            }
	    }

	    $scope.showDeleteItemModal = function() {
	        vm.errorMsgDeleteItem = false;
	        $('#delete-item-modal').modal('show');
	    }
	    $scope.deleteItem = function() {
            var btn = $('#delete-item-button').button('loading');

            deleteItem()
                .then(deleteSuccess)
                .catch(error);

            function deleteItem() {
                return itemService.remove(store.get('item').id);
            }
            function deleteSuccess() {
                $('#delete-item-modal').modal('hide');
                btn.button('reset');
                updateCategories();
            }
            function error() {
                vm.errorMsgDeleteItem = true;
                btn.button('reset');
            }
	    }

	    $scope.showEditItemModal = function() {
	        vm.updatedItem             = {};
	        vm.updatedItem.category    = {
	            id:   store.get('category').id,
	            name: store.get('category').name
	        };
	        vm.updatedItem.name        = store.get('item').name;
	        vm.updatedItem.description = store.get('item').description;
	        vm.updatedItem.estimated   = store.get('item').estimated;
	        vm.updatedItem.actual      = store.get('item').actual;
	        $scope.editItemForm.$setPristine();
	        $('#edit-item-modal').modal('show');
	    }
	    $scope.updateItem = function() {
            var btn = $('#update-item-button').button('loading');

            updateItem()
                .then(updateSuccess)
                .catch(error);

            function updateItem() {
                return itemService.update(vm.updatedItem);
            }
            function updateSuccess() {
                $('#edit-item-modal').modal('hide');
                btn.button('reset');
                updateCategories();
            }
            function error() {
	            $scope.editItemForm.$invalid = true;
                btn.button('reset');
            }
	    }

	    $scope.showDeleteCategoryModal = function() {
	        vm.errorMsgDeleteCategory = false;
	        $('#delete-category-modal').modal('show');
	    }
	    $scope.deleteCategory = function() {
            var btn = $('#delete-category-button').button('loading');
            var expenditures = 0;
            var items = 0;

            getExpenditures()
                .then(setExpenditures)
                .then(getItems)
                .then(setItems)
                .then(checkCategory)
                .then(deleteSuccess)
                .catch(error);

            function getExpenditures() {
                return expenditureService.retrieveByCategory();
            }
            function setExpenditures(data) {
                console.log(data.num_results);
                expenditures = data.num_results;
            }
            function getItems() {
                return itemService.retrieveByCategory();
            }
            function setItems(data) {
                console.log(data.num_results);
                items = data.num_results;
            }
            function checkCategory() {
                if (expenditures == 0 && items == 0) {
                    return deleteCategory();
                }
                else if (expenditures != 0 && items != 0) {
                    return deleteExpenditures()
                        .then(deleteItems)
                        .then(deleteCategory);
                }
                else if (expenditures != 0 && items == 0) {
                    return deleteExpenditures()
                        .then(deleteCategory);
                }
                else {
                    console.log('MADE IT');
                    return deleteItems()
                        .then(deleteCategory);
                }
            }
            function deleteExpenditures() {
                return expenditureService.removeByCategory();
            }
            function deleteItems() {
                return itemService.removeByCategory();
            }
            function deleteCategory() {
                return categoryService.remove();
            }
            function deleteSuccess() {
                $('#delete-category-modal').modal('hide');
                btn.button('reset');
                updateCategories();
            }
            function error() {
                vm.errorMsgDeleteCategory = true;
                btn.button('reset');
            }
        }

	    $scope.showEditCategoryModal = function() {
	        vm.category = {};
	        vm.category.name = store.get('category').name
	        $scope.editCategoryForm.$setPristine();
	        $('#edit-category-modal').modal('show');
	    }
	    $scope.updateCategory = function() {
            var btn = $('#update-category-button').button('loading');

            updateCategory()
                .then(updateSuccess)
                .catch(error);

            function updateCategory() {
                return categoryService.update(vm.category.name);
            }
            function updateSuccess() {
                $('#edit-category-modal').modal('hide');
                btn.button('reset');
                updateCategories();
            }
            function error() {
	            $scope.editCategoryForm.$invalid = true;
                btn.button('reset');
            }
	    }
    }
})();
