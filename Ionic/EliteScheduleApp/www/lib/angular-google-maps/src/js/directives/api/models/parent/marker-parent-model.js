
/*
	Basic Directive api for a marker. Basic in the sense that this directive contains 1:1 on scope and model.
	Thus there will be one html element per marker within the directive.
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.parent").factory("MarkerParentModel", [
    "IMarkerParentModel", "GmapUtil", "EventsHelper", function(IMarkerParentModel, GmapUtil, EventsHelper) {
      var MarkerParentModel;
      MarkerParentModel = (function(_super) {
        __extends(MarkerParentModel, _super);

        MarkerParentModel.include(GmapUtil);

        MarkerParentModel.include(EventsHelper);

        function MarkerParentModel(scope, element, attrs, mapCtrl, $timeout, gMarkerManager, doFit) {
          var self;
          this.gMarkerManager = gMarkerManager;
          this.doFit = doFit;
          this.onDestroy = __bind(this.onDestroy, this);
          this.setGMarker = __bind(this.setGMarker, this);
          this.onWatch = __bind(this.onWatch, this);
          this.onTimeOut = __bind(this.onTimeOut, this);
          MarkerParentModel.__super__.constructor.call(this, scope, element, attrs, mapCtrl, $timeout);
          self = this;
        }

        MarkerParentModel.prototype.onTimeOut = function(scope) {
          var opts;
          opts = this.createMarkerOptions(scope.coords, scope.icon, scope.options, this.mapCtrl.getMap());
          this.setGMarker(new google.maps.Marker(opts));
          google.maps.event.addListener(this.scope.gMarker, 'click', (function(_this) {
            return function() {
              if (_this.doClick && (scope.click != null)) {
                return _this.$timeout(function() {
                  return _this.scope.click();
                });
              }
            };
          })(this));
          this.setEvents(this.scope.gMarker, scope, scope);
          return this.$log.info(this);
        };

        MarkerParentModel.prototype.onWatch = function(propNameToWatch, scope) {
          switch (propNameToWatch) {
            case 'coords':
              if (this.validateCoords(scope.coords) && (this.scope.gMarker != null)) {
                this.scope.gMarker.setMap(this.mapCtrl.getMap());
                this.scope.gMarker.setPosition(this.getCoords(scope.coords));
                this.scope.gMarker.setVisible(this.validateCoords(scope.coords));
                return this.scope.gMarker.setOptions(scope.options);
              } else {
                return this.scope.gMarker.setMap(null);
              }
              break;
            case 'icon':
              if ((scope.icon != null) && this.validateCoords(scope.coords) && (this.scope.gMarker != null)) {
                this.scope.gMarker.setOptions(scope.options);
                this.scope.gMarker.setIcon(scope.icon);
                this.scope.gMarker.setMap(null);
                this.scope.gMarker.setMap(this.mapCtrl.getMap());
                this.scope.gMarker.setPosition(this.getCoords(scope.coords));
                return this.scope.gMarker.setVisible(this.validateCoords(scope.coords));
              }
              break;
            case 'options':
              if (this.validateCoords(scope.coords) && (scope.icon != null) && scope.options) {
                if (this.scope.gMarker != null) {
                  this.scope.gMarker.setMap(null);
                }
                return this.setGMarker(new google.maps.Marker(this.createMarkerOptions(scope.coords, scope.icon, scope.options, this.mapCtrl.getMap())));
              }
          }
        };

        MarkerParentModel.prototype.setGMarker = function(gMarker) {
          if (this.scope.gMarker) {
            delete this.scope.gMarker;
            this.gMarkerManager.remove(this.scope.gMarker, false);
          }
          this.scope.gMarker = gMarker;
          if (this.scope.gMarker) {
            this.gMarkerManager.add(this.scope.gMarker, false);
            if (this.doFit) {
              return this.gMarkerManager.fit();
            }
          }
        };

        MarkerParentModel.prototype.onDestroy = function(scope) {
          var self;
          if (!this.scope.gMarker) {
            self = void 0;
            return;
          }
          this.scope.gMarker.setMap(null);
          this.gMarkerManager.remove(this.scope.gMarker, false);
          delete this.scope.gMarker;
          return self = void 0;
        };

        return MarkerParentModel;

      })(IMarkerParentModel);
      return MarkerParentModel;
    }
  ]);

}).call(this);
