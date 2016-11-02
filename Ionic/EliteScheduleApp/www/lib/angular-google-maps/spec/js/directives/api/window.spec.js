(function() {
  describe("directives.api.Window", function() {
    beforeEach(function() {
      window.google;
      module("google-maps");
      module("google-maps.mocks");
      inject((function(_this) {
        return function(GoogleApiMock) {
          _this.gmap = new GoogleApiMock();
          _this.gmap.mockAPI();
          _this.gmap.mockLatLng();
          _this.gmap.mockMarker();
          _this.gmap.mockInfoWindow();
          return _this.gmap.mockEvent();
        };
      })(this));

      /* Possible Attributes
              coords: '=coords',
      				show: '=show',
      				templateUrl: '=templateurl',
      				templateParameter: '=templateparameter',
      				isIconVisibleOnClick: '=isiconvisibleonclick',
      				closeClick: '&closeclick',           #scope glue to gmap InfoWindow closeclick
      				options: '=options'
       */
      this.mocks = {
        scope: {
          coords: {
            latitude: 90.0,
            longitude: 89.0
          },
          show: true,
          $watch: function() {},
          $on: function() {}
        },
        element: {
          html: function() {
            return "<p>test html</p>";
          }
        },
        attrs: {
          isiconvisibleonclick: true
        },
        ctrls: [
          {
            getMap: function() {
              return {};
            }
          }
        ]
      };
      this.timeOutNoW = (function(_this) {
        return function(fnc, time) {
          return fnc();
        };
      })(this);
      this.gMarker = new google.maps.Marker(this.commonOpts);
      return inject((function(_this) {
        return function($timeout, $compile, $http, $templateCache, $injector, $rootScope, Window) {
          _this.mocks.scope.$new = function() {
            return $rootScope.$new();
          };
          _this.subject = new Window(_this.timeOutNoW, $compile, $http, $templateCache);
          return _this.subject.onChildCreation = function(child) {
            return _this.childWindow = child;
          };
        };
      })(this));
    });
    it('can be created', function() {
      expect(this.subject).toBeDefined();
      return expect(this.subject.index).toEqual(this.index);
    });
    return describe("link", function() {
      describe("withOUT marker", function() {
        return it('link creates window options and a childWindow', function() {
          this.subject.link(this.mocks.scope, this.mocks.element, this.mocks.attrs, this.mocks.ctrls);
          expect(this.childWindow).toBeDefined();
          return expect(this.childWindow.opts).toBeDefined();
        });
      });
      return describe("with marker", function() {});
    });
  });

}).call(this);
