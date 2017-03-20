angular.module('app')
    .component('navCus', {
        templateUrl: "components/common/nav-cus.html",
        controller: [ 'Product', 'User', function (Product, User) {
            var self = this;
            self.search = false;
            self.Product = Product;
            var activeUser = User.get();
            self.adminPermission = (activeUser.permission.indexOf('administrator') == -1) == false;

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