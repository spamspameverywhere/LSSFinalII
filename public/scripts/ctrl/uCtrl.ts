"use strict";

namespace lssFinalApp.Controllers {

  export class uCtrl {

    public newUser;
    public user;
    public loggedInUser;

    public register() {
      let newUser = {
      username: this.newUser.username,
      email: this.newUser.email,
      password: this.newUser.password,
      pwdConfirm: this.newUser.pwdConfirm
      };
      this.uSvc.registerUser(this.newUser).then((res) => {
        this.$window.localStorage.setItem("username", this.newUser.username);
        this.uSvc.setToken(res.token);
        this.uSvc.setUser();
        this.$location.path(this.newUser.username);
      });
    };

    public login() {
      this.uSvc.login(this.user).then((res) => {
        this.$window.localStorage.setItem("username", this.user.username);
        this.uSvc.setToken(res.token);
        this.uSvc.setUser();
        this.$location.path(this.user.username);
      });
    };

    constructor(
      private uSvc: lssFinalApp.Services.uSvc,
      private $location: ng.ILocationService,
      private $window: ng.IWindowService
    ) {
      this.loggedInUser = uSvc.loadUHome(this.$window.localStorage.getItem("username"));
    };
  };

  angular.module("lssFinalApp").controller("uCtrl", uCtrl);
};
