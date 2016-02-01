"use strict";
var lssFinalApp;
(function (lssFinalApp) {
    var Services;
    (function (Services) {
        var uSvc = (function () {
            function uSvc($resource, $window) {
                this.$resource = $resource;
                this.$window = $window;
                this.uRegResource = $resource("/usershell/register");
                this.uLoginResource = $resource("/usershell/login");
                this.uHomeResource = $resource("/usershell/:username");
                if (this.getToken())
                    this.setUser();
            }
            uSvc.prototype.registerUser = function (newUser) {
                return this.uRegResource.save(newUser).$promise;
            };
            ;
            uSvc.prototype.login = function (user) {
                return this.uLoginResource.save(user).$promise;
            };
            ;
            uSvc.prototype.setToken = function (token) {
                this.$window.localStorage.setItem("token", token);
            };
            ;
            uSvc.prototype.getToken = function () {
                return this.$window.localStorage.getItem("token");
            };
            ;
            uSvc.prototype.setUser = function () {
                var user = JSON.parse(atob(this.$window.localStorage.getItem("token")
                    .split(".")[1]));
            };
            ;
            uSvc.prototype.loadUHome = function (username) {
                return this.uHomeResource.get({ username: username });
            };
            ;
            ;
            return uSvc;
        }());
        Services.uSvc = uSvc;
        ;
        angular.module("lssFinalApp").service("uSvc", uSvc);
    })(Services = lssFinalApp.Services || (lssFinalApp.Services = {}));
})(lssFinalApp || (lssFinalApp = {}));
;
