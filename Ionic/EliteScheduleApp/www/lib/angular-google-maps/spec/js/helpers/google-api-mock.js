(function() {
  angular.module("google-maps.mocks", []).factory("GoogleApiMock", function() {
    var GoogleApiMock;
    GoogleApiMock = (function() {
      function GoogleApiMock() {}

      GoogleApiMock.prototype.mockAPI = function() {
        var unmocked;
        window.google = {};
        window.google.maps = {};
        unmocked = (function(_this) {
          return function(api) {
            return function() {
              throw new String("Unmocked API " + api);
            };
          };
        })(this);
        window.google.maps.Marker = unmocked("Marker");
        window.google.maps.event = {
          clearListeners: unmocked("event.clearListeners"),
          addListener: unmocked("event.addListener")
        };
        window.google.maps.OverlayView = unmocked("OverlayView");
        window.google.maps.InfoWindow = unmocked("InfoWindow");
        window.google.maps.LatLng = unmocked("LatLng");
        window.google.maps.MVCArray = unmocked("MVCArray");
        window.google.maps.Point = unmocked("Point");
        return window.google.maps.LatLngBounds = unmocked("LatLngBounds");
      };

      GoogleApiMock.prototype.mockLatLng = function(LatLng) {
        if (LatLng == null) {
          LatLng = function(x, y) {};
        }
        return window.google.maps.LatLng = LatLng;
      };

      GoogleApiMock.prototype.mockLatLngBounds = function(LatLngBounds) {
        if (LatLngBounds == null) {
          LatLngBounds = function() {};
        }
        if (!(LatLngBounds.extend != null)) {
          LatLngBounds.prototype.extend = function() {};
        }
        return window.google.maps.LatLngBounds = LatLngBounds;
      };

      GoogleApiMock.prototype.mockMap = function(Map) {
        if (Map == null) {
          Map = function() {};
        }
        this.mockMapTypeId();
        this.mockLatLng();
        this.mockOverlayView();
        this.mockEvent();
        Map.getCoords = function() {
          if (Map.getCoords == null) {
            return {
              latitude: 47,
              longitude: -27
            };
          }
        };
        return window.google.maps.Map = Map;
      };

      GoogleApiMock.prototype.mockAnimation = function(Animation) {
        if (Animation == null) {
          Animation = {
            BOUNCE: "bounce"
          };
        }
        return window.google.maps.Animation = Animation;
      };

      GoogleApiMock.prototype.mockMapTypeId = function(MapTypeId) {
        if (MapTypeId == null) {
          MapTypeId = {
            ROADMAP: "roadmap"
          };
        }
        return window.google.maps.MapTypeId = MapTypeId;
      };

      GoogleApiMock.prototype.mockOverlayView = function(OverlayView) {
        if (OverlayView == null) {
          OverlayView = OverlayView = (function() {
            function OverlayView() {}

            OverlayView.prototype.setMap = function() {};

            return OverlayView;

          })();
        }
        return window.google.maps.OverlayView = OverlayView;
      };

      GoogleApiMock.prototype.mockEvent = function(event) {
        var listeners;
        if (event == null) {
          event = {};
        }
        listeners = [];
        if (!event.addListener) {
          event.addListener = function(thing, eventName, callBack) {
            var found;
            return found = _.find(listeners, function(obj) {
              var toPush;
              obj.obj === thing;
              if (found == null) {
                toPush = {};
                toPush.obj = thing;
                toPush.events = {};
                toPush.events[eventName] = callBack;
                return listeners.push(toPush);
              } else {
                return found.events[eventName] = callBack;
              }
            });
          };
        }
        if (!event.clearListeners) {
          event.clearListeners = function() {
            return listeners.length = 0;
          };
        }
        if (!event.fireListener) {
          event.fireListener = (function(_this) {
            return function(thing, eventName) {
              var found;
              found = _.find(listeners, function(obj) {
                return obj.obj === thing;
              });
              if (found != null) {
                return found.events[eventName](found.obj);
              }
            };
          })(this);
        }
        return window.google.maps.event = event;
      };

      GoogleApiMock.prototype.mockInfoWindow = function(InfoWindow) {
        if (InfoWindow == null) {
          InfoWindow = function() {};
        }
        return window.google.maps.InfoWindow = InfoWindow;
      };

      GoogleApiMock.prototype.mockMarker = function(Marker) {
        if (Marker == null) {
          Marker = this.getMarker();
        }
        return window.google.maps.Marker = Marker;
      };

      GoogleApiMock.prototype.mockMVCArray = function() {
        var MVCArray;
        MVCArray = function() {
          this.values = [];
        };
        if (!(MVCArray.getLength != null)) {
          MVCArray.prototype.getLength = function() {
            return this.values.length;
          };
        }
        if (!(MVCArray.push != null)) {
          MVCArray.prototype.push = function(value) {
            return this.values.push(value);
          };
        }
        return window.google.maps.MVCArray = MVCArray;
      };

      GoogleApiMock.prototype.mockPoint = function(Point) {
        if (Point == null) {
          Point = function(x, y) {
            return {
              x: x,
              y: y
            };
          };
        }
        return window.google.maps.Point = Point;
      };

      GoogleApiMock.prototype.getMarker = function() {
        var Marker;
        Marker = function(opts) {};
        Marker.prototype.setMap = function(map) {};
        return Marker;
      };

      return GoogleApiMock;

    })();
    return GoogleApiMock;
  });

}).call(this);
