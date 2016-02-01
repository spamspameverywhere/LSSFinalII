"use strict";
var lssFinalApp;
(function (lssFinalApp) {
    var Services;
    (function (Services) {
        angular.module('lssFinalApp').factory('HTTPFactory', function ($window) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    config.headers['Accepts'] = 'application/json';
                    config.headers['Content-Type'] = 'application/json';
                    if ($window.localStorage.getItem('token')) {
                        config.headers['Authorization'] = "Bearer " + $window.localStorage.getItem('token');
                    }
                    return config;
                }
            };
        });
    })(Services = lssFinalApp.Services || (lssFinalApp.Services = {}));
})(lssFinalApp || (lssFinalApp = {}));
