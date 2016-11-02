(function() {
  describe("MarkerParentModel", function() {
    afterEach(function() {
      return window.google.maps = this.gMapsTemp;
    });
    beforeEach(function() {
      var self;
      module("google-maps.mocks");
      angular.module('mockModule', ["google-maps"]).value('mapCtrl', {
        getMap: function() {
          return document.gMap;
        }
      }).value('element', {}).value('attrs', {
        click: true
      }).value('model', {}).value('scope', this.scope);
      module("mockModule");
      inject((function(_this) {
        return function(GoogleApiMock) {
          _this.gmap = new GoogleApiMock();
          _this.gmap.mockAPI();
          _this.gmap.mockAnimation();
          _this.gmap.mockLatLng();
          _this.gmap.mockMarker();
          return _this.gmap.mockEvent();
        };
      })(this));
      this.gMapsTemp = window.google.maps;
      this.index = 0;
      this.clicked = false;
      self = this;
      this.scope = {
        icon: 'icon.png',
        coords: {
          latitude: 90,
          longitude: 90
        },
        options: {
          animation: google.maps.Animation.BOUNCE
        },
        events: {
          click: function(marker, eventName, args) {
            self.clicked = true;
            return self.gMarkerSetEvent = marker;
          }
        }
      };
      this.googleMapListeners = [];
      window.google.maps.event.addListener = (function(_this) {
        return function(thing, eventName, callBack) {
          var found, toPush;
          found = _.find(_this.googleMapListeners, function(obj) {
            return obj.obj === thing;
          });
          if (found == null) {
            toPush = {};
            toPush.obj = thing;
            toPush.events = {};
            toPush.events[eventName] = callBack;
            return _this.googleMapListeners.push(toPush);
          } else {
            return found.events[eventName] = callBack;
          }
        };
      })(this);
      this.fireListener = (function(_this) {
        return function(thing, eventName) {
          var found;
          found = _.find(_this.googleMapListeners, function(obj) {
            return obj.obj === thing;
          });
          if (found != null) {
            return found.events[eventName](found.obj);
          }
        };
      })(this);
      inject((function(_this) {
        return function($rootScope, $timeout, element, attrs, mapCtrl, MarkerParentModel, MarkerManager) {
          var scope;
          scope = $rootScope.$new();
          _this.scope = _.extend(_this.scope, scope);
          _this.testCtor = MarkerParentModel;
          _this.subject = new MarkerParentModel(_this.scope, element, attrs, mapCtrl, $timeout, new MarkerManager(mapCtrl.getMap()), false);
          return $timeout.flush();
        };
      })(this));
      return this.subject.setEvents(this, this.scope);
    });
    it('constructor exist', function() {
      return expect(this.testCtor != null).toEqual(true);
    });
    it('can be created', function() {
      return expect(this.subject != null).toEqual(true);
    });
    return describe("validateScope", function() {
      it('returns fals with scope undefined', function() {
        return expect(this.subject.validateScope(void 0)).toEqual(false);
      });
      it('returns fals with scope.coords undefined', function() {
        return expect(this.subject.validateScope({
          coords: void 0
        })).toEqual(false);
      });
      it('returns fals with scope.coords,latitude undefined', function() {
        return expect(this.subject.validateScope({
          coords: {
            latitude: void 0,
            longitude: {}
          }
        })).toEqual(true);
      });
      it('returns fals with scope.coords.longtitude undefined', function() {
        return expect(this.subject.validateScope({
          coords: {
            latitude: {},
            longitude: void 0
          }
        })).toEqual(true);
      });
      it('fake googleMapListeners can be fired - to prove mocke of google.maps.event.addListener works', function() {
        var testPass;
        testPass = false;
        window.google.maps.event.addListener(this, "junk", (function(_this) {
          return function() {
            return testPass = true;
          };
        })(this));
        this.fireListener(this, "junk");
        return expect(testPass).toBeTruthy();
      });
      it("googleMapListeners is fired through MarkerParentModel's scope.events", function() {
        expect(this.clicked).toBeFalsy();
        this.fireListener(this, "click");
        return expect(this.clicked).toBeTruthy();
      });
      return xit("googleMapListeners is fired through MarkerParentModel's scope.events with an optional marker", function() {
        expect(this.gMarkerSetEvent).toBeUndefined();
        this.fireListener(this.subject.scope.gMarker, "click");
        expect(this.gMarkerSetEvent).toBeDefined();
        return expect(this.gMarkerSetEvent.position).toBeDefined();
      });
    });
  });

}).call(this);
