angular.module('app')
    .component('filterSidebar', {
        bindings: {
            category: "<"
        },
        templateUrl: "components/filter-page/filter-sidebar.html",
        controller: ['FilterService', 'Product','$cookies', function(FilterService, Product, $cookies) {
            var self = this;

            this.$onInit = function () {
                self.FilterService = FilterService;
                FilterService.getFilter(self.category, function (res) {
                    self.criteries = res;
                });
            };

            var params = [];

            this.query = function (criteria) {
                var str = criteria.slug + '.' + criteria.value;

                var has = params.indexOf(str);

                has == -1
                    ? params.push(str)
                    : params.splice(has, 1);

                Product.getList({combo: params}, self.category);
            };
        }]
    });