"use strict";

namespace lssFinalApp.Services {

  export class cSvc {

    public cAddResource;
    public cGetResource;

    public saveComment(newComment) {
      return this.cAddResource.save(newComment).$promise;
    };

    public loadComments(_id) {};

    constructor(
      private $resource: ng.resource.IResourceService,
      private $window: ng.IWindowService
    ) {
      this.cAddResource = $resource("/commentShell/addComment");
      this.cGetResource = $resource("/commentShell/:_id");
    };
  };

  angular.module("lssFinalApp").service("pSvc", pSvc);
};
