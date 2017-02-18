angular.module('admin')
    .component('comments', {
        templateUrl: "admin/components/comments/comments.html",
        controller: ['Comm', 'Goods', function(Comm, Goods) {
            var self = this;
            self.comments = null;
            self.$onInit = function () {
                getComm();
            };
            function getComm(){
                Comm.getCom(function(err, res){
                    if (err) return console.log(err);
                    self.comments = res;
                    console.log(self.comments);
                    _.forEach(self.comments, function(elem){
                        Goods.getThisProd(elem.product_id);
                        elem.product = Goods.product;
                        console.log(elem);
                    });
                });
            }

        }]
    });