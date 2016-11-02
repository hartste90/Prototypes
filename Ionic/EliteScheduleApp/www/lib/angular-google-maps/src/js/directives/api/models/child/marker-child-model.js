(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.child").factory("MarkerChildModel", [
    "ModelKey", "GmapUtil", "Logger", "$injector", "EventsHelper", function(ModelKey, GmapUtil, Logger, $injector, EventsHelper) {
      var MarkerChildModel;
      MarkerChildModel = (function(_super) {
        __extends(MarkerChildModel, _super);

        MarkerChildModel.include(GmapUtil);

        MarkerChildModel.include(EventsHelper);

        function MarkerChildModel(model, parentScope, gMap, $timeout, defaults, doClick, gMarkerManager, idKey) {
          var self;
          this.model = model;
          this.parentScope = parentScope;
          this.gMap = gMap;
          this.$timeout = $timeout;
          this.defaults = defaults;
          this.doClick = doClick;
          this.gMarkerManager = gMarkerManager;
          this.idKey = idKey;
          this.watchDestroy = __bind(this.watchDestroy, this);
          this.setLabelOptions = __bind(this.setLabelOptions, this);
          this.isLabelDefined = __bind(this.isLabelDefined, this);
          this.setOptions = __bind(this.setOptions, this);
          this.setIcon = __bind(this.setIcon, this);
          this.setCoords = __bind(this.setCoords, this);
          this.destroy = __bind(this.destroy, this);
          this.maybeSetScopeValue = __bind(this.maybeSetScopeValue, this);
          this.createMarker = __bind(this.createMarker, this);
          this.setMyScope = __bind(this.setMyScope, this);
          self = this;
          if (this.model[this.idKey]) {
            this.id = this.model[this.idKey];
          }
          this.iconKey = this.parentScope.icon;
          this.coordsKey = this.parentScope.coords;
          this.clickKey = this.parentScope.click();
          this.labelContentKey = this.parentScope.labelContent;
          this.optionsKey = this.parentScope.options;
          this.labelOptionsKey = this.parentScope.labelOptions;
          MarkerChildModel.__super__.constructor.call(this, this.parentScope.$new(false));
          this.scope.model = this.model;
          this.setMyScope(this.model, void 0, true);
          this.createMarker(this.model);
          this.scope.$watch('model', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return _this.setMyScope(newValue, oldValue);
              }
            };
          })(this), true);
          this.$log = Logger;
          this.$log.info(self);
          this.watchDestroy(this.scope);
        }

        MarkerChildModel.prototype.setMyScope = function(model, oldModel, isInit) {
          if (oldModel == null) {
            oldModel = void 0;
          }
          if (isInit == null) {
            isInit = false;
          }
          this.maybeSetScopeValue('icon', model, oldModel, this.iconKey, this.evalModelHandle, isInit, this.setIcon);
          this.maybeSetScopeValue('coords', model, oldModel, this.coordsKey, this.evalModelHandle, isInit, this.setCoords);
          this.maybeSetScopeValue('labelContent', model, oldModel, this.labelContentKey, this.evalModelHandle, isInit);
          if (_.isFunction(this.clickKey) && $injector) {
            return this.scope.click = (function(_this) {
              return function() {
                return $injector.invoke(_this.clickKey, void 0, {
                  "$markerModel": model
                });
              };
            })(this);
          } else {
            this.maybeSetScopeValue('click', model, oldModel, this.clickKey, this.evalModelHandle, isInit);
            return this.createMarker(model, oldModel, isInit);
          }
        };

        MarkerChildModel.prototype.createMarker = function(model, oldModel, isInit) {
          if (oldModel == null) {
            oldModel = void 0;
          }
          if (isInit == null) {
            isInit = false;
          }
          return this.maybeSetScopeValue('options', model, oldModel, this.optionsKey, (function(_this) {
            return function(lModel, lModelKey) {
              var value;
              if (lModel === void 0) {
                return void 0;
              }
              value = lModelKey === 'self' ? lModel : lModel[lModelKey];
              if (value === void 0) {
                return value = lModelKey === void 0 ? _this.defaults : _this.scope.options;
              } else {
                return value;
              }
            };
          })(this), isInit, this.setOptions);
        };

        MarkerChildModel.prototype.maybeSetScopeValue = function(scopePropName, model, oldModel, modelKey, evaluate, isInit, gSetter) {
          var newValue, oldVal;
          if (gSetter == null) {
            gSetter = void 0;
          }
          if (oldModel === void 0) {
            this.scope[scopePropName] = evaluate(model, modelKey);
            if (!isInit) {
              if (gSetter != null) {
                gSetter(this.scope);
              }
            }
            return;
          }
          oldVal = evaluate(oldModel, modelKey);
          newValue = evaluate(model, modelKey);
          if (newValue !== oldVal && this.scope[scopePropName] !== newValue) {
            this.scope[scopePropName] = newValue;
            if (!isInit) {
              if (gSetter != null) {
                gSetter(this.scope);
              }
              return this.gMarkerManager.draw();
            }
          }
        };

        MarkerChildModel.prototype.destroy = function() {
          return this.scope.$destroy();
        };

        MarkerChildModel.prototype.setCoords = function(scope) {
          if (scope.$id !== this.scope.$id || this.gMarker === void 0) {
            return;
          }
          if ((scope.coords != null)) {
            if (!this.validateCoords(this.scope.coords)) {
              this.$log.error("MarkerChildMarker cannot render marker as scope.coords as no position on marker: " + (JSON.stringify(this.model)));
              return;
            }
            this.gMarker.setPosition(this.getCoords(scope.coords));
            this.gMarker.setVisible(this.validateCoords(scope.coords));
            this.gMarkerManager.remove(this.gMarker);
            return this.gMarkerManager.add(this.gMarker);
          } else {
            return this.gMarkerManager.remove(this.gMarker);
          }
        };

        MarkerChildModel.prototype.setIcon = function(scope) {
          if (scope.$id !== this.scope.$id || this.gMarker === void 0) {
            return;
          }
          this.gMarkerManager.remove(this.gMarker);
          this.gMarker.setIcon(scope.icon);
          this.gMarkerManager.add(this.gMarker);
          this.gMarker.setPosition(this.getCoords(scope.coords));
          return this.gMarker.setVisible(this.validateCoords(scope.coords));
        };

        MarkerChildModel.prototype.setOptions = function(scope) {
          var _ref;
          if (scope.$id !== this.scope.$id) {
            return;
          }
          if (this.gMarker != null) {
            this.gMarkerManager.remove(this.gMarker);
            delete this.gMarker;
          }
          if (!((_ref = scope.coords) != null ? _ref : typeof scope.icon === "function" ? scope.icon(scope.options != null) : void 0)) {
            return;
          }
          this.opts = this.createMarkerOptions(scope.coords, scope.icon, scope.options);
          delete this.gMarker;
          if (this.isLabelDefined(scope)) {
            this.gMarker = new MarkerWithLabel(this.setLabelOptions(this.opts, scope));
          } else {
            this.gMarker = new google.maps.Marker(this.opts);
          }
          this.setEvents(this.gMarker, this.parentScope, this.model);
          if (this.id) {
            this.gMarker.key = this.id;
          }
          this.gMarkerManager.add(this.gMarker);
          return google.maps.event.addListener(this.gMarker, 'click', (function(_this) {
            return function() {
              if (_this.doClick && (_this.scope.click != null)) {
                return _this.scope.click();
              }
            };
          })(this));
        };

        MarkerChildModel.prototype.isLabelDefined = function(scope) {
          return scope.labelContent != null;
        };

        MarkerChildModel.prototype.setLabelOptions = function(opts, scope) {
          opts.labelAnchor = this.getLabelPositionPoint(scope.labelAnchor);
          opts.labelClass = scope.labelClass;
          opts.labelContent = scope.labelContent;
          return opts;
        };

        MarkerChildModel.prototype.watchDestroy = function(scope) {
          return scope.$on("$destroy", (function(_this) {
            return function() {
              var self, _ref;
              if (_this.gMarker != null) {
                google.maps.event.clearListeners(_this.gMarker, 'click');
                if (((_ref = _this.parentScope) != null ? _ref.events : void 0) && _.isArray(_this.parentScope.events)) {
                  _this.parentScope.events.forEach(function(event, eventName) {
                    return google.maps.event.clearListeners(this.gMarker, eventName);
                  });
                }
                _this.gMarkerManager.remove(_this.gMarker, true);
                delete _this.gMarker;
              }
              return self = void 0;
            };
          })(this));
        };

        return MarkerChildModel;

      })(ModelKey);
      return MarkerChildModel;
    }
  ]);

}).call(this);
