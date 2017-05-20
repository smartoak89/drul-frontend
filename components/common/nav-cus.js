angular.module('app')
    .component('navCus', {
        templateUrl: "components/common/nav-cus.html",
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
            Category.getCategories(function(){});

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