(function() {
  angular.element(document).ready(function() {
    if (!(google || (typeof google !== "undefined" && google !== null ? google.maps : void 0) || (google.maps.InfoWindow != null))) {
      return;
    }
    google.maps.InfoWindow.prototype._open = google.maps.InfoWindow.prototype.open;
    google.maps.InfoWindow.prototype._close = google.maps.InfoWindow.prototype.close;
    google.maps.InfoWindow.prototype._isOpen = false;
    google.maps.InfoWindow.prototype.open = function(map, anchor) {
      this._isOpen = true;
      this._open(map, anchor);
    };
    google.maps.InfoWindow.prototype.close = function() {
      this._isOpen = false;
      this._close();
    };
    google.maps.InfoWindow.prototype.isOpen = function(val) {
      if (val == null) {
        val = void 0;
      }
      if (val == null) {
        return this._isOpen;
      } else {
        return this._isOpen = val;
      }
    };

    /*
    Do the same for InfoBox
    TODO: Clean this up so the logic is defined once, wait until develop becomes master as this will be easier
     */
    if (!window.InfoBox) {
      return;
    }
    window.InfoBox.prototype._open = window.InfoBox.prototype.open;
    window.InfoBox.prototype._close = window.InfoBox.prototype.close;
    window.InfoBox.prototype._isOpen = false;
    window.InfoBox.prototype.open = function(map, anchor) {
      this._isOpen = true;
      this._open(map, anchor);
    };
    window.InfoBox.prototype.close = function() {
      this._isOpen = false;
      this._close();
    };
    return window.InfoBox.prototype.isOpen = function(val) {
      if (val == null) {
        val = void 0;
      }
      if (val == null) {
        return this._isOpen;
      } else {
        return this._isOpen = val;
      }
    };
  });

}).call(this);
