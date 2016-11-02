
/*
	- interface for all markers to derrive from
 	- to enforce a minimum set of requirements
 		- attributes
 			- coords
 			- icon
		- implementation needed on watches
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api").factory("IMarker", [
    "Logger", "BaseObject", function(Logger, BaseObject) {
      var IMarker;
      return IMarker = (function(_super) {
        __extends(IMarker, _super);

        function IMarker($timeout) {
          this.link = __bind(this.link, this);
          var self;
          self = this;
          this.$log = Logger;
          this.$timeout = $timeout;
          this.restrict = 'ECMA';
          this.require = '^googleMap';
          this.priority = -1;
          this.transclude = true;
          this.replace = true;
          this.scope = {
            coords: '=coords',
            icon: '=icon',
            click: '&click',
            options: '=options',
            events: '=events',
            fit: '=fit'
          };
        }

        IMarker.prototype.controller = [
          '$scope', '$element', function($scope, $element) {
            throw new Exception("Not Implemented!!");
          }
        ];

        IMarker.prototype.link = function(scope, element, attrs, ctrl) {
          throw new Exception("Not implemented!!");
        };

        return IMarker;

      })(BaseObject);
    }
  ]);

}).call(this);
