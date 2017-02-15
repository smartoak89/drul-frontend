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
                    _.forEach(self.comments, function(elem){
                        elem.product = Goods.getThisProd(elem.product_id);
                    });
                });
            }

        }]
    });