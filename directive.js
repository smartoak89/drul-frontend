angular.module('app')
    //Modal window
    .directive('modal', function($uibModal) {
        var modalInstance;
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var type = attrs.modal;

                element.on('click', (function() {
                    if (modalInstance) {
                        modalInstance.dismiss();
                    }

                    modalInstance = $uibModal.open({
                        animation: false,
                        templateUrl: 'components/modal/' + type + '.html',
                        controller: type,
                        size: type,
                        resolve: {
                            modalData: function () {
                                return scope;
                            }
                        }
                    });
                }));
            }
        };
    })
    .directive('zoom', function(){
    function link(scope, element, attrs){
        var $ = angular.element;
        var original = $(element[0].querySelector('.original'));
        var originalImg = original.find('img');
        var zoomed = $(element[0].querySelector('.zoomed'));
        var zoomedImg = zoomed.find('img');

        var mark = $('<div></div>')
            .addClass('mark')
            .css('position', 'absolute')
            .css('height', scope.markHeight +'px')
            .css('width', scope.markWidth +'px')

        $(element).append(mark);

        element
            .on('mouseenter', function(evt){
                console.log(evt);
                mark.removeClass('hide');
                zoomed.removeClass('hide');

                this.offset = calculateOffset(evt);
                moveMark(this.offset.X, this.offset.Y);
            })
            .on('mouseleave', function(evt){
                console.log(evt);
                mark.addClass('hide');
                zoomed.addClass('hide');
                //this.offset = calculateOffset(evt);
                //moveMark(this.offset.X, this.offset.Y);
            })
            .on('mousemove', function(evt){
                this.offset = calculateOffset(evt);
                moveMark(this.offset.X, this.offset.Y);
            })
            .on("wheel", function(evt) {
                console.log(evt.originalEvent.deltaY);
                this.offset = calculateOffset(evt);

                moveMark(this.offset.X, this.offset.Y+evt.originalEvent.deltaY);
            });
        scope.$on('mark:moved', function(event, data){
            updateZoomed.apply(this, data);
        });

        function moveMark(offsetX, offsetY){
            var dx = scope.markWidth,
                dy = scope.markHeight,
                x = offsetX - dx/2,
                y = offsetY - dy/2;
            if(x>original[0].offsetWidth- dx+15){
                x = original[0].offsetWidth - dx+15;
            }
            if(y>original[0].offsetHeight- dy){
                y = original[0].offsetHeight - dy;
            }
            if(x<15){
                x=15
            }
            if(y<0){
                y=0
            }
            mark
                .css('left', x  + 'px')
                .css('top',  y  + 'px');

            scope.$broadcast('mark:moved', [
                x, y, dx, dy, originalImg[0].height, originalImg[0].width
            ]);
        }

        function updateZoomed(originalX, originalY, originalDx, originalDy, originalHeight, originalWidth){
            var zoomLvl = scope.zoomLvl;
            scope.$apply(function(){
                zoomed
                    .css('height', zoomLvl*originalDy+'px')
                    .css('width', zoomLvl*originalDx+'px');
                zoomedImg
                    .attr('src', scope.src)
                    .css('height', zoomLvl*originalHeight+'px')
                    .css('width', zoomLvl*originalWidth+'px')
                    .css('left',-zoomLvl*originalX +'px')
                    .css('top',-zoomLvl*originalY +'px');
            });
        }

        var rect;
        function calculateOffset(mouseEvent){
            rect = rect || mouseEvent.target.getBoundingClientRect();
            var offsetX = mouseEvent.clientX - rect.left;
            var offsetY = mouseEvent.clientY - rect.top;

            return {
                X: offsetX,
                Y: offsetY
            }
        }

        attrs.$observe('ngSrc', function(data) {
            scope.src = attrs.ngSrc;
        }, true);


        attrs.$observe('zoomLvl', function(data) {
            scope.zoomLvl =  data;;
        }, true);
    }

    return {
        restrict: 'EA',
        scope: {
            markHeight: '@markHeight',
            markWidth: '@markWidth',
            src: '@src',
            zoomLvl: "@zoomLvl"
        },
        template: [
            '<div class="original">',
            '<img ng-src="{{src}}"/>',
            '</div>',
            '<div class="zoomed">',
            '<img/>',
            '</div>'
        ].join(''),
        link: link
    };
}).directive('dynamic', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
            scope.$watch(attrs.dynamic, function(html) {
                ele.html(html);
                console.log(ele)
                $compile(ele.contents())(scope);
                ele.elevateZoom();
            });
        }
    };
})
    .directive('noImage', function($timeout) {
        var all = [];
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var srcCache;
                all.push(attrs);
                element.addClass('image_preloader');

                $timeout(function() {
                    _.each(all, function(elem) {
                        if (elem.src == undefined) {
                            elem.$set('src', '/assets/images/noimage.png');
                        }
                    })
                }, 1500);

                element.bind('load', function() {
                    element.removeClass('image_preloader');
                }).on('error', function() {
                    console.error('error load image');
                });

                attrs.$observe('ngSrc', function(src) {
                    if (srcCache) _.remove(all, attrs);
                    else srcCache = attrs
                })
            }
        };
    });