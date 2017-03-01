angular.module('app')
    .service('FileService', ['Httpquery', 'User', function (Httpquery, User) {
        return {
            listGallery: function (product) {
                Httpquery.query({params1: 'files', params2: product.uuid}, function (res) {
                    product.photo = _.find(res, {type: 'main'});
                    product.gallery = res;
                });
            }
        };
    }]);
