(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.utils").factory("FitHelper", [
    "BaseObject", "Logger", function(BaseObject, $log) {
      var FitHelper;
      return FitHelper = (function(_super) {
        __extends(FitHelper, _super);

        function FitHelper() {
          return FitHelper.__super__.constructor.apply(this, arguments);
        }

        FitHelper.prototype.fit = function(gMarkers, gMap) {
          var bounds, everSet;
          if (gMap && gMarkers && gMarkers.length > 0) {
            bounds = new google.maps.LatLngBounds();
            everSet = false;
            return _async.each(gMarkers, (function(_this) {
              return function(gMarker) {
                if (gMarker) {
                  if (!everSet) {
                    everSet = true;
                  }
                  return bounds.extend(gMarker.getPosition());
                }
              };
            })(this), (function(_this) {
              return function() {
                if (everSet) {
                  return gMap.fitBounds(bounds);
                }
              };
            })(this));
          }
        };

        return FitHelper;

      })(BaseObject);
    }
  ]);

}).call(this);
