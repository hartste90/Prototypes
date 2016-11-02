(function() {
  describe("ModelKey Tests", function() {
    beforeEach(function() {
      angular.mock.module("google-maps.directives.api.utils");
      return inject((function(_this) {
        return function($rootScope, ModelKey) {
          _this.scope = $rootScope.$new();
          return _this.subject = new ModelKey(_this.scope);
        };
      })(this));
    });
    it("should eval model handle correctly", function() {
      var model;
      model = {
        key: 'key'
      };
      expect(this.subject.evalModelHandle()).toEqual(void 0);
      expect(this.subject.evalModelHandle(model, 'self')).toEqual(model);
      expect(this.subject.evalModelHandle(model, 'key')).toEqual('key');
      return expect(this.subject.evalModelHandle(model, 'foo')).toEqual(void 0);
    });
    it("should properly compare models", function() {
      var model1, model2;
      model1 = {
        coords: {
          latitude: 41,
          longitude: -27
        }
      };
      model2 = {
        coords: {
          latitude: 40,
          longitude: -27
        }
      };
      expect(this.subject.modelKeyComparison).toThrow("No scope or parentScope set!");
      this.scope.coords = 'coords';
      expect(this.subject.modelKeyComparison(model1, model1)).toEqual(true);
      return expect(this.subject.modelKeyComparison(model1, model2)).toEqual(false);
    });
    return it("should properly set id key", function() {
      expect(this.subject.idKey).toEqual(void 0);
      expect(this.subject.setIdKey(this.scope)).toEqual('id');
      this.scope.idKey = 'foo';
      return expect(this.subject.setIdKey(this.scope)).toEqual('foo');
    });
  });

}).call(this);
