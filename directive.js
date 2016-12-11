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
    .directive('dynamic', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
                link: function ($scope, element, attrs) {
                $timeout(function(){$scope.$apply($('#zoom_03').elevateZoom())}, 500);
            }
        }
    }])
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