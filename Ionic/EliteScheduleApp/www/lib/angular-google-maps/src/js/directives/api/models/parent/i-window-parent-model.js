
/*
	- interface directive for all window(s) to derrive from
 */

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.parent").factory("IWindowParentModel", [
    "ModelKey", "GmapUtil", "Logger", function(ModelKey, GmapUtil, Logger) {
      var IWindowParentModel;
      IWindowParentModel = (function(_super) {
        __extends(IWindowParentModel, _super);

        IWindowParentModel.include(GmapUtil);

        IWindowParentModel.prototype.DEFAULTS = {};

        function IWindowParentModel(scope, element, attrs, ctrls, $timeout, $compile, $http, $templateCache) {
          var self;
          IWindowParentModel.__super__.constructor.call(this, scope);
          self = this;
          this.$log = Logger;
          this.$timeout = $timeout;
          this.$compile = $compile;
          this.$http = $http;
          this.$templateCache = $templateCache;
          if (scope.options != null) {
            this.DEFAULTS = scope.options;
          }
        }

        return IWindowParentModel;

      })(ModelKey);
      return IWindowParentModel;
    }
  ]);

}).call(this);
