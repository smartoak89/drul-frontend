angular.module('app')
    .component('filterSidebar', {
        bindings: {
            category: "<"
        },
        templateUrl: "components/filter-page/filter-sidebar.html",
        controller: ['FilterService', 'queryParams', 'Product','$cookies', function(FilterService, queryParams, Product, $cookies) {
            var self = this;
            this.$onInit = function () {
                self.FilterService = FilterService;
                FilterService.getFilter(self.category, function (res) {
                    self.criteries = res;
                });
            };
            // var match = {};
            // this.filterBy = function (key, value) {
            //     if (!match['combo' + '.' + key]) match['combo' + '.' + key] = [];
            //     match['combo' + '.' + key].push(value);
            //     Product.getList({match: match})
            // }
        }]
    });