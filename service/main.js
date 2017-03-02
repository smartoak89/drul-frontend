angular.module('app')
    .service('MainService', ['Httpquery', 'User', 'DeferredService', function (Httpquery, User, DeferredService) {

        this.init = function () {
            DeferredService.list(function () {})
        }

    }]);