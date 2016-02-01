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
                this.onePost = pSvc.getPost($routeParams["loadAllPosts.posts.title"]);
            }
            hCtrl.prototype.viewPost = function (title) {
                this.$location.path(this.onePost.title);
            };
            ;
            hCtrl.prototype.navToggle = function ($scope) {
                $scope.isCollapsed = false;
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
