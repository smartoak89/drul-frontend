angular.module('app')
    .component('slider', {
        templateUrl: "components/front-page/slider.html",
        controller: ['$rootScope', 'HttpResource', function($rootScope, HttpResource) {
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

                HttpResource.query({params1:'files', params2:'78d56607-fc11-41eb-a60d-fcfb3b3cb797'}, function (res) {
                    console.log(res);
                    _.forEach(res, function(obj){
                        if(obj.type == 'slide'){
                            self.slides.push(obj);
                        }
                    });
                    console.log(self.slides);
                }, function (err) {
                    console.error('Get gallery => ', err);
                })
            };

            self.$onInit = function () {
                console.log('+')
                self.getSlider();
            };

        }]
    });