angular.module('app')
    .component('filterSidebar', {
        bindings: {
            category: "<"
        },
        templateUrl: "components/filter-page/filter-sidebar.html",
        controller: ['FilterService', 'queryParams', 'Product', function(FilterService, queryParams, Product) {
            var self = this;
            this.FilterServ = FilterService;
            this.$onInit = function () {
                FilterService.getFilter(self.category);
            }
            var match = {};
            this.filterBy = function (key, value) {
                if (!match['combo' + '.' + key]) match['combo' + '.' + key] = [];
                match['combo' + '.' + key].push(value);
                Product.getList({match: match})
            }
        }]
    });