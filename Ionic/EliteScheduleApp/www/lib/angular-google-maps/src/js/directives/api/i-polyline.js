(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api").factory("IPolyline", [
    "GmapUtil", "BaseObject", "Logger", function(GmapUtil, BaseObject, Logger) {
      var IPolyline;
      return IPolyline = (function(_super) {
        __extends(IPolyline, _super);

        IPolyline.include(GmapUtil);

        function IPolyline() {
          var self;
          self = this;
        }

        IPolyline.prototype.restrict = "ECA";

        IPolyline.prototype.replace = true;

        IPolyline.prototype.require = "^googleMap";

        IPolyline.prototype.scope = {
          path: "=",
          stroke: "=",
          clickable: "=",
          draggable: "=",
          editable: "=",
          geodesic: "=",
          icons: "=",
          visible: "=",
          "static": "=",
          fit: "="
        };

        IPolyline.prototype.DEFAULTS = {};

        IPolyline.prototype.$log = Logger;

        return IPolyline;

      })(BaseObject);
    }
  ]);

}).call(this);
