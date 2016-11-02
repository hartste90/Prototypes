(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.parent").factory("MarkersParentModel", [
    "IMarkerParentModel", "ModelsWatcher", "PropMap", "MarkerChildModel", "ClustererMarkerManager", "MarkerManager", function(IMarkerParentModel, ModelsWatcher, PropMap, MarkerChildModel, ClustererMarkerManager, MarkerManager) {
      var MarkersParentModel;
      MarkersParentModel = (function(_super) {
        __extends(MarkersParentModel, _super);

        MarkersParentModel.include(ModelsWatcher);

        function MarkersParentModel(scope, element, attrs, mapCtrl, $timeout) {
          this.onDestroy = __bind(this.onDestroy, this);
          this.newChildMarker = __bind(this.newChildMarker, this);
          this.pieceMealMarkers = __bind(this.pieceMealMarkers, this);
          this.reBuildMarkers = __bind(this.reBuildMarkers, this);
          this.createMarkersFromScratch = __bind(this.createMarkersFromScratch, this);
          this.validateScope = __bind(this.validateScope, this);
          this.onWatch = __bind(this.onWatch, this);
          this.onTimeOut = __bind(this.onTimeOut, this);
          var self;
          MarkersParentModel.__super__.constructor.call(this, scope, element, attrs, mapCtrl, $timeout);
          self = this;
          this.scope.markerModels = new PropMap();
          this.$timeout = $timeout;
          this.$log.info(this);
          this.doRebuildAll = this.scope.doRebuildAll != null ? this.scope.doRebuildAll : false;
          this.setIdKey(scope);
          this.scope.$watch('doRebuildAll', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return _this.doRebuildAll = newValue;
              }
            };
          })(this));
        }

        MarkersParentModel.prototype.onTimeOut = function(scope) {
          this.watch('models', scope);
          this.watch('doCluster', scope);
          this.watch('clusterOptions', scope);
          this.watch('clusterEvents', scope);
          this.watch('fit', scope);
          this.watch('idKey', scope);
          this.gMarkerManager = void 0;
          return this.createMarkersFromScratch(scope);
        };

        MarkersParentModel.prototype.onWatch = function(propNameToWatch, scope, newValue, oldValue) {
          if (propNameToWatch === "idKey" && newValue !== oldValue) {
            this.idKey = newValue;
          }
          if (this.doRebuildAll) {
            return this.reBuildMarkers(scope);
          } else {
            return this.pieceMealMarkers(scope);
          }
        };

        MarkersParentModel.prototype.validateScope = function(scope) {
          var modelsNotDefined;
          modelsNotDefined = angular.isUndefined(scope.models) || scope.models === void 0;
          if (modelsNotDefined) {
            this.$log.error(this.constructor.name + ": no valid models attribute found");
          }
          return MarkersParentModel.__super__.validateScope.call(this, scope) || modelsNotDefined;
        };

        MarkersParentModel.prototype.createMarkersFromScratch = function(scope) {
          if (scope.doCluster) {
            if (scope.clusterEvents) {
              this.clusterInternalOptions = _.once((function(_this) {
                return function() {
                  var self, _ref, _ref1, _ref2;
                  self = _this;
                  if (!_this.origClusterEvents) {
                    _this.origClusterEvents = {
                      click: (_ref = scope.clusterEvents) != null ? _ref.click : void 0,
                      mouseout: (_ref1 = scope.clusterEvents) != null ? _ref1.mouseout : void 0,
                      mouseover: (_ref2 = scope.clusterEvents) != null ? _ref2.mouseover : void 0
                    };
                    return _.extend(scope.clusterEvents, {
                      click: function(cluster) {
                        return self.maybeExecMappedEvent(cluster, "click");
                      },
                      mouseout: function(cluster) {
                        return self.maybeExecMappedEvent(cluster, "mouseout");
                      },
                      mouseover: function(cluster) {
                        return self.maybeExecMappedEvent(cluster, "mouseover");
                      }
                    });
                  }
                };
              })(this))();
            }
            if (scope.clusterOptions || scope.clusterEvents) {
              if (this.gMarkerManager === void 0) {
                this.gMarkerManager = new ClustererMarkerManager(this.mapCtrl.getMap(), void 0, scope.clusterOptions, this.clusterInternalOptions);
              } else {
                if (this.gMarkerManager.opt_options !== scope.clusterOptions) {
                  this.gMarkerManager = new ClustererMarkerManager(this.mapCtrl.getMap(), void 0, scope.clusterOptions, this.clusterInternalOptions);
                }
              }
            } else {
              this.gMarkerManager = new ClustererMarkerManager(this.mapCtrl.getMap());
            }
          } else {
            this.gMarkerManager = new MarkerManager(this.mapCtrl.getMap());
          }
          return _async.each(scope.models, (function(_this) {
            return function(model) {
              return _this.newChildMarker(model, scope);
            };
          })(this), (function(_this) {
            return function() {
              _this.gMarkerManager.draw();
              if (scope.fit) {
                return _this.gMarkerManager.fit();
              }
            };
          })(this));
        };

        MarkersParentModel.prototype.reBuildMarkers = function(scope) {
          if (!scope.doRebuild && scope.doRebuild !== void 0) {
            return;
          }
          this.onDestroy(scope);
          return this.createMarkersFromScratch(scope);
        };

        MarkersParentModel.prototype.pieceMealMarkers = function(scope) {
          if ((this.scope.models != null) && this.scope.models.length > 0 && this.scope.markerModels.length > 0) {
            return this.figureOutState(this.idKey, scope, this.scope.markerModels, this.modelKeyComparison, (function(_this) {
              return function(state) {
                var payload;
                payload = state;
                return _async.each(payload.removals, function(child) {
                  if (child != null) {
                    if (child.destroy != null) {
                      child.destroy();
                    }
                    return _this.scope.markerModels.remove(child.id);
                  }
                }, function() {
                  return _async.each(payload.adds, function(modelToAdd) {
                    return _this.newChildMarker(modelToAdd, scope);
                  }, function() {
                    if (payload.adds.length > 0 || payload.removals.length > 0) {
                      _this.gMarkerManager.draw();
                      return scope.markerModels = _this.scope.markerModels;
                    }
                  });
                });
              };
            })(this));
          } else {
            return this.reBuildMarkers(scope);
          }
        };

        MarkersParentModel.prototype.newChildMarker = function(model, scope) {
          var child;
          if (model[this.idKey] == null) {
            this.$log.error("Marker model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.");
            return;
          }
          this.$log.info('child', child, 'markers', this.scope.markerModels);
          child = new MarkerChildModel(model, scope, this.mapCtrl, this.$timeout, this.DEFAULTS, this.doClick, this.gMarkerManager, this.idKey);
          this.scope.markerModels.put(model[this.idKey], child);
          return child;
        };

        MarkersParentModel.prototype.onDestroy = function(scope) {
          _.each(this.scope.markerModels.values(), function(model) {
            if (model != null) {
              return model.destroy();
            }
          });
          delete this.scope.markerModels;
          this.scope.markerModels = new PropMap();
          if (this.gMarkerManager != null) {
            return this.gMarkerManager.clear();
          }
        };

        MarkersParentModel.prototype.maybeExecMappedEvent = function(cluster, fnName) {
          var pair, _ref;
          if (_.isFunction((_ref = this.scope.clusterEvents) != null ? _ref[fnName] : void 0)) {
            pair = this.mapClusterToMarkerModels(cluster);
            if (this.origClusterEvents[fnName]) {
              return this.origClusterEvents[fnName](pair.cluster, pair.mapped);
            }
          }
        };

        MarkersParentModel.prototype.mapClusterToMarkerModels = function(cluster) {
          var gMarkers, mapped;
          gMarkers = cluster.getMarkers();
          mapped = gMarkers.map((function(_this) {
            return function(g) {
              return _this.scope.markerModels[g.key].model;
            };
          })(this));
          return {
            cluster: cluster,
            mapped: mapped
          };
        };

        return MarkersParentModel;

      })(IMarkerParentModel);
      return MarkersParentModel;
    }
  ]);

}).call(this);
