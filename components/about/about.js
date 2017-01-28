angular.module('app')
    .component('about', {
        templateUrl: "components/about/about.html",
        controller: ['$q', function($q) {
            var self = this;
        }]
    });
