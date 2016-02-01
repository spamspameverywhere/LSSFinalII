"use strict";

namespace lssFinalApp.Controllers {

  export class uHomeCtrl {

    public user;
    public loggedInUser;

    constructor(
      private uSvc: lssFinalApp.Services.uSvc,
      private pSvc: lssFinalApp.Services.pSvc,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService,
      private $window: ng.IWindowService
    ) {
      this.user = uSvc.loadUHome($routeParams["username"]);
      this.loggedInUser = uSvc.loadUHome(this.$window.localStorage.getItem("username"));
    };
  };

  angular.module("lssFinalApp").controller("uHomeCtrl", uHomeCtrl);
};
