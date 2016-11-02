(function() {
  describe("WindowChildModel", function() {
    beforeEach(function() {
      if (window.InfoBox) {
        this.infoBoxRealTemp = window.InfoBox;
      } else {
        window.InfoBox = function(opt_opts) {
          opt_opts = opt_opts || {};
          this.boxClass_ = opt_opts.boxClass || "infoBox";
          this.content_ = opt_opts.content || "";
          this.div_ = document.createElement("div");
          return this.div_.className = this.boxClass_;
        };
      }
      this.scope = {
        coords: {
          latitude: 90.0,
          longitude: 89.0
        },
        show: true
      };
      this.commonOpts = {
        position: new google.maps.LatLng(this.scope.coords.latitude, this.scope.coords.longitude)
      };
      this.windowOpts = _.extend(this.commonOpts, {
        content: 'content'
      });
      this.gMarker = new google.maps.Marker(this.commonOpts);
      angular.module('mockModule', ["google-maps"]).value('isIconVisibleOnClick', true).value('model', this.scope).value('mapCtrl', document.gMap).value('markerCtrl', this.gMarker).value('opts', this.windowOpts).value('element', '<span>hi</span>').value('needToManualDestroy', false).value('markerIsVisibleAfterWindowClose', true).controller('childModel', function(WindowChildModel) {
        return WindowChildModel;
      });
      return angular.mock.module('mockModule');
    });
    it('can be created', function() {
      inject((function(_this) {
        return function($http, $rootScope, $templateCache, $compile, $controller) {
          var scope;
          scope = $rootScope.$new();
          _.extend(_this.scope, scope);
          return _this.subject = $controller('childModel', {
            scope: scope
          });
        };
      })(this));
      expect(this.subject !== void 0).toEqual(true);
      return expect(this.subject.index).toEqual(this.index);
    });
    return it('can be created with the infoBoxplugin', function() {
      inject((function(_this) {
        return function($http, $rootScope, $templateCache, $compile, $controller) {
          var scope;
          scope = $rootScope.$new();
          _.extend(_this.scope, scope);
          return _this.subject = $controller('childModel', {
            scope: scope
          });
        };
      })(this));
      expect(this.subject !== void 0).toEqual(true);
      return expect(this.subject.index).toEqual(this.index);
    });
  });

}).call(this);
