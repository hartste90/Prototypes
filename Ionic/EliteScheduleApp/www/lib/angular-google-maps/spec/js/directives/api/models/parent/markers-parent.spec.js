(function() {
  var __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  xdescribe("MarkersParentModel", function() {
    beforeEach(function() {
      angular.mock.module("google-maps.directives.api.models.parent", (function(_this) {
        return function($provide) {
          var ClustererMarkerManager, MarkerChildModel, MarkerManager;
          _this.provide = $provide;
          MarkerManager = (function() {
            function MarkerManager() {
              var args;
              args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              this.args = args;
              this.constructed = true;
              this.drawCalled = 0;
              this.clearCalled = 0;
              this.fitCalled = 0;
            }

            MarkerManager.prototype.draw = function() {
              return this.drawCalled++;
            };

            MarkerManager.prototype.clear = function() {
              return this.clearCalled++;
            };

            MarkerManager.prototype.fit = function() {
              return this.fitCalled++;
            };

            return MarkerManager;

          })();
          ClustererMarkerManager = (function(_super) {
            __extends(ClustererMarkerManager, _super);

            function ClustererMarkerManager() {
              var args;
              args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              ClustererMarkerManager.__super__.constructor.call(this, args);
              this.constructed = true;
              this.childConstructed = true;
            }

            return ClustererMarkerManager;

          })(MarkerManager);
          MarkerChildModel = (function() {
            function MarkerChildModel() {
              var args;
              args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              this.args = args;
              this.constructed = true;
            }

            return MarkerChildModel;

          })();
          _this.clustererMarkerManager = ClustererMarkerManager;
          _this.markerManager = MarkerManager;
          _this.markerChildModel = MarkerChildModel;
          _this.provide.decorator('ClustererMarkerManager', function() {
            return _this.clustererMarkerManager;
          });
          _this.provide.decorator('MarkerManager', function() {
            return _this.markerManager;
          });
          return _this.provide.decorator('MarkerChildModel', function() {
            return _this.markerChildModel;
          });
        };
      })(this));
      this.clickCount = 0;
      inject((function(_this) {
        return function($rootScope, $timeout, $compile, $http, $templateCache, $interpolate, MarkersParentModel) {
          _this.rootScope = $rootScope;
          _this.scope = $rootScope.$new();
          _this.ele = $compile('<markers models="models"></markers>')(_this.scope);
          _this.attrs = {
            click: _this.click
          };
          _this.MarkersParentModel = MarkersParentModel;
          _this.$timeout = $timeout;
          return _this.scope.click = function() {
            return _this.clickCount++;
          };
        };
      })(this));
      this.mapCtrl = jasmine.createSpyObj('mapCtrl', ['getMap']);
      return this.subject = new this.MarkersParentModel(this.scope, this.ele, this.attrs, this.mapCtrl, this.$timeout);
    });
    it("should instantiate", function() {
      return expect(this.subject != null).toEqual(true);
    });
    it("should validate a scope correctly", function() {
      expect(this.subject.validateScope(this.scope)).toEqual(true);
      this.scope.models = [
        {
          latitude: 47,
          longitude: -27
        }
      ];
      expect(this.subject.validateScope(this.scope)).toEqual(false);
      this.scope.coords = {
        latitude: 47,
        longitude: -27
      };
      return expect(this.subject.validateScope(this.scope)).toEqual(true);
    });
    it("should watch the appropriate properties on timeout", function() {
      var expectedProps, props;
      props = [];
      expectedProps = 'models doCluster clusterOptions clusterEvents fit idKey'.split(' ');
      this.scope.$watch = (function(_this) {
        return function(propName, func) {
          return props.push(propName);
        };
      })(this);
      spyOn(this.subject, 'createMarkersFromScratch');
      this.subject.onTimeOut(this.scope);
      return expect(this.subject.createMarkersFromScratch).toHaveBeenCalled();
    });
    describe("watch tests", function() {
      beforeEach(function() {
        spyOn(this.subject, 'reBuildMarkers');
        spyOn(this.subject, 'pieceMealMarkers');
        return this.idKey = this.subject.idKey;
      });
      it("should watch rebuild markers and not change idKey", function() {
        this.subject.onWatch('foo', this.scope, 'baz', 'bar');
        expect(this.subject.idKey).toEqual(this.idKey);
        expect(this.subject.pieceMealMarkers).not.toHaveBeenCalled();
        return expect(this.subject.reBuildMarkers).toHaveBeenCalled();
      });
      it("should watch and rebuild markers, but change idKey", function() {
        this.subject.onWatch('idKey', this.scope, 'foo', this.idKey);
        expect(this.subject.idKey).toEqual('foo');
        expect(this.subject.pieceMealMarkers).not.toHaveBeenCalled();
        return expect(this.subject.reBuildMarkers).toHaveBeenCalled();
      });
      it("should watch and build piecemeal and not change idKey", function() {
        this.subject.doRebuildAll = false;
        this.subject.onWatch('foo', this.scope, 'foo', this.idKey);
        expect(this.subject.idKey).toEqual(this.idKey);
        expect(this.subject.pieceMealMarkers).toHaveBeenCalled();
        return expect(this.subject.reBuildMarkers).not.toHaveBeenCalled();
      });
      return it("should watch and build piecemeal and change idKey", function() {
        this.subject.doRebuildAll = false;
        this.subject.onWatch('idKey', this.scope, 'foo', this.idKey);
        expect(this.subject.idKey).toEqual('foo');
        expect(this.subject.pieceMealMarkers).toHaveBeenCalled();
        return expect(this.subject.reBuildMarkers).not.toHaveBeenCalled();
      });
    });
    describe("createMarkers from scratch tests", function() {
      beforeEach(function() {
        spyOn(this.subject, 'newChildMarker');
        return this.subject.gMarkerManager = new this.clustererMarkerManager();
      });
      it("should call ClustererMarkerManager", function() {
        this.scope.doCluster = true;
        this.scope.clusterOptions = {};
        this.subject.createMarkersFromScratch(this.scope);
        return expect(this.subject.gMarkerManager.childConstructed).toEqual(true);
      });
      it("should call not call ClustererMarkerManager when markerManager is set and options are the same as scope options", function() {
        this.scope.doCluster = true;
        this.scope.clusterOptions = {};
        this.subject.gMarkerManager.opt_options = this.scope.clusterOptions;
        this.subject.gMarkerManager.childConstructed = false;
        this.subject.createMarkersFromScratch(this.scope);
        return expect(this.subject.gMarkerManager.childConstructed).toEqual(false);
      });
      it("should call ClustererMarkerManager when markerManager is set and options options are not the same", function() {
        this.scope.doCluster = true;
        this.scope.clusterOptions = {};
        this.subject.gMarkerManager.childConstructed = false;
        this.subject.createMarkersFromScratch(this.scope);
        return expect(this.subject.gMarkerManager.childConstructed).toEqual(true);
      });
      it("should call clustererMarkerManager when doCluster is true and no clusterOptions set", function() {
        this.scope.doCluster = true;
        this.subject.createMarkersFromScratch(this.scope);
        expect(this.subject.gMarkerManager.childConstructed).toEqual(true);
        return expect(this.subject.gMarkerManager.args.length).toEqual(1);
      });
      it("should call generic MarkerManager when no cluster options are set", function() {
        this.subject.createMarkersFromScratch(this.scope);
        return expect(this.subject.gMarkerManager.childConstructed).toEqual(void 0);
      });
      return it("should call newChildMarker for each model and fit should not be called", function() {
        this.scope.models = [{}, {}];
        this.subject.createMarkersFromScratch(this.scope);
        expect(this.subject.newChildMarker.calls.length).toEqual(2);
        return expect(this.subject.gMarkerManager.fitCalled).toBe(0);
      });
    });
    describe("Rebuild markers", function() {
      this.beforeEach(function() {
        spyOn(this.subject, 'onDestroy');
        return spyOn(this.subject, 'createMarkersFromScratch');
      });
      it("should return without doRebuild", function() {
        this.scope.doRebuild = false;
        this.subject.reBuildMarkers(this.scope);
        return expect(this.subject.onDestroy).not.toHaveBeenCalled();
      });
      return it("should call on destroy and createMarkersFromScratch", function() {
        this.subject.reBuildMarkers(this.scope);
        expect(this.subject.onDestroy).toHaveBeenCalled();
        return expect(this.subject.createMarkersFromScratch).toHaveBeenCalled();
      });
    });
    describe("pieceMealMarkers", function() {
      this.beforeEach(function() {
        spyOn(this.subject, 'figureOutState');
        spyOn(this.subject, 'reBuildMarkers');
        return spyOn(this.subject, 'newChildMarker');
      });
      it("should call reBuildMarkers", function() {
        this.subject.pieceMealMarkers(this.scope);
        return expect(this.subject.reBuildMarkers).toHaveBeenCalled();
      });
      return it("should call figureOutState", function() {
        this.scope.models = [{}];
        this.scope.markerModels = [{}];
        this.subject.pieceMealMarkers(this.scope);
        return expect(this.subject.figureOutState).toHaveBeenCalled();
      });
    });
    describe("newChildMarker", function() {
      it("should return undefined, but call constructor", function() {
        return expect(this.subject.newChildMarker({}, this.scope)).toEqual(void 0);
      });
      return it("should return a new childMarker", function() {
        var child, model;
        model = {};
        model[this.subject.idKey] = "foo";
        this.scope.markerModels = {
          put: function() {}
        };
        spyOn(this.scope.markerModels, 'put');
        child = this.subject.newChildMarker(model, this.scope);
        expect(child.constructed).toEqual(true);
        expect(this.scope.markerModels.put.calls[0].args[0]).toEqual('foo');
        return expect(this.scope.markerModels.put.calls[0].args[1]).toEqual(child);
      });
    });
    describe("onDestroy", function() {
      return it("should succeed", function() {
        return this.subject.onDestroy(this.scope);
      });
    });
    return describe("fit", function() {
      return it("should succeed", function() {
        this.subject.gMarkerManager = new this.clustererMarkerManager();
        return this.subject.gMarkerManager.fit();
      });
    });
  });

}).call(this);
