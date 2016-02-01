"use strict";

namespace lssFinalApp.Services {

  export class pSvc {

    public pAllResource;
    public pGetResource;
    public pAddResource;

    public savePost(newPost) {
      return this.pAddResource.save(newPost).$promise;
    };

    public getPost(title) {
      return this.pGetResource.get({title: title});
    };

    public getAllPosts() {
      return this.pAllResource.query();
    };

    public editPost(post) {
      this.pGetResource.updatePost({_id: post._id});
    };

    public deletePost(postId) {
      return this.pGetResource.delete({_id: postId}).$promise;
    };

    constructor(
      private $resource: ng.resource.IResourceService,
      private $window: ng.IWindowService
    ) {
      this.pAllResource = $resource("/postshell");
      this.pAddResource = $resource("/postshell/addPost");
      this.pGetResource = $resource("/:username/:title", null,
      {
        "update": {method: "PUT"}
      });
    };
  };

  angular.module("lssFinalApp").service("pSvc", pSvc);
};
