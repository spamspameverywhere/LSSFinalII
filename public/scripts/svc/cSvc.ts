"use strict";

namespace lssFinalApp.Services {

  export class cSvc {

    public cAddResource;
    public cGetResource;

    public saveComment(newComment) {
      return this.cAddResource.save(newComment).$promise;
    };

    public deleteComment(comment) {
      return this.cGetResource.delete({_id: comment._id}).$promise;
    };

    constructor(
      private $resource: ng.resource.IResourceService
    ) {
      this.cAddResource = $resource("/commentshell/addComment");
      this.cGetResource = $resource("/commentshell/:_id");
    };
  };

  angular.module("lssFinalApp").service("cSvc", cSvc);
};
