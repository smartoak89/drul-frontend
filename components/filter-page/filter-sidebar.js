angular.module('app')
    .component('filterSidebar', {
        bindings: {
            category: "<"
        },
        templateUrl: "components/filter-page/filter-sidebar.html",
        controller: ['FilterService', 'Product','CurrencyService', '$rootScope', '$timeout', '$state', function(FilterService, Product, CurrencyService, $rootScope, $timeout, $state) {
            // var self = this;
            // this.currencyService = CurrencyService;
            //
            // this.$onInit = function () {
            //     self.FilterService = FilterService;
            //     FilterService.getFilter(self.category, function (res) {
            //         self.criteries = res;
            //
            //         var maxPrice = res.splice(0, 1)[0].max_price;
            //
            //         if (self.currencyService.cy != 'UAH') {
            //
            //             self.currencyService.calculatePrice(null, maxPrice, function (price) {
            //                 initSlider(price);
            //             });
            //         } else {
            //             initSlider(maxPrice);
            //         }
            //
            //
            //
            //     });
            // };
            //
            // var params = [];
            //
            // this.query = function (criteria) {
            //     var str = criteria.slug + '.' + criteria.value;
            //
            //     var has = params.indexOf(str);
            //
            //     has == -1
            //         ? params.push(str)
            //         : params.splice(has, 1);
            //
            //     Product.getList({combo: params}, self.category);
            // };
            //
            // $rootScope.$on('currencyChanged', function () {
            //     $state.reload();
            // });
            //
            // function initSlider (maxVal) {
            //     self.slider = {
            //         minValue: 0,
            //         maxValue: maxVal,
            //         options: {
            //             floor: 0,
            //             ceil: maxVal,
            //             onEnd: sortByPrice
            //         }
            //     };
            // }
            //
            // function sortByPrice() {
            //     var price = [];
            //
            //     self.currencyService.calculatePrice(self.currencyService.cy, {min: self.slider.minValue, max: self.slider.maxValue} , function (res) {
            //
            //         price.push('min' + '.' + res.min);
            //         price.push('max' + '.' + res.max);
            //         Product.skip = 0;
            //         Product.getList({price: price, skip: 0}, self.category);
            //     });
            //
            // }
        }]
    });