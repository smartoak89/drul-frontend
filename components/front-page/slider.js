angular.module('app')
    .component('slider', {
        templateUrl: "components/front-page/slider-show.html",
        controller: ['$rootScope', 'SliderService', function($rootScope, SliderService) {
            var self = this;
            self.myInterval = 5000;
            self.noWrapSlides = false;
            self.active = 0;
            var slides = self.slides = [{id: 0},{id: 1},{id: 2}];
            var currIndex = 0;

            $rootScope.$on('modalOpened', function () {
                console.info('modalOpened')
                self.noWrapSlides = true;
            });

            $rootScope.$on('modalClosed', function () {
                console.info('modalClosed')
                self.noWrapSlides = false;
            });

            self.getSlider = function(){
                self.slides = [];

                SliderService.list(function (err, sliders) {
                    if (err) return console.log(err);
                    _.each(sliders, function (slide) {
                        SliderService.getImage(slide, function (res) {
                            self.slides.push(res);
                        });
                    })


                });
                // HttpResource.query({params1:'files', params2:'5f0eeb5f-3fd7-4932-8ea8-3abf1578242c'}, function (res) {
                //     console.log(res);
                //     _.forEach(res, function(obj){
                //         if(obj.type == 'slide'){
                //             self.slides.push(obj);
                //         }
                //     });
                //     console.log(self.slides);
                // }, function (err) {
                //     console.error('Get gallery => ', err);
                // })
            };

            self.$onInit = function () {
                console.log('+')
                self.getSlider();
            };

        }]
    });