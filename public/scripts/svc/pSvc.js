"use strict";
var lssFinalApp;
(function (lssFinalApp) {
    var Services;
    (function (Services) {
        var pSvc = (function () {
            function pSvc($resource, $window) {
                this.$resource = $resource;
                this.$window = $window;
                this.pAllResource = $resource("/postshell");
                this.pAddResource = $resource("/postshell/addPost");
                this.pGetResource = $resource("/:username/:title", null, {
                    "update": { method: "PUT" }
                });
            }
            pSvc.prototype.savePost = function (newPost) {
                return this.pAddResource.save(newPost).$promise;
            };
            ;
            pSvc.prototype.getPost = function (title) {
                return this.pGetResource.get({ title: title });
            };
            ;
            pSvc.prototype.getAllPosts = function () {
                return this.pAllResource.query();
            };
            ;
            pSvc.prototype.editPost = function (post) {
                this.pGetResource.updatePost({ _id: post._id });
            };
            ;
            pSvc.prototype.deletePost = function (postId) {
                return this.pGetResource.delete({ _id: postId }).$promise;
            };
            ;
            ;
            return pSvc;
        }());
        Services.pSvc = pSvc;
        ;
        angular.module("lssFinalApp").service("pSvc", pSvc);
    })(Services = lssFinalApp.Services || (lssFinalApp.Services = {}));
})(lssFinalApp || (lssFinalApp = {}));
;
