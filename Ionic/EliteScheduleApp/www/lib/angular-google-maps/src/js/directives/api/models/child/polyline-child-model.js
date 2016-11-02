(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api").factory("PolylineChildModel", [
    "BaseObject", "Logger", "$timeout", "array-sync", "GmapUtil", function(BaseObject, Logger, $timeout, arraySync, GmapUtil) {
      var $log, PolylineChildModel;
      $log = Logger;
      return PolylineChildModel = (function(_super) {
        __extends(PolylineChildModel, _super);

        PolylineChildModel.include(GmapUtil);

        function PolylineChildModel(scope, attrs, map, defaults, model) {
          var arraySyncer, pathPoints;
          this.scope = scope;
          this.attrs = attrs;
          this.map = map;
          this.defaults = defaults;
          this.model = model;
          this.buildOpts = __bind(this.buildOpts, this);
          pathPoints = this.convertPathPoints(scope.path);
          this.polyline = new google.maps.Polyline(this.buildOpts(pathPoints));
          if (scope.fit) {
            GmapUtil.extendMapBounds(map, pathPoints);
          }
          if (!scope["static"] && angular.isDefined(scope.editable)) {
            scope.$watch("editable", (function(_this) {
              return function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return _this.polyline.setEditable(newValue);
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.draggable)) {
            scope.$watch("draggable", (function(_this) {
              return function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return _this.polyline.setDraggable(newValue);
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.visible)) {
            scope.$watch("visible", (function(_this) {
              return function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return _this.polyline.setVisible(newValue);
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.geodesic)) {
            scope.$watch("geodesic", (function(_this) {
              return function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return _this.polyline.setOptions(_this.buildOpts(_this.polyline.getPath()));
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.weight)) {
            scope.$watch("stroke.weight", (function(_this) {
              return function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return _this.polyline.setOptions(_this.buildOpts(_this.polyline.getPath()));
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.color)) {
            scope.$watch("stroke.color", (function(_this) {
              return function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return _this.polyline.setOptions(_this.buildOpts(_this.polyline.getPath()));
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.opacity)) {
            scope.$watch("stroke.opacity", (function(_this) {
              return function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return _this.polyline.setOptions(_this.buildOpts(_this.polyline.getPath()));
                }
              };
            })(this));
          }
          if (angular.isDefined(scope.icons)) {
            scope.$watch("icons", (function(_this) {
              return function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return _this.polyline.setOptions(_this.buildOpts(_this.polyline.getPath()));
                }
              };
            })(this));
          }
          arraySyncer = arraySync(this.polyline.getPath(), scope, "path", (function(_this) {
            return function(pathPoints) {
              if (scope.fit) {
                return GmapUtil.extendMapBounds(map, pathPoints);
              }
            };
          })(this));
          scope.$on("$destroy", (function(_this) {
            return function() {
              _this.polyline.setMap(null);
              _this.polyline = null;
              _this.scope = null;
              if (arraySyncer) {
                arraySyncer();
                return arraySyncer = null;
              }
            };
          })(this));
          $log.info(this);
        }

        PolylineChildModel.prototype.buildOpts = function(pathPoints) {
          var opts;
          opts = angular.extend({}, this.defaults, {
            map: this.map,
            path: pathPoints,
            icons: this.scope.icons,
            strokeColor: this.scope.stroke && this.scope.stroke.color,
            strokeOpacity: this.scope.stroke && this.scope.stroke.opacity,
            strokeWeight: this.scope.stroke && this.scope.stroke.weight
          });
          angular.forEach({
            clickable: true,
            draggable: false,
            editable: false,
            geodesic: false,
            visible: true,
            "static": false,
            fit: false
          }, (function(_this) {
            return function(defaultValue, key) {
              if (angular.isUndefined(_this.scope[key]) || _this.scope[key] === null) {
                return opts[key] = defaultValue;
              } else {
                return opts[key] = _this.scope[key];
              }
            };
          })(this));
          if (opts["static"]) {
            opts.editable = false;
          }
          return opts;
        };

        PolylineChildModel.prototype.destroy = function() {
          return this.scope.$destroy();
        };

        return PolylineChildModel;

      })(BaseObject);
    }
  ]);

}).call(this);
