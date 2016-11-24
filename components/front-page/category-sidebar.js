angular.module('app')
    .component('categoriesSidebar', {
        templateUrl: "components/front-page/category-sidebar.html",
        controller: ['Category', function(Category) {
            var self = this;
            this.$onInit = function () {
                Category.getCategories(function (err, res) {
                    if (err) return console.error('Error response categories', err);
                    console.log('categories => ', res);
                    self.categories = res;
                });
            }
        }]
    });