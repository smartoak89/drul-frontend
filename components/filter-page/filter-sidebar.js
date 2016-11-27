angular.module('app')
    .component('filterSidebar', {
        bindings: {
            category: "<"
        },
        templateUrl: "components/filter-page/filter-sidebar.html",
        controller: ['FilterService', function(FilterService) {
            var self = this;
            this.FilterServ = FilterService;
            this.$onInit = function () {
                FilterService.getFilter(self.category);
            }
        }]
    });