
/*
!
The MIT License

Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

angular-google-maps
https://github.com/nlaplante/angular-google-maps

@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
Chentsu Lin - https://github.com/ChenTsuLin
 */

(function() {
  angular.module("google-maps").directive("rectangle", [
    "$log", "$timeout", function($log, $timeout) {
      var DEFAULTS, convertBoundPoints, fitMapBounds, isTrue, validateBoundPoints;
      validateBoundPoints = function(bounds) {
        if (angular.isUndefined(bounds.sw.latitude) || angular.isUndefined(bounds.sw.longitude) || angular.isUndefined(bounds.ne.latitude) || angular.isUndefined(bounds.ne.longitude)) {
          return false;
        }
        return true;
      };
      convertBoundPoints = function(bounds) {
        var result;
        result = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.sw.latitude, bounds.sw.longitude), new google.maps.LatLng(bounds.ne.latitude, bounds.ne.longitude));
        return result;
      };
      fitMapBounds = function(map, bounds) {
        return map.fitBounds(bounds);
      };

      /*
      Check if a value is true
       */
      isTrue = function(val) {
        return angular.isDefined(val) && val !== null && val === true || val === "1" || val === "y" || val === "true";
      };
      "use strict";
      DEFAULTS = {};
      return {
        restrict: "ECA",
        require: "^googleMap",
        replace: true,
        scope: {
          bounds: "=",
          stroke: "=",
          clickable: "=",
          draggable: "=",
          editable: "=",
          fill: "=",
          visible: "="
        },
        link: function(scope, element, attrs, mapCtrl) {
          if (angular.isUndefined(scope.bounds) || scope.bounds === null || angular.isUndefined(scope.bounds.sw) || scope.bounds.sw === null || angular.isUndefined(scope.bounds.ne) || scope.bounds.ne === null || !validateBoundPoints(scope.bounds)) {
            $log.error("rectangle: no valid bound attribute found");
            return;
          }
          return $timeout(function() {
            var buildOpts, dragging, map, rectangle, settingBoundsFromScope;
            buildOpts = function(bounds) {
              var opts;
              opts = angular.extend({}, DEFAULTS, {
                map: map,
                bounds: bounds,
                strokeColor: scope.stroke && scope.stroke.color,
                strokeOpacity: scope.stroke && scope.stroke.opacity,
                strokeWeight: scope.stroke && scope.stroke.weight,
                fillColor: scope.fill && scope.fill.color,
                fillOpacity: scope.fill && scope.fill.opacity
              });
              angular.forEach({
                clickable: true,
                draggable: false,
                editable: false,
                visible: true
              }, function(defaultValue, key) {
                if (angular.isUndefined(scope[key]) || scope[key] === null) {
                  return opts[key] = defaultValue;
                } else {
                  return opts[key] = scope[key];
                }
              });
              return opts;
            };
            map = mapCtrl.getMap();
            rectangle = new google.maps.Rectangle(buildOpts(convertBoundPoints(scope.bounds)));
            if (isTrue(attrs.fit)) {
              fitMapBounds(map, bounds);
            }
            dragging = false;
            google.maps.event.addListener(rectangle, "mousedown", function() {
              google.maps.event.addListener(rectangle, "mousemove", function() {
                dragging = true;
                return _.defer(function() {
                  return scope.$apply(function(s) {
                    if (s.dragging != null) {
                      return s.dragging = dragging;
                    }
                  });
                });
              });
              google.maps.event.addListener(rectangle, "mouseup", function() {
                google.maps.event.clearListeners(rectangle, 'mousemove');
                google.maps.event.clearListeners(rectangle, 'mouseup');
                dragging = false;
                return _.defer(function() {
                  return scope.$apply(function(s) {
                    if (s.dragging != null) {
                      return s.dragging = dragging;
                    }
                  });
                });
              });
            });
            settingBoundsFromScope = false;
            google.maps.event.addListener(rectangle, "bounds_changed", function() {
              var b, ne, sw;
              b = rectangle.getBounds();
              ne = b.getNorthEast();
              sw = b.getSouthWest();
              if (settingBoundsFromScope) {
                return;
              }
              return _.defer(function() {
                return scope.$apply(function(s) {
                  if (!rectangle.dragging) {
                    if (s.bounds !== null && s.bounds !== undefined && s.bounds !== void 0) {
                      s.bounds.ne = {
                        latitude: ne.lat(),
                        longitude: ne.lng()
                      };
                      s.bounds.sw = {
                        latitude: sw.lat(),
                        longitude: sw.lng()
                      };
                    }
                  }
                });
              });
            });
            scope.$watch("bounds", (function(newValue, oldValue) {
              var bounds;
              if (_.isEqual(newValue, oldValue)) {
                return;
              }
              settingBoundsFromScope = true;
              if (!dragging) {
                if ((newValue.sw.latitude == null) || (newValue.sw.longitude == null) || (newValue.ne.latitude == null) || (newValue.ne.longitude == null)) {
                  $log.error("Invalid bounds for newValue: " + (JSON.stringify(newValue)));
                }
                bounds = new google.maps.LatLngBounds(new google.maps.LatLng(newValue.sw.latitude, newValue.sw.longitude), new google.maps.LatLng(newValue.ne.latitude, newValue.ne.longitude));
                rectangle.setBounds(bounds);
              }
              return settingBoundsFromScope = false;
            }), true);
            if (angular.isDefined(scope.editable)) {
              scope.$watch("editable", function(newValue, oldValue) {
                return rectangle.setEditable(newValue);
              });
            }
            if (angular.isDefined(scope.draggable)) {
              scope.$watch("draggable", function(newValue, oldValue) {
                return rectangle.setDraggable(newValue);
              });
            }
            if (angular.isDefined(scope.visible)) {
              scope.$watch("visible", function(newValue, oldValue) {
                return rectangle.setVisible(newValue);
              });
            }
            if (angular.isDefined(scope.stroke)) {
              if (angular.isDefined(scope.stroke.color)) {
                scope.$watch("stroke.color", function(newValue, oldValue) {
                  return rectangle.setOptions(buildOpts(rectangle.getBounds()));
                });
              }
              if (angular.isDefined(scope.stroke.weight)) {
                scope.$watch("stroke.weight", function(newValue, oldValue) {
                  return rectangle.setOptions(buildOpts(rectangle.getBounds()));
                });
              }
              if (angular.isDefined(scope.stroke.opacity)) {
                scope.$watch("stroke.opacity", function(newValue, oldValue) {
                  return rectangle.setOptions(buildOpts(rectangle.getBounds()));
                });
              }
            }
            if (angular.isDefined(scope.fill)) {
              if (angular.isDefined(scope.fill.color)) {
                scope.$watch("fill.color", function(newValue, oldValue) {
                  return rectangle.setOptions(buildOpts(rectangle.getBounds()));
                });
              }
              if (angular.isDefined(scope.fill.opacity)) {
                scope.$watch("fill.opacity", function(newValue, oldValue) {
                  return rectangle.setOptions(buildOpts(rectangle.getBounds()));
                });
              }
            }
            return scope.$on("$destroy", function() {
              return rectangle.setMap(null);
            });
          });
        }
      };
    }
  ]);

}).call(this);
