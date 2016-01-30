(function() {
    'use strict';

    angular
        .module('app.projects.budget')
        .controller('BudgetController', BudgetController);

    BudgetController.$inject = ['$scope', 'store', 'categoryService', 'itemService', 'expenditureService'];

    function BudgetController($scope, store, categoryService, itemService, expenditureService) {
        var vm = this;
        vm.project = store.get('project');
        showCategories();

        // GET function
        function showCategories() {
            return getCategories()
                .then(populateTable)
                .catch(error);

            function getCategories() {
                return categoryService.retrieveList()
                    .then(success)
                    .catch(error);

                function success(response) {
                    vm.categoryList = response.data.objects;
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
                vm.errorGet = true;
            }
        }

        // CLICKED functions
        $scope.clickedCheckbox = function(category) {
            var isSelected = false;
            angular.forEach(category.items, function(item) {
                if (item.selected) {
                    isSelected = true;
                }
            });
            vm.selected = isSelected;
        };
        $scope.clickedCategory = function(category) {
            var index = vm.categoryList.indexOf(category);
            if (index !== -1) {
                store.set('category', category);
                return true;
            }
            return false;
        };

        // ADD Item functions
        $scope.addItemModal = function() {
            vm.item           = {};
            vm.item.estimated = 0;
            vm.item.actual    = 0;
            $scope.addItemForm.$setPristine();
            $('#add-item-button').button('reset');
            $('#add-item-modal').modal('show');
        };
        $scope.addItem = function() {
            $('#add-item-button').button('loading');

            if (vm.item.newCategory) {
                return addCategory()
                    .then(newCategory)
                    .then(addItem)
                    .then(success)
                    .catch(error);
            } else {
                return addItem()
                    .then(success)
                    .catch(error);
            }

            function addCategory() {
                return categoryService.create(vm.item.newCategory);
            }
            function newCategory(response) {
                vm.item.category = response.data.id;
            }
            function addItem() {
                return itemService.create(vm.item);
            }
            function success() {
                $('#add-item-modal').modal('hide');
                showCategories();
            }
            function error() {
                $scope.addItemForm.$invalid = true;
                $('#add-item-button').button('reset');
            }
        };

        // DELETE MANY Items functions
        $scope.deleteManyItemsModal = function() {
            if (!$('#delete-button').hasClass('disabled')) {
                vm.errorDeleteManyItems = false;
                $('#delete-many-items-button').button('reset');
                $('#delete-many-items-modal').modal('show');
            }
        };
        $scope.deleteManyItems = function() {
            $('#delete-many-items-button').button('loading');

            angular.forEach(vm.categoryList, function(category) {
                angular.forEach(category.items, function(item) {
                    if (item.selected) {
                        return deleteItem(item)
                            .then(success)
                            .catch(error);
                    }
                });
            });

            function deleteItem(item) {
                return itemService.remove(item);
            }
            function success() {
                $('#delete-many-items-modal').modal('hide');
                vm.selected = false;
                showCategories();
            }
            function error() {
                vm.errorDeleteManyItems = true;
                $('#delete-many-items-button').button('reset');
            }
        };

        // DELETE Item functions
        $scope.deleteItemModal = function(item) {
            vm.errorDeleteItem = false;
            vm.item = {};
            vm.item = item;
            $('#delete-item-button').button('reset');
            $('#delete-item-modal').modal('show');
        };
        $scope.deleteItem = function() {
            $('#delete-item-button').button('loading');

            return deleteItem()
                .then(success)
                .catch(error);

            function deleteItem() {
                return itemService.remove(vm.item);
            }
            function success() {
                $('#delete-item-modal').modal('hide');
                showCategories();
            }
            function error() {
                vm.errorDeleteItem = true;
                $('#delete-item-button').button('reset');
            }
        };

        // UPDATE Item functions
        $scope.updateItemModal = function(category, item) {
            vm.item             = {};
            vm.item.id          = item.id;
            vm.item.category    = {
                id:   category.id,
                name: category.name
            };
            vm.item.name        = item.name;
            vm.item.description = item.description;
            vm.item.estimated   = item.estimated;
            vm.item.actual      = item.actual;
            $scope.updateItemForm.$setPristine();
            $('#update-item-button').button('reset');
            $('#update-item-modal').modal('show');
        };
        $scope.updateItem = function() {
            $('#update-item-button').button('loading');

            return updateItem()
                .then(success)
                .catch(error);

            function updateItem() {
                return itemService.update(vm.item);
            }
            function success() {
                $('#update-item-modal').modal('hide');
                showCategories();
            }
            function error() {
                $scope.updateItemForm.$invalid = true;
                $('#update-item-button').button('reset');
            }
        };

        // DELETE Category functions
        $scope.showDeleteCategoryModal = function() {
            vm.errorMsgDeleteCategory = false;
            $('#delete-category-modal').modal('show');
        };
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
                if (expenditures === 0 && items === 0) {
                    return deleteCategory();
                }
                else if (expenditures !== 0 && items !== 0) {
                    return deleteExpenditures()
                        .then(deleteItems)
                        .then(deleteCategory);
                }
                else if (expenditures !== 0 && items === 0) {
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
                showCategories();
            }
            function error() {
                vm.errorMsgDeleteCategory = true;
                btn.button('reset');
            }
        };

        // UPDATE Category functions
        $scope.showEditCategoryModal = function() {
            vm.category = {};
            vm.category.name = store.get('category').name;
            $scope.editCategoryForm.$setPristine();
            $('#edit-category-modal').modal('show');
        };
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
                showCategories();
            }
            function error() {
                $scope.editCategoryForm.$invalid = true;
                btn.button('reset');
            }
        };
    }
})();
