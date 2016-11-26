angular.module('app')
    .component('topNav', {
        templateUrl: "components/common/top-nav.html",
        controller: ['$rootScope', '$location', function ($rootScope, $location) {
            var self = this;
            this.rootScope = $rootScope;
                self.url = $location.path() === '/';
            this.rootScope.$on('$locationChangeStart', function() {
                self.url = $location.path() === '/';
            });
            $(window).scroll(function () {
                var scrollh = $(this).scrollTop();
                if(self.url) {
                    if (scrollh > 310) {
                        $(".compact1").addClass('fixed');
                    } else {
                        $(".compact1").removeClass('fixed');
                    }
                }else{
                    if (scrollh > 60) {
                        $(".compact").addClass('fixed');
                    } else {
                        $(".compact").removeClass('fixed');
                    }
                }
            });
        }]
    });