"use strict";

namespace lssFinalApp.Controllers {

  export class cCtrl {

    public onePost;

    public newComment;
    public oneComment;

    public loggedInUser;

    public addNewComment() {
      let newComment = {
        timestamps: Date.now().toString(),
        commentText: this.newComment.commentText,
        postedTo: this.onePost._id,
        postedToTitle: this.onePost.title,
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
      this.onePost = pSvc.getPost($routeParams["title"]);
      this.loggedInUser = uSvc.loadUHome(this.$window.localStorage.getItem("username"));
      this.oneComment = cSvc.getComment($routeParams["_id"]);
    };
  };

  angular.module("lssFinalApp").controller("cCtrl", cCtrl);
};
