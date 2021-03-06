"use strict";

namespace lssFinalApp.Controllers {

  export class hCtrl {

    public loadAllPosts;
    public onePost;

    public viewPost(title) {
      this.$location.path(this.onePost.title);
    };

    //this is how Angular UI Bootstrap toggles the menu button; still can't get it to collapse based on viewport size, may have to do it in css because, of course, real bootstrap doesn't work in angular
    public navToggle($scope) {
      $scope.isCollapsed = false;
    };

    constructor(
      private pSvc: lssFinalApp.Services.pSvc,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService
    ) {
      this.loadAllPosts = pSvc.getAllPosts();
      this.onePost = pSvc.getPost($routeParams["loadAllPosts.posts.title"]);
    };
  };

  angular.module("lssFinalApp").controller("hCtrl", hCtrl);
};
