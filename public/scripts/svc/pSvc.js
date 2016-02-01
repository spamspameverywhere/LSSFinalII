"use strict";
var lssFinalApp;
(function (lssFinalApp) {
    var Services;
    (function (Services) {
        var pSvc = (function () {
            function pSvc($resource, $window) {
                this.$resource = $resource;
                this.$window = $window;
                this.pAddResource = $resource("/postshell/addPost");
                this.pAllResource = $resource("/postshell/");
                this.pGetResource = $resource("/postshell/:username/:title");
            }
            pSvc.prototype.savePost = function (newPost) {
                return this.pAddResource.save(newPost).$promise;
            };
            ;
            pSvc.prototype.getAllPosts = function () {
                return this.pAllResource.get();
            };
            ;
            pSvc.prototype.getPost = function (title) {
                return this.pGetResource.get({ title: title });
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
