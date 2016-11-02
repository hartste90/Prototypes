
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

@authors
Julian Popescu - https://github.com/jpopesculian
Rick Huizinga - https://plus.google.com/+RickHuizinga
 */

(function() {
  angular.module("google-maps").directive("circle", [
    "$log", "$timeout", "GmapUtil", "EventsHelper", function($log, $timeout, GmapUtil, EventsHelper) {
      "use strict";
      var DEFAULTS;
      DEFAULTS = {};
      return {
        restrict: "ECA",
        replace: true,
        require: "^googleMap",
        scope: {
          center: "=center",
          radius: "=radius",
          stroke: "=stroke",
          fill: "=fill",
          clickable: "=",
          draggable: "=",
          editable: "=",
          geodesic: "=",
          icons: "=icons",
          visible: "=",
          events: "="
        },
        link: function(scope, element, attrs, mapCtrl) {
          return $timeout(function() {
            var buildOpts, circle, map;
            buildOpts = function() {
              var opts;
              if (!GmapUtil.validateCoords(scope.center)) {
                $log.error("circle: no valid center attribute found");
                return;
              }
              opts = angular.extend({}, DEFAULTS, {
                map: map,
                center: GmapUtil.getCoords(scope.center),
                radius: scope.radius,
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
            circle = new google.maps.Circle(buildOpts());
            scope.$watchCollection('center', function(newVals, oldVals) {
              if (newVals !== oldVals) {
                return circle.setOptions(buildOpts());
              }
            });
            scope.$watchCollection('stroke', function(newVals, oldVals) {
              if (newVals !== oldVals) {
                return circle.setOptions(buildOpts());
              }
            });
            scope.$watchCollection('fill', function(newVals, oldVals) {
              if (newVals !== oldVals) {
                return circle.setOptions(buildOpts());
              }
            });
            scope.$watch('radius', function(newVal, oldVal) {
              if (newVal !== oldVal) {
                return circle.setOptions(buildOpts());
              }
            });
            scope.$watch('clickable', function(newVal, oldVal) {
              if (newVal !== oldVal) {
                return circle.setOptions(buildOpts());
              }
            });
            scope.$watch('editable', function(newVal, oldVal) {
              if (newVal !== oldVal) {
                return circle.setOptions(buildOpts());
              }
            });
            scope.$watch('draggable', function(newVal, oldVal) {
              if (newVal !== oldVal) {
                return circle.setOptions(buildOpts());
              }
            });
            scope.$watch('visible', function(newVal, oldVal) {
              if (newVal !== oldVal) {
                return circle.setOptions(buildOpts());
              }
            });
            scope.$watch('geodesic', function(newVal, oldVal) {
              if (newVal !== oldVal) {
                return circle.setOptions(buildOpts());
              }
            });
            EventsHelper.setEvents(circle, scope, scope);
            google.maps.event.addListener(circle, 'radius_changed', function() {
              scope.radius = circle.getRadius();
              return $timeout(function() {
                return scope.$apply();
              });
            });
            google.maps.event.addListener(circle, 'center_changed', function() {
              if (angular.isDefined(scope.center.type)) {
                scope.center.coordinates[1] = circle.getCenter().lat();
                scope.center.coordinates[0] = circle.getCenter().lng();
              } else {
                scope.center.latitude = circle.getCenter().lat();
                scope.center.longitude = circle.getCenter().lng();
              }
              return $timeout(function() {
                return scope.$apply();
              });
            });
            return scope.$on("$destroy", function() {
              return circle.setMap(null);
            });
          });
        }
      };
    }
  ]);

}).call(this);
