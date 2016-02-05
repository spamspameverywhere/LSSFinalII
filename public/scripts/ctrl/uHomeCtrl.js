"use strict";
var lssFinalApp;
(function (lssFinalApp) {
    var Controllers;
    (function (Controllers) {
        var uHomeCtrl = (function () {
            function uHomeCtrl(cSvc, pSvc, uSvc, $location, $routeParams, $window) {
                this.cSvc = cSvc;
                this.pSvc = pSvc;
                this.uSvc = uSvc;
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
