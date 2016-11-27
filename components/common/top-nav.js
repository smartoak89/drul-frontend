angular.module('app')
    .component('topNav', {
        templateUrl: "components/common/top-nav.html",
        controller: [ function () {
            var self = this;
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