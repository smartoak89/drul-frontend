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