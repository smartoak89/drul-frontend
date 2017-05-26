angular.module('app')
    .component('filterSidebar', {
        bindings: {
            category: "<"
        },
        templateUrl: "components/filter-page/filter-sidebar.html",
        controller: ['CurrencyService', 'Category', '$location', 'LinkService', function(CurrencyService, Category, $location, LinkService) {
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