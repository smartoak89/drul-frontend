angular.module('app')
    .component('navCus', {
        templateUrl: "components/common/nav-cus.html",
        controller: [ 'Product', 'User', function (Product, User) {
            var self = this;
            self.search = false;
            self.Product = Product;
            this.adminPermission = User.isAdmin();

            $(window).scroll(function () {
                var scrollh = $(this).scrollTop();
                    if (scrollh > 60) {
                        $(".compact").addClass('fixed');
                    } else {
                        $(".compact").removeClass('fixed');
                    }

            });
        }]
    });