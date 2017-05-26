angular.module('app')
    .component('filterSidebar', {
        bindings: {
            category: "<"
        },
        templateUrl: "components/filter-page/filter-sidebar.html",
        controller: ['CurrencyService', 'Category', '$location', 'LinkService', function(CurrencyService, Category, $location, LinkService) {
            var self = this;
            self.currencyService = CurrencyService;
            self.steps = []
;            this.$onInit = function () {
                Category.getCategories(function (err, res) {
                    if (err) return console.error('Error response categories', err);
                    self.categories = res;
                    var steps = $location.path().split('/').splice(2, $location.path().split('/').length);
                    _.each(steps, function(elem, index){
                        if(_.find(self.categories, {slug: elem})){
                            self.steps.push( _.find(self.categories, {slug: elem}));
                        }else{
                            self.steps.push( _.find(self.steps[index - 1].children, {slug: elem}));
                        }
                    })
                    console.log(self.steps)
                });
            };

            this.goTo = function (categ) {
                console.log(categ);
                console.log($location.url('/category/' + LinkService.categoryLink(categ)));
                $location.url('/category/' + LinkService.categoryLink(categ));
            }
        }]
    });