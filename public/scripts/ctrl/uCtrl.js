"use strict";
var lssFinalApp;
(function (lssFinalApp) {
    var Controllers;
    (function (Controllers) {
        var uCtrl = (function () {
            function uCtrl(uSvc, $location, $window) {
                this.uSvc = uSvc;
                this.$location = $location;
                this.$window = $window;
            }
            uCtrl.prototype.register = function () {
                var _this = this;
                var newUser = {
                    username: this.newUser.username,
                    email: this.newUser.email,
                    password: this.newUser.password,
                    pwdConfirm: this.newUser.pwdConfirm
                };
                this.uSvc.registerUser(this.newUser).then(function (res) {
                    _this.uSvc.setToken(res.token);
                    _this.uSvc.setUser();
                    _this.$window.localStorage.setItem("username", _this.newUser.username);
                    _this.$location.path(_this.newUser.username);
                });
            };
            ;
            uCtrl.prototype.login = function () {
                var _this = this;
                this.uSvc.login(this.user).then(function (res) {
                    _this.uSvc.setToken(res.token);
                    _this.uSvc.setUser();
                    _this.$window.localStorage.setItem("username", _this.user.username);
                    _this.$location.path(_this.user.username);
                });
            };
            ;
            ;
            return uCtrl;
        }());
        Controllers.uCtrl = uCtrl;
        ;
        angular.module("lssFinalApp").controller("uCtrl", uCtrl);
    })(Controllers = lssFinalApp.Controllers || (lssFinalApp.Controllers = {}));
})(lssFinalApp || (lssFinalApp = {}));
;
