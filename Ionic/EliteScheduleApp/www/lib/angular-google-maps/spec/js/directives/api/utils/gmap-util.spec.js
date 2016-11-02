(function() {
  describe("utils.gmap-util", function() {
    beforeEach(function() {
      module("google-maps.directives.api.utils");
      module("google-maps.mocks");
      return inject((function(_this) {
        return function(GmapUtil, GoogleApiMock) {
          _this.subject = GmapUtil;
          _this.gmap = new GoogleApiMock();
          _this.gmap.mockAPI();
          _this.gmap.mockMVCArray();
          _this.gmap.mockPoint();
          _this.gmap.mockLatLng();
          return _this.gmap.mockLatLngBounds();
        };
      })(this));
    });
    describe("should validate the path correctly", function() {
      it("latlong", function() {
        var latlong;
        latlong = {
          longitude: 45,
          latitude: -27
        };
        expect(this.subject.validatePath([latlong, latlong])).toEqual(true);
        return expect(this.subject.validatePath([latlong])).toEqual(false);
      });
      it("empty array", function() {
        return expect(this.subject.validatePath([])).toEqual(false);
      });
      it("array of invalid objects", function() {
        return expect(this.subject.validatePath([{}, {}])).toEqual(false);
      });
      it("Polygon", function() {
        expect(this.subject.validatePath({
          type: "Polygon"
        })).toEqual(false);
        expect(this.subject.validatePath({
          type: "Polygon",
          coordinates: [
            (function() {
              var _i, _results;
              _results = [];
              for (_i = 1; _i <= 4; _i++) {
                _results.push([1, 2]);
              }
              return _results;
            })()
          ]
        })).toEqual(true);
        return expect(this.subject.validatePath({
          type: "Polygon",
          coordinates: [
            (function() {
              var _i, _results;
              _results = [];
              for (_i = 1; _i <= 1; _i++) {
                _results.push([1, 2]);
              }
              return _results;
            })()
          ]
        })).toEqual(false);
      });
      it("Polygon", function() {
        expect(this.subject.validatePath({
          type: "LineString",
          coordinates: (function() {
            var _i, _results;
            _results = [];
            for (_i = 1; _i <= 2; _i++) {
              _results.push([1, 2]);
            }
            return _results;
          })()
        })).toEqual(true);
        expect(this.subject.validatePath({
          type: "LineString",
          coordinates: (function() {
            var _i, _results;
            _results = [];
            for (_i = 1; _i <= 1; _i++) {
              _results.push([1, 2]);
            }
            return _results;
          })()
        })).toEqual(false);
        return expect(this.subject.validatePath({
          type: "LineString",
          coordinates: (function() {
            var _i, _results;
            _results = [];
            for (_i = 1; _i <= 2; _i++) {
              _results.push([]);
            }
            return _results;
          })()
        })).toEqual(false);
      });
      return it("foo", function() {
        return expect(this.subject.validatePath({
          type: "foo",
          coordinates: []
        })).toEqual(false);
      });
    });
    describe("should validate coordinates correctly", function() {
      it("basic", function() {
        expect(this.subject.validateCoords()).toEqual(false);
        expect(this.subject.validateCoords([1, 2])).toEqual(true);
        return expect(this.subject.validateCoords([])).toEqual(false);
      });
      it("type:Point", function() {
        expect(this.subject.validateCoords({
          type: "Point",
          coordinates: [1, 2]
        })).toEqual(true);
        return expect(this.subject.validateCoords({
          type: "Point",
          coordinates: []
        })).toEqual(false);
      });
      it("type:foo, no lat lon", function() {
        return expect(this.subject.validateCoords({
          type: "foo",
          coordinates: []
        })).toEqual(false);
      });
      return it("type:foo, w lat lon", function() {
        return expect(this.subject.validateCoords({
          type: "foo",
          latitude: 45,
          longitude: 150
        })).toEqual(true);
      });
    });
    it("should evaluate truthiness correctly", function() {
      expect(this.subject.isTrue(true)).toEqual(true);
      expect(this.subject.isTrue("true")).toEqual(true);
      expect(this.subject.isTrue("1")).toEqual(true);
      expect(this.subject.isTrue("y")).toEqual(true);
      expect(this.subject.isTrue()).toEqual(false);
      return expect(this.subject.isTrue(null)).toEqual(false);
    });
    it("should evaluate falsiness correctly", function() {
      expect(this.subject.isFalse('false')).toEqual(true);
      expect(this.subject.isFalse('FALSE')).toEqual(true);
      expect(this.subject.isFalse(0)).toEqual(true);
      expect(this.subject.isFalse('n')).toEqual(true);
      expect(this.subject.isFalse('N')).toEqual(true);
      expect(this.subject.isFalse('no')).toEqual(true);
      expect(this.subject.isFalse('NO')).toEqual(true);
      return expect(this.subject.isFalse(false)).toEqual(false);
    });
    it("should convert path points correctly", function() {
      var latlong;
      latlong = {
        longitude: 45,
        latitude: -27
      };
      expect(this.subject.convertPathPoints([]).getLength()).toEqual(0);
      expect(this.subject.convertPathPoints([latlong]).getLength()).toEqual(1);
      expect(this.subject.convertPathPoints({
        type: "Polygon",
        coordinates: [
          (function() {
            var _i, _results;
            _results = [];
            for (_i = 1; _i <= 4; _i++) {
              _results.push([1, 2]);
            }
            return _results;
          })()
        ]
      }).getLength()).toEqual(4);
      return expect(this.subject.convertPathPoints({
        type: "LineString",
        coordinates: (function() {
          var _i, _results;
          _results = [];
          for (_i = 1; _i <= 4; _i++) {
            _results.push([1, 2]);
          }
          return _results;
        })()
      }).getLength()).toEqual(4);
    });
    it("should increase coverage", function() {
      var latlong;
      latlong = {
        longitude: 45,
        latitude: -27
      };
      this.subject.getCoords(latlong);
      this.subject.getLabelPositionPoint("0 1");
      return this.subject.extendMapBounds({
        fitBounds: function(bounds) {
          return void 0;
        }
      }, []);
    });
    it("(getLabelPositionPoint) should convert decimal coordinates separated by a space into a map Point object", function() {
      var testCases;
      testCases = [
        {
          input: '22 0',
          expected: {
            x: 22,
            y: 0
          }
        }, {
          input: '1 2',
          expected: {
            x: 1,
            y: 2
          }
        }, {
          input: '1.0 2.3',
          expected: {
            x: 1.0,
            y: 2.3
          }
        }, {
          input: '-1 -2',
          expected: {
            x: -1,
            y: -2
          }
        }
      ];
      return testCases.forEach((function(_this) {
        return function(testCase) {
          var result;
          result = _this.subject.getLabelPositionPoint(testCase.input);
          expect(result.x).toEqual(testCase.expected.x);
          return expect(result.y).toEqual(testCase.expected.y);
        };
      })(this));
    });
    return it("(getLabelPositionPoint) should ignore coordinate strings not following the format", function() {
      var testCases;
      testCases = [' 1 2 ', 'a b', '1,2'];
      return testCases.forEach((function(_this) {
        return function(testCase) {
          var result;
          return result = _this.subject.getLabelPositionPoint(testCase.input);
        };
      })(this));
    });
  });

}).call(this);
