angular.module('app')
    .component('nav', {
        templateUrl: "components/common/nav.html",
        controller: [ function () {
            var self = this;
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