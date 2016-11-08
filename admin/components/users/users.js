angular.module('admin')
    .component('users', {
        templateUrl: "admin/components/users/users.html",
        controller: ['Users', function(Users) {
            var self = this;
            this.$onInit = function () {
                this.listUsers = Users.list();
                console.log('listUsers', this.listUsers);
            }

        }]
    });