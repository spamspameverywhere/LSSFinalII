"use strict";
var lssFinalApp;
(function (lssFinalApp) {
    var Controllers;
    (function (Controllers) {
        var pCtrl = (function () {
            function pCtrl(pSvc, uSvc, $location, $routeParams, $window) {
                this.pSvc = pSvc;
                this.uSvc = uSvc;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$window = $window;
                this.onePost = pSvc.getPost($routeParams["title"]);
                this.user = uSvc.loadUHome($routeParams["username"]);
                this.loggedInUser = this.loggedInUser = uSvc.loadUHome(this.$window.localStorage.getItem("username"));
            }
            pCtrl.prototype.addNewPost = function () {
                var _this = this;
                var newPost = {
                    timestamps: Date.now().toString(),
                    title: this.newPost.title,
                    imageUrl: this.newPost.imageUrl,
                    postText: this.newPost.postText,
                    origPoster: this.loggedInUser._id,
                    origPosterName: this.loggedInUser.username
                };
                this.pSvc.savePost(newPost).then(function (res) {
                    _this.$location.path(_this.loggedInUser.username);
                });
            };
            ;
            pCtrl.prototype.viewPost = function (title) {
                this.$location.path(this.onePost.origPosterName + "/" + this.onePost.title);
            };
            ;
            return pCtrl;
        }());
        Controllers.pCtrl = pCtrl;
        ;
        angular.module("lssFinalApp").controller("pCtrl", pCtrl);
    })(Controllers = lssFinalApp.Controllers || (lssFinalApp.Controllers = {}));
})(lssFinalApp || (lssFinalApp = {}));
;
