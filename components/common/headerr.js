angular.module('app')
    .component('headerr', {
        templateUrl: "components/common/headerr.html",
        controller: ['User', 'Cart', function(User, Cart) {
            var self = this;
            this.User = User;
            this.Cart = Cart;
            this.logout = function () {
                // this.user = null;
                User.deactive();
            };
            this.click = function () {
                User.set({id: 92873928219});
            };
            self.volume = 's-21';
            self.volumeSlider = {
                value: 100,
                options: {
                    showSelectionBar: true,
                    onChange: function () {
                        if (self.volumeSlider.value > 0) {
                            self.volume = 's-21'
                        } else {
                            self.volume = 's-22';
                        }
                    }
                }
            };
        }]
    });