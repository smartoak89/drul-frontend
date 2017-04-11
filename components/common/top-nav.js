angular.module('app')
    .component('topNav', {
        templateUrl: "components/common/top-nav.html",
        bindings: {
            searchView: '='
        },
        controller: [ 'Product', 'User', function (Product, User) {
            var self = this;
            self.search = false;
            self.Product = Product;
            this.adminPermission = User.isAdmin();

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