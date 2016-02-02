"use strict";

namespace lssFinalApp.Controllers {

  export class cCtrl {

    public onePost;

    public newComment;
    public comment;

    public user;
    public loggedInUser;

    public addComment() {
      let newComment = {
        timestamps: Date.now().toString,
        commentText: this.newComment.commentText,
        postedTo: this.onePost._id,
        commenter: this.loggedInUser._id,
        commenterName: this.loggedInUser.username
      };
      this.cSvc.saveComment(newComment).then((res) => {
        this.$location.path(this.onePost.origPosterName + "/" + this.onePost.title);
      });
    };

    constructor(
      private cSvc: lssFinalApp.Services.cSvc,
      private pSvc: lssFinalApp.Services.pSvc,
      private uSvc: lssFinalApp.Services.uSvc,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService,
      private $window: ng.IWindowService
    ) {
      this.onePost = this.onePost = pSvc.getPost($routeParams["title"]);
      this.loggedInUser = uSvc.loadUHome(this.$window.localStorage.getItem("username"));
    };
  };

  angular.module("lssFinalApp").controller("cCtrl", cCtrl);
};