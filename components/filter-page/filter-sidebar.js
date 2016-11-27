angular.module('app')
    .component('filterSidebar', {
        bindings: {
            category: "<"
        },
        templateUrl: "components/filter-page/filter-sidebar.html",
        controller: ['FilterService', function(FilterService) {
            var self = this;
            console.log('filter sidebar', self.category);
            // FilterService.getFilter(self.category);
        }]
    });