"use strict";
var lssFinalApp;
(function (lssFinalApp) {
    var Controllers;
    (function (Controllers) {
        var uHomeCtrl = (function () {
            function uHomeCtrl(uSvc, pSvc, $location, $routeParams, $window) {
                this.uSvc = uSvc;
                this.pSvc = pSvc;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$window = $window;
                this.user = uSvc.loadUHome($routeParams["username"]);
                this.loggedInUser = uSvc.loadUHome(this.$window.localStorage.getItem("username"));
            }
            ;
            return uHomeCtrl;
        }());
        Controllers.uHomeCtrl = uHomeCtrl;
        ;
        angular.module("lssFinalApp").controller("uHomeCtrl", uHomeCtrl);
    })(Controllers = lssFinalApp.Controllers || (lssFinalApp.Controllers = {}));
})(lssFinalApp || (lssFinalApp = {}));
;
