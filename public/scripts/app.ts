"use strict";

namespace lssFinalApp {

  angular.module("lssFinalApp", ["ngRoute", "ngResource", "ui.bootstrap"])
  .config((
    $routeProvider: ng.route.IRouteProvider,
    $locationProvider: ng.ILocationProvider,
    $httpProvider: ng.IHttpProvider
  ) => {

    $routeProvider.when("/", {
      templateUrl: "/public/templates/home.html",
      controller: lssFinalApp.Controllers.hCtrl,
      controllerAs: "vm"
    })

    .when("/register", {
      templateUrl: "/public/templates/register.html",
      controller: lssFinalApp.Controllers.uCtrl,
      controllerAs: "vm"
    })

    .when("/login", {
      templateUrl: "/public/templates/login.html",
      controller: lssFinalApp.Controllers.uCtrl,
      controllerAs: "vm"
    })

    .when("/:username", {
      templateUrl: "/public/templates/uHome.html",
      controller: lssFinalApp.Controllers.uHomeCtrl,
      controllerAs: "vm"
    })

    .when("/:username/addPost", {
      templateUrl: "/public/templates/addPost.html",
      controller: lssFinalApp.Controllers.pCtrl,
      controllerAs: "vm"
    })

    .when("/:username/:title", {
      templateUrl: "/public/templates/post.html",
      controller: lssFinalApp.Controllers.pCtrl,
      controllerAs: "vm"
    })

    .when("/:username/:title/addComment", {
      templateUrl: "/public/templates/addComment.html",
      controller: lssFinalApp.Controllers.cCtrl,
      controllerAs: "vm"
    })

    .otherwise({redirectTo: "/"});

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push("HTTPFactory");
  });
};
