(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api").factory("Windows", [
    "IWindow", "WindowsParentModel", function(IWindow, WindowsParentModel) {

      /*
      Windows directive where many windows map to the models property
       */
      var Windows;
      return Windows = (function(_super) {
        __extends(Windows, _super);

        function Windows($timeout, $compile, $http, $templateCache, $interpolate) {
          this.link = __bind(this.link, this);
          var self;
          Windows.__super__.constructor.call(this, $timeout, $compile, $http, $templateCache);
          self = this;
          this.$interpolate = $interpolate;
          this.require = ['^googleMap', '^?markers'];
          this.template = '<span class="angular-google-maps-windows" ng-transclude></span>';
          this.scope.idKey = '=idkey';
          this.scope.doRebuildAll = '=dorebuildall';
          this.scope.models = '=models';
          this.$log.info(this);
        }

        Windows.prototype.link = function(scope, element, attrs, ctrls) {
          return new WindowsParentModel(scope, element, attrs, ctrls, this.$timeout, this.$compile, this.$http, this.$templateCache, this.$interpolate);
        };

        return Windows;

      })(IWindow);
    }
  ]);

}).call(this);
