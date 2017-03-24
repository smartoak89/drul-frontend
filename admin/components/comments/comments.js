angular.module('admin')
    .component('comments', {
        templateUrl: "admin/components/comments/comments.html",
        controller: ['$rootScope', 'ReviewsAdmin', 'Goods', '$location', 'Conf', function($rootScope, ReviewsAdmin, Goods, $location, Conf) {
            var self = this;

            self.comments = null;
            self.Conf = Conf;

            $rootScope.$on('reviewRemoved', function (event, reviewId) {
                _.remove(ReviewsAdmin.list, {uuid: reviewId});
            })
            $rootScope.$on('reviewPublished', function (event, reviewId) {
                _.remove(ReviewsAdmin.list, {uuid: reviewId});
            })

            self.$onInit = function () {
                getComm();
            };

            function getComm(){
                ReviewsAdmin.getCom(function(err, res){
                    self.comments = res;
                    _.forEach(self.comments, function(elem){
                        elem.product = Goods.getThisProd(elem.product_id);
                        elem.photo = Goods.getMainPhoto(elem.product_id);
                    });
                });
            }

            self.goToProduct = function(id) {
                $location.path('/product/' + id);
            }

        }]
    });