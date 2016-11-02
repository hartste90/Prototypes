(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.managers").factory("MarkerManager", [
    "Logger", "FitHelper", function(Logger, FitHelper) {
      var MarkerManager;
      MarkerManager = (function(_super) {
        __extends(MarkerManager, _super);

        MarkerManager.include(FitHelper);

        function MarkerManager(gMap, opt_markers, opt_options) {
          this.fit = __bind(this.fit, this);
          this.handleOptDraw = __bind(this.handleOptDraw, this);
          this.clear = __bind(this.clear, this);
          this.draw = __bind(this.draw, this);
          this.removeMany = __bind(this.removeMany, this);
          this.remove = __bind(this.remove, this);
          this.addMany = __bind(this.addMany, this);
          this.add = __bind(this.add, this);
          var self;
          MarkerManager.__super__.constructor.call(this);
          self = this;
          this.gMap = gMap;
          this.gMarkers = [];
          this.$log = Logger;
          this.$log.info(this);
        }

        MarkerManager.prototype.add = function(gMarker, optDraw, redraw) {
          if (redraw == null) {
            redraw = true;
          }
          this.handleOptDraw(gMarker, optDraw, redraw);
          return this.gMarkers.push(gMarker);
        };

        MarkerManager.prototype.addMany = function(gMarkers) {
          var gMarker, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = gMarkers.length; _i < _len; _i++) {
            gMarker = gMarkers[_i];
            _results.push(this.add(gMarker));
          }
          return _results;
        };

        MarkerManager.prototype.remove = function(gMarker, optDraw) {
          var index, tempIndex;
          this.handleOptDraw(gMarker, optDraw, false);
          if (!optDraw) {
            return;
          }
          index = void 0;
          if (this.gMarkers.indexOf != null) {
            index = this.gMarkers.indexOf(gMarker);
          } else {
            tempIndex = 0;
            _.find(this.gMarkers, function(marker) {
              tempIndex += 1;
              if (marker === gMarker) {
                index = tempIndex;
              }
            });
          }
          if (index != null) {
            return this.gMarkers.splice(index, 1);
          }
        };

        MarkerManager.prototype.removeMany = function(gMarkers) {
          return this.gMarkers.forEach((function(_this) {
            return function(marker) {
              return _this.remove(marker);
            };
          })(this));
        };

        MarkerManager.prototype.draw = function() {
          var deletes;
          deletes = [];
          this.gMarkers.forEach((function(_this) {
            return function(gMarker) {
              if (!gMarker.isDrawn) {
                if (gMarker.doAdd) {
                  gMarker.setMap(_this.gMap);
                  return gMarker.isDrawn = true;
                } else {
                  return deletes.push(gMarker);
                }
              }
            };
          })(this));
          return deletes.forEach((function(_this) {
            return function(gMarker) {
              gMarker.isDrawn = false;
              return _this.remove(gMarker, true);
            };
          })(this));
        };

        MarkerManager.prototype.clear = function() {
          var gMarker, _i, _len, _ref;
          _ref = this.gMarkers;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            gMarker = _ref[_i];
            gMarker.setMap(null);
          }
          delete this.gMarkers;
          return this.gMarkers = [];
        };

        MarkerManager.prototype.handleOptDraw = function(gMarker, optDraw, doAdd) {
          if (optDraw === true) {
            if (doAdd) {
              gMarker.setMap(this.gMap);
            } else {
              gMarker.setMap(null);
            }
            return gMarker.isDrawn = true;
          } else {
            gMarker.isDrawn = false;
            return gMarker.doAdd = doAdd;
          }
        };

        MarkerManager.prototype.fit = function() {
          return MarkerManager.__super__.fit.call(this, this.gMarkers, this.gMap);
        };

        return MarkerManager;

      })(FitHelper);
      return MarkerManager;
    }
  ]);

}).call(this);
