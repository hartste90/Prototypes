
/*
	- interface directive for all window(s) to derrive from
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api").factory("IWindow", [
    "BaseObject", "ChildEvents", "Logger", function(BaseObject, ChildEvents, Logger) {
      var IWindow;
      return IWindow = (function(_super) {
        __extends(IWindow, _super);

        IWindow.include(ChildEvents);

        function IWindow($timeout, $compile, $http, $templateCache) {
          var self;
          this.$timeout = $timeout;
          this.$compile = $compile;
          this.$http = $http;
          this.$templateCache = $templateCache;
          this.link = __bind(this.link, this);
          self = this;
          this.restrict = 'ECMA';
          this.template = void 0;
          this.transclude = true;
          this.priority = -100;
          this.require = void 0;
          this.replace = true;
          this.scope = {
            coords: '=coords',
            show: '=show',
            templateUrl: '=templateurl',
            templateParameter: '=templateparameter',
            isIconVisibleOnClick: '=isiconvisibleonclick',
            closeClick: '&closeclick',
            options: '=options'
          };
          this.$log = Logger;
        }

        IWindow.prototype.link = function(scope, element, attrs, ctrls) {
          throw new Exception("Not Implemented!!");
        };

        return IWindow;

      })(BaseObject);
    }
  ]);

}).call(this);
