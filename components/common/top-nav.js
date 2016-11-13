angular.module('app')
    .component('topNav', {
        templateUrl: "components/common/top-nav.html",
        controller: ['$rootScope', function ($rootScope) {
            var self = this;
            console.log('rootScoep', $rootScope.URL);
            this.URL = $rootScope.URL
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
                    if ($rootScope.url[$rootScope.url.length - 1] == '') {
                        $(".navv").addClass('compact');
                    }
                } else {
                    $(".navv").removeClass('fixed');
                    if ($rootScope.url[$rootScope.url.length - 1] == '') {
                        $(".navv").removeClass('compact');
                    }
                }
            });
        }]
    });