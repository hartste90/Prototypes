(function() {
  describe("markers directive test", function() {
    beforeEach(function() {
      module("google-maps.mocks");
      module("google-maps");
      module("google-maps.directives.api.utils");
      return inject((function(_this) {
        return function($rootScope, $timeout, $compile, GoogleApiMock) {
          _this.rootScope = $rootScope;
          _this.timeout = $timeout;
          _this.compile = $compile;
          _this.apiMock = new GoogleApiMock();
          _this.apiMock.mockAPI();
          _this.apiMock.mockMap();
          _this.markerCount = 0;
          _this.marker = function(opts) {
            return _this.markerCount++;
          };
          _this.marker.prototype = _this.apiMock.getMarker().prototype;
          return _this.apiMock.mockMarker(_this.marker);
        };
      })(this));
    });
    return xit("should add markers for each object in model", function() {
      var element, html, scope;
      html = "<google-map draggable=\"true\" center=\"map.center\" zoom=\"map.zoom\">\n    <markers models=\"items\" coords=\"'self'\" ></markers>\n</google-map>";
      scope = this.rootScope.$new();
      scope.items = [];
      scope.map = {};
      scope.map.zoom = 12;
      scope.map.center = {
        longitude: 47,
        latitude: -27
      };
      scope.$watch('items', function(nv) {
        return console.log(nv);
      });
      element = this.compile(html)(scope);
      scope.$apply();
      expect(this.markerCount).toEqual(0);
      this.timeout((function(_this) {
        return function() {
          var toPush;
          toPush = {};
          toPush.latitude = 47;
          toPush.longitude = -27;
          return scope.items.push(toPush);
        };
      })(this));
      this.timeout.flush();
      return expect(this.markerCount).toEqual(1);
    });
  });

}).call(this);
