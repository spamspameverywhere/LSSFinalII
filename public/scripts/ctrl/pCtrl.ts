"use strict";

namespace lssFinalApp.Controllers {

  export class pCtrl {

    public newPost;
    public onePost;
    public postsOwn;

    public user;
    public loggedInUser;

    public addNewPost() {
      let newPost = {
        timestamps: Date.now().toString(),
        title: this.newPost.title,
        imageUrl: this.newPost.imageUrl,
        postText: this.newPost.postText,
        origPoster: this.loggedInUser._id,
        origPosterName: this.loggedInUser.username
      };
      this.pSvc.savePost(newPost).then((res) => {
        this.$location.path(this.loggedInUser.username);
      });
    };

    public viewPost(title) {
      this.$location.path(this.onePost.origPosterName + "/" + this.onePost.title);
    }

    constructor(
      private pSvc: lssFinalApp.Services.pSvc,
      private uSvc: lssFinalApp.Services.uSvc,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService,
      private $window: ng.IWindowService
    ) {
      this.onePost = pSvc.getPost($routeParams["title"]);
      this.user = uSvc.loadUHome($routeParams["username"]);
      this.loggedInUser = this.loggedInUser = uSvc.loadUHome(this.$window.localStorage.getItem("username"));
    };
  };

  angular.module("lssFinalApp").controller("pCtrl", pCtrl);
};
