
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
Rick Huizinga - https://plus.google.com/+RickHuizinga
 */

(function() {
  angular.module("google-maps").directive("polygon", [
    "$log", "$timeout", "array-sync", "GmapUtil", function($log, $timeout, arraySync, GmapUtil) {

      /*
      Check if a value is true
       */
      var DEFAULTS, isTrue;
      isTrue = function(val) {
        return angular.isDefined(val) && val !== null && val === true || val === "1" || val === "y" || val === "true";
      };
      "use strict";
      DEFAULTS = {};
      return {
        restrict: "ECA",
        replace: true,
        require: "^googleMap",
        scope: {
          path: "=path",
          stroke: "=stroke",
          clickable: "=",
          draggable: "=",
          editable: "=",
          geodesic: "=",
          fill: "=",
          icons: "=icons",
          visible: "=",
          "static": "=",
          events: "=",
          zIndex: "=zindex",
          fit: "="
        },
        link: function(scope, element, attrs, mapCtrl) {
          if (angular.isUndefined(scope.path) || scope.path === null || !GmapUtil.validatePath(scope.path)) {
            $log.error("polygon: no valid path attribute found");
            return;
          }
          return $timeout(function() {
            var arraySyncer, buildOpts, eventName, getEventHandler, map, pathPoints, polygon;
            buildOpts = function(pathPoints) {
              var opts;
              opts = angular.extend({}, DEFAULTS, {
                map: map,
                path: pathPoints,
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
                geodesic: false,
                visible: true,
                "static": false,
                fit: false,
                zIndex: 0
              }, function(defaultValue, key) {
                if (angular.isUndefined(scope[key]) || scope[key] === null) {
                  return opts[key] = defaultValue;
                } else {
                  return opts[key] = scope[key];
                }
              });
              if (opts["static"]) {
                opts.editable = false;
              }
              return opts;
            };
            map = mapCtrl.getMap();
            pathPoints = GmapUtil.convertPathPoints(scope.path);
            polygon = new google.maps.Polygon(buildOpts(pathPoints));
            if (scope.fit) {
              GmapUtil.extendMapBounds(map, pathPoints);
            }
            if (!scope["static"] && angular.isDefined(scope.editable)) {
              scope.$watch("editable", function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return polygon.setEditable(newValue);
                }
              });
            }
            if (angular.isDefined(scope.draggable)) {
              scope.$watch("draggable", function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return polygon.setDraggable(newValue);
                }
              });
            }
            if (angular.isDefined(scope.visible)) {
              scope.$watch("visible", function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return polygon.setVisible(newValue);
                }
              });
            }
            if (angular.isDefined(scope.geodesic)) {
              scope.$watch("geodesic", function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return polygon.setOptions(buildOpts(polygon.getPath()));
                }
              });
            }
            if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.opacity)) {
              scope.$watch("stroke.opacity", function(newValue, oldValue) {
                return polygon.setOptions(buildOpts(polygon.getPath()));
              });
            }
            if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.weight)) {
              scope.$watch("stroke.weight", function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return polygon.setOptions(buildOpts(polygon.getPath()));
                }
              });
            }
            if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.color)) {
              scope.$watch("stroke.color", function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return polygon.setOptions(buildOpts(polygon.getPath()));
                }
              });
            }
            if (angular.isDefined(scope.fill) && angular.isDefined(scope.fill.color)) {
              scope.$watch("fill.color", function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return polygon.setOptions(buildOpts(polygon.getPath()));
                }
              });
            }
            if (angular.isDefined(scope.fill) && angular.isDefined(scope.fill.opacity)) {
              scope.$watch("fill.opacity", function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return polygon.setOptions(buildOpts(polygon.getPath()));
                }
              });
            }
            if (angular.isDefined(scope.zIndex)) {
              scope.$watch("zIndex", function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return polygon.setOptions(buildOpts(polygon.getPath()));
                }
              });
            }
            if (angular.isDefined(scope.events) && scope.events !== null && angular.isObject(scope.events)) {
              getEventHandler = function(eventName) {
                return function() {
                  return scope.events[eventName].apply(scope, [polygon, eventName, arguments]);
                };
              };
              for (eventName in scope.events) {
                if (scope.events.hasOwnProperty(eventName) && angular.isFunction(scope.events[eventName])) {
                  polygon.addListener(eventName, getEventHandler(eventName));
                }
              }
            }
            arraySyncer = arraySync(polygon.getPath(), scope, "path", function(pathPoints) {
              if (scope.fit) {
                return GmapUtil.extendMapBounds(map, pathPoints);
              }
            });
            return scope.$on("$destroy", function() {
              polygon.setMap(null);
              if (arraySyncer) {
                arraySyncer();
                return arraySyncer = null;
              }
            });
          });
        }
      };
    }
  ]);

}).call(this);
