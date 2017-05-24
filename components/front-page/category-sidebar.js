angular.module('app')
    .component('categoriesSidebar', {
        templateUrl: "components/front-page/category-sidebar.html",
        controller: ['Category', '$location', 'LinkService', 'CurrencyService', function(Category, $location, LinkService, CurrencyService) {
            var self = this;
            self.currencyService = CurrencyService;
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