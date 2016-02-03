"use strict";
var lssFinalApp;
(function (lssFinalApp) {
    var Services;
    (function (Services) {
        var cSvc = (function () {
            function cSvc($resource) {
                this.$resource = $resource;
                this.cAddResource = $resource("/commentshell/addComment");
                this.cGetResource = $resource("/commentshell/:_id");
            }
            cSvc.prototype.saveComment = function (newComment) {
                return this.cAddResource.save(newComment).$promise;
            };
            ;
            cSvc.prototype.deleteComment = function (comment) {
                return this.cGetResource.delete({ _id: comment._id }).$promise;
            };
            ;
            ;
            return cSvc;
        }());
        Services.cSvc = cSvc;
        ;
        angular.module("lssFinalApp").service("cSvc", cSvc);
    })(Services = lssFinalApp.Services || (lssFinalApp.Services = {}));
})(lssFinalApp || (lssFinalApp = {}));
;
