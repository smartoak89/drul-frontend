angular.module('app')
    .service('LinkService', [function () {

        this.categoryLink = function (category) {
            // return category.path.map(function (c) {
            //     return c.slug
            // }).join('/');
            return category.path.slug.join('/');
        }
    }]);