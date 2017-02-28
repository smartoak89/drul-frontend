angular.module('app')
    .component('notAllowed', {
        templateUrl: "components/common/not-allowed/not-allowed.html",
        controller: [function() {
            console.log('not-allowed')
        }]
    });
