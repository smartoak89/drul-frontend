angular.module('app')
    .component('templateCommon', {
        templateUrl: "components/common/template-common.html",
        controller: ['$rootScope', '$location', function ($rootScope, $location) {
            $(window).scroll(function () {
                var scrollh = $(this).scrollTop();
                var self = this;
                self.url = $location.path() === '/';
                $rootScope.$on('$locationChangeStart', function() {
                    self.url = $location.path() === '/';
                });
                if(!self.url) {
                    if (scrollh > 60) {
                        $("#content").addClass('padScroll');
                    } else {
                        $("#content").removeClass('padScroll');
                    }
                }
            });
        }]
    });