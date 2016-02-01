"use strict";

namespace lssFinalApp.Services {

  export class pSvc {

    public pAllResource;
    public pGetResource;
    public pAddResource;

    public savePost(newPost) {
      return this.pAddResource.save(newPost).$promise;
    };

    public getAllPosts() {
      return this.pAllResource.get();
    };

    public getPost(title) {
      return this.pGetResource.get({title: title});
    };

    constructor(
      private $resource: ng.resource.IResourceService,
      private $window: ng.IWindowService
    ) {
      this.pAddResource = $resource("/postshell/addPost");
      this.pAllResource = $resource("/postshell/");
      this.pGetResource = $resource("/postshell/:username/:title");
    };
  };

  angular.module("lssFinalApp").service("pSvc", pSvc);
};
