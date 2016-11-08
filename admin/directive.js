angular.module('admin')
    //Modal window
    .directive('modalAdmin', function($uibModal) {
        var modalInstance;
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var type = attrs.modalAdmin;

                element.on('click', (function() {
                    if (modalInstance) {
                        modalInstance.dismiss();
                    }

                    modalInstance = $uibModal.open({
                        animation: false,
                        templateUrl: 'admin/components/modal/' + type + '.html',
                        controller: type,
                        size: type,
                        openedClass: 'modalAdmin',
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
    .directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);