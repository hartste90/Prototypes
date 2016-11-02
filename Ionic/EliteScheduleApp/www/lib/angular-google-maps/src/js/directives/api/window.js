(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api").factory("Window", [
    "IWindow", "GmapUtil", "WindowChildModel", function(IWindow, GmapUtil, WindowChildModel) {
      var Window;
      return Window = (function(_super) {
        __extends(Window, _super);

        Window.include(GmapUtil);

        function Window($timeout, $compile, $http, $templateCache) {
          this.link = __bind(this.link, this);
          var self;
          Window.__super__.constructor.call(this, $timeout, $compile, $http, $templateCache);
          self = this;
          this.require = ['^googleMap', '^?marker'];
          this.template = '<span class="angular-google-maps-window" ng-transclude></span>';
          this.$log.info(self);
        }

        Window.prototype.link = function(scope, element, attrs, ctrls) {
          return this.$timeout((function(_this) {
            return function() {
              var defaults, hasScopeCoords, isIconVisibleOnClick, mapCtrl, markerCtrl, markerScope, opts, window;
              isIconVisibleOnClick = true;
              if (angular.isDefined(attrs.isiconvisibleonclick)) {
                isIconVisibleOnClick = scope.isIconVisibleOnClick;
              }
              mapCtrl = ctrls[0].getMap();
              markerCtrl = ctrls.length > 1 && (ctrls[1] != null) ? ctrls[1].getMarkerScope().gMarker : void 0;
              defaults = scope.options != null ? scope.options : {};
              hasScopeCoords = (scope != null) && _this.validateCoords(scope.coords);
              opts = hasScopeCoords ? _this.createWindowOptions(markerCtrl, scope, element.html(), defaults) : defaults;
              if (mapCtrl != null) {
                window = new WindowChildModel({}, scope, opts, isIconVisibleOnClick, mapCtrl, markerCtrl, element);
              }
              scope.$on("$destroy", function() {
                return window.destroy();
              });
              if (ctrls[1] != null) {
                markerScope = ctrls[1].getMarkerScope();
                markerScope.$watch('coords', function(newValue, oldValue) {
                  if (!_this.validateCoords(newValue)) {
                    return window.hideWindow();
                  }
                  if (!angular.equals(newValue, oldValue)) {
                    return window.getLatestPosition();
                  }
                }, true);
              }
              if ((_this.onChildCreation != null) && (window != null)) {
                return _this.onChildCreation(window);
              }
            };
          })(this), GmapUtil.defaultDelay + 25);
        };

        return Window;

      })(IWindow);
    }
  ]);

}).call(this);
