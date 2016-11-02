
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

@authors Bruno Queiroz, creativelikeadog@gmail.com
 */


/*
Marker label directive

This directive is used to create a marker label on an existing map.

{attribute content required}  content of the label
{attribute anchor required}    string that contains the x and y point position of the label
{attribute class optional} class to DOM object
{attribute style optional} style for the label
 */


/*
Basic Directive api for a label. Basic in the sense that this directive contains 1:1 on scope and model.
Thus there will be one html element per marker within the directive.
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps").directive("markerLabel", [
    "$timeout", "ILabel", "MarkerLabelChildModel", "GmapUtil", function($timeout, ILabel, MarkerLabelChildModel, GmapUtil) {
      var Label;
      Label = (function(_super) {
        __extends(Label, _super);

        function Label($timeout) {
          this.link = __bind(this.link, this);
          var self;
          Label.__super__.constructor.call(this, $timeout);
          self = this;
          this.require = '^marker';
          this.template = '<span class="angular-google-maps-marker-label" ng-transclude></span>';
          this.$log.info(this);
        }

        Label.prototype.link = function(scope, element, attrs, ctrl) {
          return this.$timeout((function(_this) {
            return function() {
              var label, markerCtrl;
              markerCtrl = ctrl.getMarkerScope().gMarker;
              if (markerCtrl != null) {
                label = new MarkerLabelChildModel(markerCtrl, scope);
              }
              return scope.$on("$destroy", function() {
                return label.destroy();
              });
            };
          })(this), GmapUtil.defaultDelay + 25);
        };

        return Label;

      })(ILabel);
      return new Label($timeout);
    }
  ]);

}).call(this);
