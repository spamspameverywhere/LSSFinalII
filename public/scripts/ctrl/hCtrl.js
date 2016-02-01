"use strict";
var lssFinalApp;
(function (lssFinalApp) {
    var Controllers;
    (function (Controllers) {
        var hCtrl = (function () {
            function hCtrl(pSvc, $location, $routeParams) {
                this.pSvc = pSvc;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.loadAllPosts = pSvc.getAllPosts();
                this.post = pSvc.getPost($routeParams["_id"]);
            }
            hCtrl.prototype.getPostIndiv = function (_id) {
                this.pSvc.getPost(this.post._id);
            };
            ;
            ;
            return hCtrl;
        }());
        Controllers.hCtrl = hCtrl;
        ;
        angular.module("lssFinalApp").controller("hCtrl", hCtrl);
    })(Controllers = lssFinalApp.Controllers || (lssFinalApp.Controllers = {}));
})(lssFinalApp || (lssFinalApp = {}));
;
