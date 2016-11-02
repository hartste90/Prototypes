(function() {
  describe("IMarkerParentModel", function() {
    beforeEach(function() {
      angular.mock.module("google-maps.directives.api.models.parent");
      this.clickCount = 0;
      return inject((function(_this) {
        return function($rootScope, $timeout, $compile, $http, $templateCache, $interpolate, IMarkerParentModel) {
          _this.rootScope = $rootScope;
          _this.scope = $rootScope.$new();
          _this.ele = $compile('<markers models="models"></markers>')(_this.scope);
          _this.attrs = {
            click: _this.click
          };
          _this.IMarkerParentModel = IMarkerParentModel;
          _this.$timeout = $timeout;
          return _this.scope.click = function() {
            return _this.clickCount++;
          };
        };
      })(this));
    });
    it("should instantiate", function() {
      var subject;
      this.scope.coords = {
        latitude: 47,
        longitude: -27
      };
      subject = new this.IMarkerParentModel(this.scope, this.ele, this.attrs, null, this.$timeout);
      return expect(subject != null).toEqual(true);
    });
    it("should validate a scope correctly", function() {
      var e;
      try {
        this.subject = new this.IMarkerParentModel(this.scope, this.ele, this.attrs, null, this.$timeout);
        expect(false).toEqual(true);
      } catch (_error) {
        e = _error;
        expect(e).toEqual("Unable to construct IMarkerParentModel due to invalid scope");
      }
      this.scope.coords = {
        latitude: 47,
        longitude: -27
      };
      this.subject = new this.IMarkerParentModel(this.scope, this.ele, this.attrs, null, this.$timeout);
      return expect(this.subject.validateScope(this.scope)).toEqual(true);
    });
    it("should call watch on timeout for correct properties", function() {
      var expectedProps, i, prop, props, _i, _len, _results;
      props = [];
      expectedProps = 'coords icon options'.split(' ');
      this.IMarkerParentModel.prototype.watch = (function(_this) {
        return function(prop, scope) {
          return props.push(prop);
        };
      })(this);
      this.scope.coords = {
        latitude: 47,
        longitude: -27
      };
      this.subject = new this.IMarkerParentModel(this.scope, this.ele, this.attrs, null, this.$timeout);
      this.$timeout.flush();
      _results = [];
      for (i = _i = 0, _len = expectedProps.length; _i < _len; i = ++_i) {
        prop = expectedProps[i];
        _results.push(expect(props[i]).toEqual(prop));
      }
      return _results;
    });
    return describe("IMarkerParentModel method tests", function() {
      beforeEach(function() {
        this.scope.coords = {
          latitude: 47,
          longitude: -27
        };
        return this.subject = new this.IMarkerParentModel(this.scope, this.ele, this.attrs, null, this.$timeout);
      });
      it("should throw onWatch", function() {
        return expect(this.subject.onWatch).toThrow();
      });
      it("should throw onDestroy", function() {
        return expect(this.subject.onDestroy).toThrow();
      });
      return it("should throw on linkInit", function() {
        return expect(this.subject.linkInit).toThrow();
      });
    });
  });

}).call(this);
