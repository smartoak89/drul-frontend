angular.module('app')
    .component('topNav', {
        templateUrl: "components/common/top-nav.html",
        controller: [ 'Product', function (Product) {
            var self = this;
            self.search = false;
            self.Product = Product;

            $(window).scroll(function () {
                var scrollh = $(this).scrollTop();
                    if (scrollh > 310) {
                        $(".compact1").addClass('fixed');
                    } else {
                        $(".compact1").removeClass('fixed');
                    }

            });
        }]
    });