
/*
	- interface for all labels to derrive from
 	- to enforce a minimum set of requirements
 		- attributes
 			- content
 			- anchor
		- implementation needed on watches
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api").factory("ILabel", [
    "BaseObject", "Logger", function(BaseObject, Logger) {
      var ILabel;
      return ILabel = (function(_super) {
        __extends(ILabel, _super);

        function ILabel($timeout) {
          this.link = __bind(this.link, this);
          var self;
          self = this;
          this.restrict = 'ECMA';
          this.replace = true;
          this.template = void 0;
          this.require = void 0;
          this.transclude = true;
          this.priority = -100;
          this.scope = {
            labelContent: '=content',
            labelAnchor: '@anchor',
            labelClass: '@class',
            labelStyle: '=style'
          };
          this.$log = Logger;
          this.$timeout = $timeout;
        }

        ILabel.prototype.link = function(scope, element, attrs, ctrl) {
          throw new Exception("Not Implemented!!");
        };

        return ILabel;

      })(BaseObject);
    }
  ]);

}).call(this);
