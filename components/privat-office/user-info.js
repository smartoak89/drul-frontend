angular.module('app')
    .component('userInfo', {
        templateUrl: "components/privat-office/user-info.html",
        controller: ['User', 'Httpquery', function(User, Httpquery) {
            var self = this;
            this.User = User;
            this.user = {};
            this.error = null;

            this.userEditor = {
                editmode: false,
                save: function () {
                    User.validate(self.user, function (err) {
                        if (err) return self.error = err;

                        Httpquery.put({params1: 'user', params2: self.user.uuid}, self.user, function (res) {
                            console.log('success', res);
                            this.editmode = false;
                        }, function (exeption) {
                            console.log('error', exeption);
                        })
                    });
                },
                copy: function () {
                    self.user = angular.copy(self.User.active);
                }
            };

            function isValid () {

            }

        }]
    });