(function() {
  describe("MarkerChildModel", function() {
    beforeEach(function() {
      angular.module('mockModule', ["google-maps"]);
      module('mockModule');
      module("google-maps.mocks");
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
      this.index = 0;
      this.model = {
        icon: 'icon.png',
        coords: {
          latitude: 90,
          longitude: 90
        },
        options: {
          animation: google.maps.Animation.BOUNCE
        }
      };
      this.iconKey = 'icon';
      this.coordsKey = 'coords';
      this.optionsKey = 'options';
      return inject((function(_this) {
        return function($timeout, $rootScope, $controller, MarkerChildModel, MarkerManager) {
          var defaults, doClick, scope;
          scope = $rootScope.$new();
          scope.click = function() {};
          scope.icon = _this.iconKey;
          scope.coords = _this.coordsKey;
          scope.options = _this.optionsKey;
          return _this.subject = new MarkerChildModel(_this.model, scope, document.gMap, $timeout, defaults = {}, doClick = (function() {}), new MarkerManager(document.gMap, void 0, void 0));
        };
      })(this));
    });
    it('can be created', function() {
      expect(this.subject).toBeDefined();
      return expect(this.subject.scope).toBeDefined();
    });
    it('parentScope keys are set correctly', function() {
      expect(this.subject.iconKey).toEqual(this.iconKey);
      expect(this.subject.coordsKey).toEqual(this.coordsKey);
      return expect(this.subject.optionsKey).toEqual(this.optionsKey);
    });
    describe('evalModelHandle()', function() {
      it('scope values are equal to the model values by key', function() {
        expect(this.subject.__proto__.evalModelHandle(this.model, this.iconKey)).toEqual(this.model.icon);
        expect(this.subject.__proto__.evalModelHandle(this.model, this.coordsKey)).toEqual(this.model.coords);
        return expect(this.subject.__proto__.evalModelHandle(this.model, this.optionsKey)).toEqual(this.model.options);
      });
      it('updates an existing models properties via watch, icon', function() {
        this.model.icon = 'test.png';
        return expect(this.subject.__proto__.evalModelHandle(this.model, this.iconKey)).toEqual(this.model.icon);
      });
      it('updates an existing models properties via watch, coords', function() {
        this.model.coords.latitude = 91;
        return expect(this.subject.__proto__.evalModelHandle(this.model, this.coordsKey)).toEqual(this.model.coords);
      });
      it('updates an existing models properties via watch, options', function() {
        this.model.options = 'options2';
        return expect(this.subject.__proto__.evalModelHandle(this.model, this.optionsKey)).toEqual(this.model.options);
      });
      it('undefined model returns undefined', function() {
        return expect(this.subject.__proto__.evalModelHandle(void 0, this.optionsKey)).toEqual(void 0);
      });
      it('modelKey of self returns model', function() {
        return expect(this.subject.__proto__.evalModelHandle(this.model, 'self')).toEqual(this.model);
      });
      return it('modelKey of undefined returns undefined', function() {
        return expect(this.subject.__proto__.evalModelHandle(this.model, void 0)).toEqual(void 0);
      });
    });
    describe('maybeSetScopeValue()', function() {
      beforeEach(function() {
        this.gSetterCalled = false;
        this.isInit = false;
        return this.gSetter = (function(_this) {
          return function(scope) {
            return _this.gSetterCalled = true;
          };
        })(this);
      });
      return it("oldModel undefined, isInit false - changes scope's models value, and calls gSetter ", function() {
        var newModel;
        newModel = {
          icon: 'someIcon'
        };
        this.subject.scope.icon = 'junk';
        this.subject.maybeSetScopeValue('icon', newModel, void 0, this.iconKey, this.subject.__proto__.evalModelHandle, this.isInit, this.gSetter);
        expect(this.gSetterCalled).toEqual(true);
        return expect(this.subject.scope.icon).toEqual(newModel.icon);
      });
    });
    return describe('destroy()', function() {
      it('wipes internal scope', function() {
        this.subject.destroy();
        return expect(this.subject.scope.$$destroyed).toEqual(true);
      });
      return it('wipes gMarker', function() {
        this.subject.destroy();
        expect(this.subject.gMarker).toEqual(void 0);
        return expect(this.subject.gMarkerManager.gMarkers.length).toEqual(0);
      });
    });
  });

}).call(this);
