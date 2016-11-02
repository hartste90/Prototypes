(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api").factory("Map", [
    "$timeout", "Logger", "GmapUtil", "BaseObject", function($timeout, Logger, GmapUtil, BaseObject) {
      "use strict";
      var $log, DEFAULTS, Map;
      $log = Logger;
      DEFAULTS = {
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      return Map = (function(_super) {
        __extends(Map, _super);

        Map.include(GmapUtil);

        function Map() {
          this.link = __bind(this.link, this);
          var self;
          self = this;
        }

        Map.prototype.restrict = "ECMA";

        Map.prototype.transclude = true;

        Map.prototype.replace = false;

        Map.prototype.template = "<div class=\"angular-google-map\"><div class=\"angular-google-map-container\"></div><div ng-transclude style=\"display: none\"></div></div>";

        Map.prototype.scope = {
          center: "=center",
          zoom: "=zoom",
          dragging: "=dragging",
          control: "=",
          windows: "=windows",
          options: "=options",
          events: "=events",
          styles: "=styles",
          bounds: "=bounds"
        };

        Map.prototype.controller = [
          "$scope", function($scope) {
            return {
              getMap: function() {
                return $scope.map;
              }
            };
          }
        ];


        /*
        @param scope
        @param element
        @param attrs
         */

        Map.prototype.link = function(scope, element, attrs) {
          var dragging, el, eventName, getEventHandler, opts, settingCenterFromScope, type, _m;
          if (!this.validateCoords(scope.center)) {
            $log.error("angular-google-maps: could not find a valid center property");
            return;
          }
          if (!angular.isDefined(scope.zoom)) {
            $log.error("angular-google-maps: map zoom property not set");
            return;
          }
          el = angular.element(element);
          el.addClass("angular-google-map");
          opts = {
            options: {}
          };
          if (attrs.options) {
            opts.options = scope.options;
          }
          if (attrs.styles) {
            opts.styles = scope.styles;
          }
          if (attrs.type) {
            type = attrs.type.toUpperCase();
            if (google.maps.MapTypeId.hasOwnProperty(type)) {
              opts.mapTypeId = google.maps.MapTypeId[attrs.type.toUpperCase()];
            } else {
              $log.error("angular-google-maps: invalid map type \"" + attrs.type + "\"");
            }
          }
          _m = new google.maps.Map(el.find("div")[1], angular.extend({}, DEFAULTS, opts, {
            center: this.getCoords(scope.center),
            draggable: this.isTrue(attrs.draggable),
            zoom: scope.zoom,
            bounds: scope.bounds
          }));
          dragging = false;
          google.maps.event.addListener(_m, "dragstart", function() {
            dragging = true;
            return _.defer(function() {
              return scope.$apply(function(s) {
                if (s.dragging != null) {
                  return s.dragging = dragging;
                }
              });
            });
          });
          google.maps.event.addListener(_m, "dragend", function() {
            dragging = false;
            return _.defer(function() {
              return scope.$apply(function(s) {
                if (s.dragging != null) {
                  return s.dragging = dragging;
                }
              });
            });
          });
          google.maps.event.addListener(_m, "drag", function() {
            var c;
            c = _m.center;
            return _.defer(function() {
              return scope.$apply(function(s) {
                if (angular.isDefined(s.center.type)) {
                  s.center.coordinates[1] = c.lat();
                  return s.center.coordinates[0] = c.lng();
                } else {
                  s.center.latitude = c.lat();
                  return s.center.longitude = c.lng();
                }
              });
            });
          });
          google.maps.event.addListener(_m, "zoom_changed", function() {
            if (scope.zoom !== _m.zoom) {
              return _.defer(function() {
                return scope.$apply(function(s) {
                  return s.zoom = _m.zoom;
                });
              });
            }
          });
          settingCenterFromScope = false;
          google.maps.event.addListener(_m, "center_changed", function() {
            var c;
            c = _m.center;
            if (settingCenterFromScope) {
              return;
            }
            return _.defer(function() {
              return scope.$apply(function(s) {
                if (!_m.dragging) {
                  if (angular.isDefined(s.center.type)) {
                    if (s.center.coordinates[1] !== c.lat()) {
                      s.center.coordinates[1] = c.lat();
                    }
                    if (s.center.coordinates[0] !== c.lng()) {
                      return s.center.coordinates[0] = c.lng();
                    }
                  } else {
                    if (s.center.latitude !== c.lat()) {
                      s.center.latitude = c.lat();
                    }
                    if (s.center.longitude !== c.lng()) {
                      return s.center.longitude = c.lng();
                    }
                  }
                }
              });
            });
          });
          google.maps.event.addListener(_m, "idle", function() {
            var b, ne, sw;
            b = _m.getBounds();
            ne = b.getNorthEast();
            sw = b.getSouthWest();
            return _.defer(function() {
              return scope.$apply(function(s) {
                if (s.bounds !== null && s.bounds !== undefined && s.bounds !== void 0) {
                  s.bounds.northeast = {
                    latitude: ne.lat(),
                    longitude: ne.lng()
                  };
                  return s.bounds.southwest = {
                    latitude: sw.lat(),
                    longitude: sw.lng()
                  };
                }
              });
            });
          });
          if (angular.isDefined(scope.events) && scope.events !== null && angular.isObject(scope.events)) {
            getEventHandler = function(eventName) {
              return function() {
                return scope.events[eventName].apply(scope, [_m, eventName, arguments]);
              };
            };
            for (eventName in scope.events) {
              if (scope.events.hasOwnProperty(eventName) && angular.isFunction(scope.events[eventName])) {
                google.maps.event.addListener(_m, eventName, getEventHandler(eventName));
              }
            }
          }
          scope.map = _m;
          if ((attrs.control != null) && (scope.control != null)) {
            scope.control.refresh = (function(_this) {
              return function(maybeCoords) {
                var coords;
                if (_m == null) {
                  return;
                }
                google.maps.event.trigger(_m, "resize");
                if (((maybeCoords != null ? maybeCoords.latitude : void 0) != null) && ((maybeCoords != null ? maybeCoords.latitude : void 0) != null)) {
                  coords = _this.getCoords(maybeCoords);
                  if (_this.isTrue(attrs.pan)) {
                    return _m.panTo(coords);
                  } else {
                    return _m.setCenter(coords);
                  }
                }
              };
            })(this);

            /*
            I am sure you all will love this. You want the instance here you go.. BOOM!
             */
            scope.control.getGMap = (function(_this) {
              return function() {
                return _m;
              };
            })(this);
          }
          scope.$watch("center", ((function(_this) {
            return function(newValue, oldValue) {
              var coords;
              coords = _this.getCoords(newValue);
              if (coords.lat() === _m.center.lat() && coords.lng() === _m.center.lng()) {
                return;
              }
              settingCenterFromScope = true;
              if (!dragging) {
                if (!_this.validateCoords(newValue)) {
                  $log.error("Invalid center for newValue: " + (JSON.stringify(newValue)));
                }
                if (_this.isTrue(attrs.pan) && scope.zoom === _m.zoom) {
                  _m.panTo(coords);
                } else {
                  _m.setCenter(coords);
                }
              }
              return settingCenterFromScope = false;
            };
          })(this)), true);
          scope.$watch("zoom", function(newValue, oldValue) {
            if (newValue === _m.zoom) {
              return;
            }
            return _.defer(function() {
              return _m.setZoom(newValue);
            });
          });
          scope.$watch("bounds", function(newValue, oldValue) {
            var bounds, ne, sw;
            if (newValue === oldValue) {
              return;
            }
            if ((newValue.northeast.latitude == null) || (newValue.northeast.longitude == null) || (newValue.southwest.latitude == null) || (newValue.southwest.longitude == null)) {
              $log.error("Invalid map bounds for new value: " + (JSON.stringify(newValue)));
              return;
            }
            ne = new google.maps.LatLng(newValue.northeast.latitude, newValue.northeast.longitude);
            sw = new google.maps.LatLng(newValue.southwest.latitude, newValue.southwest.longitude);
            bounds = new google.maps.LatLngBounds(sw, ne);
            return _m.fitBounds(bounds);
          });
          scope.$watch("options", (function(_this) {
            return function(newValue, oldValue) {
              if (!_.isEqual(newValue, oldValue)) {
                opts.options = newValue;
                if (_m != null) {
                  return _m.setOptions(opts);
                }
              }
            };
          })(this), true);
          return scope.$watch("styles", (function(_this) {
            return function(newValue, oldValue) {
              if (!_.isEqual(newValue, oldValue)) {
                opts.styles = newValue;
                if (_m != null) {
                  return _m.setOptions(opts);
                }
              }
            };
          })(this), true);
        };

        return Map;

      })(BaseObject);
    }
  ]);

}).call(this);
