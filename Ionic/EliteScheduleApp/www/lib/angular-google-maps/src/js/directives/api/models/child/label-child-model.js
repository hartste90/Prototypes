(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.child").factory("MarkerLabelChildModel", [
    "BaseObject", "GmapUtil", function(BaseObject, GmapUtil) {
      var MarkerLabelChildModel;
      MarkerLabelChildModel = (function(_super) {
        __extends(MarkerLabelChildModel, _super);

        MarkerLabelChildModel.include(GmapUtil);

        function MarkerLabelChildModel(gMarker, opt_options) {
          this.destroy = __bind(this.destroy, this);
          this.draw = __bind(this.draw, this);
          this.setPosition = __bind(this.setPosition, this);
          this.setZIndex = __bind(this.setZIndex, this);
          this.setVisible = __bind(this.setVisible, this);
          this.setAnchor = __bind(this.setAnchor, this);
          this.setMandatoryStyles = __bind(this.setMandatoryStyles, this);
          this.setStyles = __bind(this.setStyles, this);
          this.setContent = __bind(this.setContent, this);
          this.setTitle = __bind(this.setTitle, this);
          this.getSharedCross = __bind(this.getSharedCross, this);
          var self, _ref, _ref1;
          MarkerLabelChildModel.__super__.constructor.call(this);
          self = this;
          this.marker = gMarker;
          this.marker.set("labelContent", opt_options.labelContent);
          this.marker.set("labelAnchor", this.getLabelPositionPoint(opt_options.labelAnchor));
          this.marker.set("labelClass", opt_options.labelClass || 'labels');
          this.marker.set("labelStyle", opt_options.labelStyle || {
            opacity: 100
          });
          this.marker.set("labelInBackground", opt_options.labelInBackground || false);
          if (!opt_options.labelVisible) {
            this.marker.set("labelVisible", true);
          }
          if (!opt_options.raiseOnDrag) {
            this.marker.set("raiseOnDrag", true);
          }
          if (!opt_options.clickable) {
            this.marker.set("clickable", true);
          }
          if (!opt_options.draggable) {
            this.marker.set("draggable", false);
          }
          if (!opt_options.optimized) {
            this.marker.set("optimized", false);
          }
          opt_options.crossImage = (_ref = opt_options.crossImage) != null ? _ref : document.location.protocol + "//maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png";
          opt_options.handCursor = (_ref1 = opt_options.handCursor) != null ? _ref1 : document.location.protocol + "//maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur";
          this.markerLabel = new MarkerLabel_(this.marker, opt_options.crossImage, opt_options.handCursor);
          this.marker.set("setMap", function(theMap) {
            google.maps.Marker.prototype.setMap.apply(this, arguments);
            return self.markerLabel.setMap(theMap);
          });
          this.marker.setMap(this.marker.getMap());
        }

        MarkerLabelChildModel.prototype.getSharedCross = function(crossUrl) {
          return this.markerLabel.getSharedCross(crossUrl);
        };

        MarkerLabelChildModel.prototype.setTitle = function() {
          return this.markerLabel.setTitle();
        };

        MarkerLabelChildModel.prototype.setContent = function() {
          return this.markerLabel.setContent();
        };

        MarkerLabelChildModel.prototype.setStyles = function() {
          return this.markerLabel.setStyles();
        };

        MarkerLabelChildModel.prototype.setMandatoryStyles = function() {
          return this.markerLabel.setMandatoryStyles();
        };

        MarkerLabelChildModel.prototype.setAnchor = function() {
          return this.markerLabel.setAnchor();
        };

        MarkerLabelChildModel.prototype.setVisible = function() {
          return this.markerLabel.setVisible();
        };

        MarkerLabelChildModel.prototype.setZIndex = function() {
          return this.markerLabel.setZIndex();
        };

        MarkerLabelChildModel.prototype.setPosition = function() {
          return this.markerLabel.setPosition();
        };

        MarkerLabelChildModel.prototype.draw = function() {
          return this.markerLabel.draw();
        };

        MarkerLabelChildModel.prototype.destroy = function() {
          if ((this.markerLabel.labelDiv_.parentNode != null) && (this.markerLabel.eventDiv_.parentNode != null)) {
            return this.markerLabel.onRemove();
          }
        };

        return MarkerLabelChildModel;

      })(BaseObject);
      return MarkerLabelChildModel;
    }
  ]);

}).call(this);
