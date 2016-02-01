"use strict";
namespace lssFinalApp.Services {
  angular.module('lssFinalApp').factory('HTTPFactory', ($window: ng.IWindowService) => {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        config.headers['Accepts'] = 'application/json';
        config.headers['Content-Type'] = 'application/json';
        if ($window.localStorage.getItem('token')) {
          // Bearer token
          config.headers['Authorization'] = `Bearer ${$window.localStorage.getItem('token')}`;
        }
        return config;
      }
    }
  });
}
