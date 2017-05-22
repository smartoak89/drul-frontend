angular.module('admin')
    .component('delivery', {
        templateUrl: "admin/components/delivery/delivery.html",
        controller: ['DeliveryService', function (DeliveryService) {
            var self = this;
            self.delivery = DeliveryService;

            self.delivery.list();
        }]
    });