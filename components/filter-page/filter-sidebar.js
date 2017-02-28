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
                    initSlider(res.splice(0, 1)[0].max_price);

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

            function initSlider (maxVal) {
                self.slider = {
                    minValue: 0,
                    maxValue: maxVal,
                    options: {
                        floor: 0,
                        ceil: maxVal,
                        onEnd: sortByPrice
                    }
                };
            }

            function sortByPrice() {
                var price = [];
                price.push('min' + '.' + self.slider.minValue);
                price.push('max' + '.' + self.slider.maxValue);
                Product.skip = 0;
                Product.getList({price: price, skip: 0}, self.category);

            }
        }]
    });