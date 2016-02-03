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

        // CLICKED function
        $scope.clickedCheckbox = function(category) {
            var isSelected = false;
            angular.forEach(category.items, function(item) {
                if (item.selected) {
                    isSelected = true;
                }
            });
            vm.selected = isSelected;
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
        $scope.deleteCategoryModal = function(category) {
            vm.errorDeleteCategory = false;
            vm.category = {};
            vm.category = category;
            $('#delete-category-button').button('reset');
            $('#delete-category-modal').modal('show');
        };
        $scope.deleteCategory = function() {
            $('#delete-category-button').button('loading');
            var expenditures = 0;
            var items = 0;

            return getExpenditures()
                .then(setExpenditures)
                .then(getItems)
                .then(setItems)
                .then(checkCategory)
                .then(success)
                .catch(error);

            function getExpenditures() {
                return expenditureService.retrieveByCategory(vm.category);
            }
            function setExpenditures(response) {
                expenditures = response.data.num_results;
            }
            function getItems() {
                return itemService.retrieveByCategory(vm.category);
            }
            function setItems(response) {
                items = response.data.num_results;
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
                    return deleteItems()
                        .then(deleteCategory);
                }
            }
            function deleteExpenditures() {
                return expenditureService.removeByCategory(vm.category);
            }
            function deleteItems() {
                return itemService.removeByCategory(vm.category);
            }
            function deleteCategory() {
                return categoryService.remove(vm.category);
            }
            function success() {
                $('#delete-category-modal').modal('hide');
                showCategories();
            }
            function error() {
                vm.errorDeleteCategory = true;
                $('#delete-category-button').button('reset');
            }
        };

        // UPDATE Category functions
        $scope.updateCategoryModal = function(category) {
            vm.category      = {};
            vm.category.id   = category.id;
            vm.category.name = category.name;
            $scope.updateCategoryForm.$setPristine();
            $('#update-category-button').button('reset');
            $('#update-category-modal').modal('show');
        };
        $scope.updateCategory = function() {
            $('#update-category-button').button('loading');

            return updateCategory()
                .then(success)
                .catch(error);

            function updateCategory() {
                return categoryService.update(vm.category);
            }
            function success() {
                $('#update-category-modal').modal('hide');
                showCategories();
            }
            function error() {
                $scope.updateCategoryForm.$invalid = true;
                $('#update-category-button').button('reset');
            }
        };
    }
})();
