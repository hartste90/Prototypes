
/*
	Windows directive where many windows map to the models property
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.parent").factory("WindowsParentModel", [
    "IWindowParentModel", "ModelsWatcher", "PropMap", "WindowChildModel", "Linked", function(IWindowParentModel, ModelsWatcher, PropMap, WindowChildModel, Linked) {
      var WindowsParentModel;
      WindowsParentModel = (function(_super) {
        __extends(WindowsParentModel, _super);

        WindowsParentModel.include(ModelsWatcher);

        function WindowsParentModel(scope, element, attrs, ctrls, $timeout, $compile, $http, $templateCache, $interpolate) {
          var self;
          this.$interpolate = $interpolate;
          this.interpolateContent = __bind(this.interpolateContent, this);
          this.setChildScope = __bind(this.setChildScope, this);
          this.createWindow = __bind(this.createWindow, this);
          this.setContentKeys = __bind(this.setContentKeys, this);
          this.pieceMealWindows = __bind(this.pieceMealWindows, this);
          this.createAllNewWindows = __bind(this.createAllNewWindows, this);
          this.watchIdKey = __bind(this.watchIdKey, this);
          this.createChildScopesWindows = __bind(this.createChildScopesWindows, this);
          this.watchOurScope = __bind(this.watchOurScope, this);
          this.watchDestroy = __bind(this.watchDestroy, this);
          this.rebuildAll = __bind(this.rebuildAll, this);
          this.doINeedToWipe = __bind(this.doINeedToWipe, this);
          this.watchModels = __bind(this.watchModels, this);
          this.watch = __bind(this.watch, this);
          WindowsParentModel.__super__.constructor.call(this, scope, element, attrs, ctrls, $timeout, $compile, $http, $templateCache);
          self = this;
          this.windows = new PropMap();
          this.scopePropNames = ['show', 'coords', 'templateUrl', 'templateParameter', 'isIconVisibleOnClick', 'closeClick'];
          _.each(this.scopePropNames, (function(_this) {
            return function(name) {
              return _this[name + 'Key'] = void 0;
            };
          })(this));
          this.linked = new Linked(scope, element, attrs, ctrls);
          this.models = void 0;
          this.contentKeys = void 0;
          this.isIconVisibleOnClick = void 0;
          this.firstTime = true;
          this.$log.info(self);
          this.parentScope = void 0;
          this.$timeout((function(_this) {
            return function() {
              _this.watchOurScope(scope);
              _this.doRebuildAll = _this.scope.doRebuildAll != null ? _this.scope.doRebuildAll : false;
              scope.$watch('doRebuildAll', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return _this.doRebuildAll = newValue;
                }
              });
              return _this.createChildScopesWindows();
            };
          })(this), 50);
        }

        WindowsParentModel.prototype.watch = function(scope, name, nameKey) {
          return scope.$watch(name, (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                _this[nameKey] = typeof newValue === 'function' ? newValue() : newValue;
                return _async.each(_.values(_this.windows), function(model) {
                  return model.scope[name] = _this[nameKey] === 'self' ? model : model[_this[nameKey]];
                }, function() {});
              }
            };
          })(this));
        };

        WindowsParentModel.prototype.watchModels = function(scope) {
          return scope.$watch('models', (function(_this) {
            return function(newValue, oldValue) {
              if (!_.isEqual(newValue, oldValue)) {
                if (_this.doRebuildAll || _this.doINeedToWipe(newValue)) {
                  return _this.rebuildAll(scope, true, true);
                } else {
                  return _this.createChildScopesWindows(false);
                }
              }
            };
          })(this));
        };

        WindowsParentModel.prototype.doINeedToWipe = function(newValue) {
          var newValueIsEmpty;
          newValueIsEmpty = newValue != null ? newValue.length === 0 : true;
          return this.windows.length > 0 && newValueIsEmpty;
        };

        WindowsParentModel.prototype.rebuildAll = function(scope, doCreate, doDelete) {
          return _async.each(this.windows.values(), (function(_this) {
            return function(model) {
              return model.destroy();
            };
          })(this), (function(_this) {
            return function() {
              if (doDelete) {
                delete _this.windows;
              }
              _this.windows = new PropMap();
              if (doCreate) {
                return _this.createChildScopesWindows();
              }
            };
          })(this));
        };

        WindowsParentModel.prototype.watchDestroy = function(scope) {
          return scope.$on("$destroy", (function(_this) {
            return function() {
              return _this.rebuildAll(scope, false, true);
            };
          })(this));
        };

        WindowsParentModel.prototype.watchOurScope = function(scope) {
          return _.each(this.scopePropNames, (function(_this) {
            return function(name) {
              var nameKey;
              nameKey = name + 'Key';
              _this[nameKey] = typeof scope[name] === 'function' ? scope[name]() : scope[name];
              return _this.watch(scope, name, nameKey);
            };
          })(this));
        };

        WindowsParentModel.prototype.createChildScopesWindows = function(isCreatingFromScratch) {
          var markersScope, modelsNotDefined;
          if (isCreatingFromScratch == null) {
            isCreatingFromScratch = true;
          }

          /*
          being that we cannot tell the difference in Key String vs. a normal value string (TemplateUrl)
          we will assume that all scope values are string expressions either pointing to a key (propName) or using
          'self' to point the model as container/object of interest.
          
          This may force redundant information into the model, but this appears to be the most flexible approach.
           */
          this.isIconVisibleOnClick = true;
          if (angular.isDefined(this.linked.attrs.isiconvisibleonclick)) {
            this.isIconVisibleOnClick = this.linked.scope.isIconVisibleOnClick;
          }
          this.gMap = this.linked.ctrls[0].getMap();
          if (this.linked.ctrls[1] != null) {
            markersScope = this.linked.ctrls.length > 1 ? this.linked.ctrls[1].getMarkersScope() : void 0;
          }
          modelsNotDefined = angular.isUndefined(this.linked.scope.models);
          if (modelsNotDefined && (markersScope === void 0 || (markersScope.markerModels === void 0 || markersScope.models === void 0))) {
            this.$log.error("No models to create windows from! Need direct models or models derrived from markers!");
            return;
          }
          if (this.gMap != null) {
            if (this.linked.scope.models != null) {
              this.watchIdKey(this.linked.scope);
              if (isCreatingFromScratch) {
                return this.createAllNewWindows(this.linked.scope, false);
              } else {
                return this.pieceMealWindows(this.linked.scope, false);
              }
            } else {
              this.parentScope = markersScope;
              this.watchIdKey(this.parentScope);
              if (isCreatingFromScratch) {
                return this.createAllNewWindows(markersScope, true, 'markerModels', false);
              } else {
                return this.pieceMealWindows(markersScope, true, 'markerModels', false);
              }
            }
          }
        };

        WindowsParentModel.prototype.watchIdKey = function(scope) {
          this.setIdKey(scope);
          return scope.$watch('idKey', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue && (newValue == null)) {
                _this.idKey = newValue;
                return _this.rebuildAll(scope, true, true);
              }
            };
          })(this));
        };

        WindowsParentModel.prototype.createAllNewWindows = function(scope, hasGMarker, modelsPropToIterate, isArray) {
          if (modelsPropToIterate == null) {
            modelsPropToIterate = 'models';
          }
          if (isArray == null) {
            isArray = false;
          }
          this.models = scope.models;
          if (this.firstTime) {
            this.watchModels(scope);
            this.watchDestroy(scope);
          }
          this.setContentKeys(scope.models);
          return _async.each(scope.models, (function(_this) {
            return function(model) {
              var gMarker;
              gMarker = hasGMarker ? scope[modelsPropToIterate][[model[_this.idKey]]].gMarker : void 0;
              return _this.createWindow(model, gMarker, _this.gMap);
            };
          })(this), (function(_this) {
            return function() {
              return _this.firstTime = false;
            };
          })(this));
        };

        WindowsParentModel.prototype.pieceMealWindows = function(scope, hasGMarker, modelsPropToIterate, isArray) {
          if (modelsPropToIterate == null) {
            modelsPropToIterate = 'models';
          }
          if (isArray == null) {
            isArray = true;
          }
          this.models = scope.models;
          if ((scope != null) && (scope.models != null) && scope.models.length > 0 && this.windows.length > 0) {
            return this.figureOutState(this.idKey, scope, this.windows, this.modelKeyComparison, (function(_this) {
              return function(state) {
                var payload;
                payload = state;
                return _async.each(payload.removals, function(child) {
                  if (child != null) {
                    if (child.destroy != null) {
                      child.destroy();
                    }
                    return _this.windows.remove(child.id);
                  }
                }, function() {
                  return _async.each(payload.adds, function(modelToAdd) {
                    var gMarker;
                    gMarker = scope[modelsPropToIterate][modelToAdd[_this.idKey]].gMarker;
                    return _this.createWindow(modelToAdd, gMarker, _this.gMap);
                  }, function() {});
                });
              };
            })(this));
          } else {
            return this.rebuildAll(this.scope, true, true);
          }
        };

        WindowsParentModel.prototype.setContentKeys = function(models) {
          if (models.length > 0) {
            return this.contentKeys = Object.keys(models[0]);
          }
        };

        WindowsParentModel.prototype.createWindow = function(model, gMarker, gMap) {
          var child, childScope, fakeElement, opts;
          childScope = this.linked.scope.$new(false);
          this.setChildScope(childScope, model);
          childScope.$watch('model', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return _this.setChildScope(childScope, newValue);
              }
            };
          })(this), true);
          fakeElement = {
            html: (function(_this) {
              return function() {
                return _this.interpolateContent(_this.linked.element.html(), model);
              };
            })(this)
          };
          opts = this.createWindowOptions(gMarker, childScope, fakeElement.html(), this.DEFAULTS);
          child = new WindowChildModel(model, childScope, opts, this.isIconVisibleOnClick, gMap, gMarker, fakeElement, true, true);
          if (model[this.idKey] == null) {
            this.$log.error("Window model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.");
            return;
          }
          this.windows.put(model[this.idKey], child);
          return child;
        };

        WindowsParentModel.prototype.setChildScope = function(childScope, model) {
          _.each(this.scopePropNames, (function(_this) {
            return function(name) {
              var nameKey, newValue;
              nameKey = name + 'Key';
              newValue = _this[nameKey] === 'self' ? model : model[_this[nameKey]];
              if (newValue !== childScope[name]) {
                return childScope[name] = newValue;
              }
            };
          })(this));
          return childScope.model = model;
        };

        WindowsParentModel.prototype.interpolateContent = function(content, model) {
          var exp, interpModel, key, _i, _len, _ref;
          if (this.contentKeys === void 0 || this.contentKeys.length === 0) {
            return;
          }
          exp = this.$interpolate(content);
          interpModel = {};
          _ref = this.contentKeys;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            interpModel[key] = model[key];
          }
          return exp(interpModel);
        };

        return WindowsParentModel;

      })(IWindowParentModel);
      return WindowsParentModel;
    }
  ]);

}).call(this);
