angular.module('app')
    .component('resetPage', {
        templateUrl: "components/reset-page/reset-page.html",
        controller: [ 'AuthService', '$location', '$state', function(AuthService, $location, $state) {
            var self = this;
            self.var = null;
            self.error = null;
            self.success = null;
            self.$onInit = function () {
                self.token = $location.path().split('/')[$location.path().split('/').length-1];
                AuthService.resetGet(self.token, function(err, res){
                    if(err){
                        console.log(err);
                        self.var = 'err';
                    }else{
                        console.log(res);
                        self.var = 'res';

                    }
                })
            };

            self.changePass = function(){
                if (isValid() == true) {
                    AuthService.resetPass(self.pass, self.token, function(err, res){
                        if(err){
                            self.error = err.message;
                        }else{
                            self.success = 'Пароль успешно изменен!';
                            $state.go('index')
                        }
                    })
                }
            }

            function isValid () {
                if (!self.pass) return self.error = 'Пожалуйста введите пароль!';
                if (self.pass.length < 4) return self.error = 'Пароль должен быть не менее 4 символов!';
                if (!self.repass) return self.error = 'Пожалуйста введите повторно пароль!';
                if (self.repass.length < 4) return self.error = 'Повторный пароль должен быть не менее 4 символов!';
                if (self.pass !== self.repass) return self.error = 'Пароли не совпадают!';

                self.error = null;
                return true;
            }
        }]
    });
