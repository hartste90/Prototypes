(function() {
  describe("PropMap tests", function() {
    beforeEach(function() {
      angular.mock.module('google-maps.directives.api.models.parent');
      return inject((function(_this) {
        return function(PropMap) {
          return _this.PropMap = PropMap;
        };
      })(this));
    });
    it("should construct", function() {
      var propMap;
      propMap = new this.PropMap();
      return expect(propMap != null).toEqual(true);
    });
    return describe("PropMap method tests", function() {
      beforeEach(function() {
        return this.propMap = new this.PropMap();
      });
      it("should have initial length 0", function() {
        return expect(this.propMap.length).toEqual(0);
      });
      it("should return undefined initially", function() {
        return expect(this.propMap.get('foo')).toEqual(void 0);
      });
      it("should return what is put", function() {
        this.propMap.put('foo', 'bar');
        return expect(this.propMap.get('foo')).toEqual('bar');
      });
      it("should remove and reflect length", function() {
        this.propMap.put('foo', 'bar');
        expect(this.propMap.length).toEqual(1);
        this.propMap.remove('foo');
        expect(this.propMap.get('foo')).toEqual(void 0);
        return expect(this.propMap.length).toEqual(0);
      });
      it("should return all put values", function() {
        var expected, i, item, values, _i, _len, _results;
        this.propMap.put('foo', 'bar');
        this.propMap.put('baz', 'biz');
        values = this.propMap.values();
        expected = ['bar', 'biz'];
        _results = [];
        for (i = _i = 0, _len = expected.length; _i < _len; i = ++_i) {
          item = expected[i];
          _results.push(expect(values[i]).toEqual(item));
        }
        return _results;
      });
      return it("should return all put keys", function() {
        var expected, i, item, keys, _i, _len, _results;
        this.propMap.put('foo', 'bar');
        this.propMap.put('baz', 'biz');
        keys = this.propMap.keys();
        expected = ['foo', 'baz'];
        _results = [];
        for (i = _i = 0, _len = expected.length; _i < _len; i = ++_i) {
          item = expected[i];
          _results.push(expect(keys[i]).toEqual(item));
        }
        return _results;
      });
    });
  });

}).call(this);
