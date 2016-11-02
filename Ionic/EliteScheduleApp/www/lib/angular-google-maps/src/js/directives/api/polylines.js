(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api").factory("Polylines", [
    "IPolyline", "$timeout", "array-sync", "PolylinesParentModel", function(IPolyline, $timeout, arraySync, PolylinesParentModel) {
      var Polylines;
      return Polylines = (function(_super) {
        __extends(Polylines, _super);

        function Polylines() {
          this.link = __bind(this.link, this);
          Polylines.__super__.constructor.call(this);
          this.scope.idKey = '=idkey';
          this.scope.models = '=models';
          this.$log.info(this);
        }

        Polylines.prototype.link = function(scope, element, attrs, mapCtrl) {
          if (angular.isUndefined(scope.path) || scope.path === null) {
            this.$log.error("polylines: no valid path attribute found");
            return;
          }
          if (!scope.models) {
            this.$log.error("polylines: no models found to create from");
            return;
          }
          return $timeout((function(_this) {
            return function() {
              return new PolylinesParentModel(scope, element, attrs, mapCtrl.getMap(), _this.DEFAULTS);
            };
          })(this));
        };

        return Polylines;

      })(IPolyline);
    }
  ]);

}).call(this);
