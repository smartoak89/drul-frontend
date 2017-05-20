angular.module('app')
    .component('categoriesSidebar', {
        templateUrl: "components/front-page/category-sidebar.html",
        controller: ['Category', '$location', 'LinkService', function(Category, $location, LinkService) {
            var self = this;
            this.$onInit = function () {
                Category.getCategories(function (err, res) {
                    if (err) return console.error('Error response categories', err);
                    self.categories = res;
                });
            };

            this.goTo = function (categ) {
                $location.url('/category/' + LinkService.categoryLink(categ));
            }
        }]
    });