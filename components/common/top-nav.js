angular.module('app')
    .component('topNav', {
        templateUrl: "components/common/top-nav.html",
        controller: ['$rootScope', function ($rootScope) {
            var self = this;
            this.rootScope = $rootScope;
            self.volume = 's-7';
            self.volumeSlider = {
                value: 100,
                options: {
                    showSelectionBar: true,
                    onChange: function () {
                        if (self.volumeSlider.value > 0) {
                            self.volume = 's-7'
                        } else {
                            self.volume = 's-6';
                        }
                    }
                }
            };
            $(window).scroll(function () {
                var scrollh = $(this).scrollTop();
                if (scrollh > 350) {
                    $(".navv").addClass('fixed');
                    if (self.rootScope.URL == '') {
                        $(".navv").addClass('compact');
                    }
                } else {
                    $(".navv").removeClass('fixed');
                    if (self.rootScope.URL == '') {
                        $(".navv").removeClass('compact');
                    }
                }
            });
        }]
    });