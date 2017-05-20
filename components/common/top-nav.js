angular.module('app')
    .component('topNav', {
        templateUrl: "components/common/top-nav.html",
        bindings: {
            searchView: '='
        },
        controller: [ 'Product', 'User', 'Category', 'LinkService', function (Product, User, Category, LinkService) {
            var self = this;
            self.search = false;
            self.Product = Product;
            this.adminPermission = User.isAdmin();
            this.category = Category;
            this.linkService = LinkService;

            $(window).scroll(function () {
                var scrollh = $(this).scrollTop();
                    if (scrollh > 210) {
                        $(".compact1").addClass('fixed');
                    } else {
                        $(".compact1").removeClass('fixed');
                    }

            });
        }]
    });