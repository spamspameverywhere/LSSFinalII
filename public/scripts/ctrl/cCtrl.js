"use strict";
var lssFinalApp;
(function (lssFinalApp) {
    var Controllers;
    (function (Controllers) {
        var cCtrl = (function () {
            function cCtrl(cSvc, pSvc, uSvc, $location, $routeParams, $window) {
                this.cSvc = cSvc;
                this.pSvc = pSvc;
                this.uSvc = uSvc;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$window = $window;
                this.onePost = pSvc.getPost($routeParams["title"]);
                this.loggedInUser = uSvc.loadUHome(this.$window.localStorage.getItem("username"));
                this.oneComment = cSvc.getComment($routeParams["_id"]);
            }
            cCtrl.prototype.addNewComment = function () {
                var _this = this;
                var newComment = {
                    timestamps: Date.now().toString(),
                    commentText: this.newComment.commentText,
                    postedTo: this.onePost._id,
                    postedToTitle: this.onePost.title,
                    commenterName: this.loggedInUser.username
                };
                this.cSvc.saveComment(newComment).then(function (res) {
                    _this.$location.path(_this.onePost.origPosterName + "/" + _this.onePost.title);
                });
            };
            ;
            ;
            return cCtrl;
        }());
        Controllers.cCtrl = cCtrl;
        ;
        angular.module("lssFinalApp").controller("cCtrl", cCtrl);
    })(Controllers = lssFinalApp.Controllers || (lssFinalApp.Controllers = {}));
})(lssFinalApp || (lssFinalApp = {}));
;
