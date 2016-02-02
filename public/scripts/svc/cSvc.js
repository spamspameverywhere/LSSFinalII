"use strict";
var lssFinalApp;
(function (lssFinalApp) {
    var Services;
    (function (Services) {
        var cSvc = (function () {
            function cSvc($resource, $window) {
                this.$resource = $resource;
                this.$window = $window;
                this.cAddResource = $resource("/commentShell/addComment");
                this.cGetResource = $resource("/commentShell/:_id");
            }
            cSvc.prototype.saveComment = function (newComment) {
                return this.cAddResource.save(newComment).$promise;
            };
            ;
            cSvc.prototype.loadComments = function (_id) { };
            ;
            ;
            return cSvc;
        }());
        Services.cSvc = cSvc;
        ;
        angular.module("lssFinalApp").service("pSvc", Services.pSvc);
    })(Services = lssFinalApp.Services || (lssFinalApp.Services = {}));
})(lssFinalApp || (lssFinalApp = {}));
;
