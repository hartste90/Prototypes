
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

  angular.module("google-maps.directives.api.models.parent").factory("IMarkerParentModel", [
    "ModelKey", "Logger", function(ModelKey, Logger) {
      var IMarkerParentModel;
      IMarkerParentModel = (function(_super) {
        __extends(IMarkerParentModel, _super);

        IMarkerParentModel.prototype.DEFAULTS = {};

        function IMarkerParentModel(scope, element, attrs, mapCtrl, $timeout) {
          var self;
          this.scope = scope;
          this.element = element;
          this.attrs = attrs;
          this.mapCtrl = mapCtrl;
          this.$timeout = $timeout;
          this.linkInit = __bind(this.linkInit, this);
          this.onDestroy = __bind(this.onDestroy, this);
          this.onWatch = __bind(this.onWatch, this);
          this.watch = __bind(this.watch, this);
          this.validateScope = __bind(this.validateScope, this);
          this.onTimeOut = __bind(this.onTimeOut, this);
          IMarkerParentModel.__super__.constructor.call(this, this.scope);
          self = this;
          this.$log = Logger;
          if (!this.validateScope(scope)) {
            throw new String("Unable to construct IMarkerParentModel due to invalid scope");
          }
          this.doClick = angular.isDefined(attrs.click);
          if (scope.options != null) {
            this.DEFAULTS = scope.options;
          }
          this.$timeout((function(_this) {
            return function() {
              _this.onTimeOut(scope);
              _this.watch('coords', _this.scope);
              _this.watch('icon', _this.scope);
              _this.watch('options', _this.scope);
              return scope.$on("$destroy", function() {
                return _this.onDestroy(scope);
              });
            };
          })(this));
        }

        IMarkerParentModel.prototype.onTimeOut = function(scope) {};

        IMarkerParentModel.prototype.validateScope = function(scope) {
          var ret;
          if (scope == null) {
            this.$log.error(this.constructor.name + ": invalid scope used");
            return false;
          }
          ret = scope.coords != null;
          if (!ret) {
            this.$log.error(this.constructor.name + ": no valid coords attribute found");
            return false;
          }
          return ret;
        };

        IMarkerParentModel.prototype.watch = function(propNameToWatch, scope) {
          var watchFunc;
          watchFunc = (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return _this.onWatch(propNameToWatch, scope, newValue, oldValue);
              }
            };
          })(this);
          return scope.$watch(propNameToWatch, watchFunc, true);
        };

        IMarkerParentModel.prototype.onWatch = function(propNameToWatch, scope, newValue, oldValue) {
          throw new String("OnWatch Not Implemented!!");
        };

        IMarkerParentModel.prototype.onDestroy = function(scope) {
          throw new String("OnDestroy Not Implemented!!");
        };

        IMarkerParentModel.prototype.linkInit = function(element, mapCtrl, scope, animate) {
          throw new String("LinkInit Not Implemented!!");
        };

        return IMarkerParentModel;

      })(ModelKey);
      return IMarkerParentModel;
    }
  ]);

}).call(this);
