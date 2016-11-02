(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.child").factory("WindowChildModel", [
    "BaseObject", "GmapUtil", "Logger", "$compile", "$http", "$templateCache", function(BaseObject, GmapUtil, Logger, $compile, $http, $templateCache) {
      var WindowChildModel;
      WindowChildModel = (function(_super) {
        __extends(WindowChildModel, _super);

        WindowChildModel.include(GmapUtil);

        function WindowChildModel(model, scope, opts, isIconVisibleOnClick, mapCtrl, markerCtrl, element, needToManualDestroy, markerIsVisibleAfterWindowClose) {
          this.model = model;
          this.scope = scope;
          this.opts = opts;
          this.isIconVisibleOnClick = isIconVisibleOnClick;
          this.mapCtrl = mapCtrl;
          this.markerCtrl = markerCtrl;
          this.element = element;
          this.needToManualDestroy = needToManualDestroy != null ? needToManualDestroy : false;
          this.markerIsVisibleAfterWindowClose = markerIsVisibleAfterWindowClose != null ? markerIsVisibleAfterWindowClose : true;
          this.destroy = __bind(this.destroy, this);
          this.remove = __bind(this.remove, this);
          this.hideWindow = __bind(this.hideWindow, this);
          this.getLatestPosition = __bind(this.getLatestPosition, this);
          this.showWindow = __bind(this.showWindow, this);
          this.handleClick = __bind(this.handleClick, this);
          this.watchCoords = __bind(this.watchCoords, this);
          this.watchShow = __bind(this.watchShow, this);
          this.createGWin = __bind(this.createGWin, this);
          this.watchElement = __bind(this.watchElement, this);
          this.googleMapsHandles = [];
          this.$log = Logger;
          this.createGWin();
          if (this.markerCtrl != null) {
            this.markerCtrl.setClickable(true);
          }
          this.handleClick();
          this.watchElement();
          this.watchShow();
          this.watchCoords();
          this.$log.info(this);
        }

        WindowChildModel.prototype.watchElement = function() {
          return this.scope.$watch((function(_this) {
            return function() {
              var _ref;
              if (!_this.element || !_this.html) {
                return;
              }
              if (_this.html !== _this.element.html()) {
                if (_this.gWin) {
                  if ((_ref = _this.opts) != null) {
                    _ref.content = void 0;
                  }
                  _this.remove();
                  _this.createGWin();
                  return _this.showHide();
                }
              }
            };
          })(this));
        };

        WindowChildModel.prototype.createGWin = function() {
          var defaults;
          if (this.gWin == null) {
            defaults = {};
            if (this.opts != null) {
              if (this.scope.coords) {
                this.opts.position = this.getCoords(this.scope.coords);
              }
              defaults = this.opts;
            }
            if (this.element) {
              this.html = _.isObject(this.element) ? this.element.html() : this.element;
            }
            this.opts = this.createWindowOptions(this.markerCtrl, this.scope, this.html, defaults);
          }
          if ((this.opts != null) && !this.gWin) {
            if (this.opts.boxClass && (window.InfoBox && typeof window.InfoBox === 'function')) {
              this.gWin = new window.InfoBox(this.opts);
            } else {
              this.gWin = new google.maps.InfoWindow(this.opts);
            }
            return this.googleMapsHandles.push(google.maps.event.addListener(this.gWin, 'closeclick', (function(_this) {
              return function() {
                var _ref;
                if ((_ref = _this.markerCtrl) != null) {
                  _ref.setVisible(_this.markerIsVisibleAfterWindowClose);
                }
                _this.gWin.isOpen(false);
                if (_this.scope.closeClick != null) {
                  return _this.scope.closeClick();
                }
              };
            })(this)));
          }
        };

        WindowChildModel.prototype.watchShow = function() {
          return this.scope.$watch('show', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                if (newValue) {
                  return _this.showWindow();
                } else {
                  return _this.hideWindow();
                }
              } else {
                if (_this.gWin != null) {
                  if (newValue && !_this.gWin.getMap()) {
                    return _this.showWindow();
                  }
                }
              }
            };
          })(this), true);
        };

        WindowChildModel.prototype.watchCoords = function() {
          var scope;
          scope = this.markerCtrl != null ? this.scope.$parent : this.scope;
          return scope.$watch('coords', (function(_this) {
            return function(newValue, oldValue) {
              var pos;
              if (newValue !== oldValue) {
                if (newValue == null) {
                  return _this.hideWindow();
                } else {
                  if (!_this.validateCoords(newValue)) {
                    _this.$log.error("WindowChildMarker cannot render marker as scope.coords as no position on marker: " + (JSON.stringify(_this.model)));
                    return;
                  }
                  pos = _this.getCoords(newValue);
                  _this.gWin.setPosition(pos);
                  if (_this.opts) {
                    return _this.opts.position = pos;
                  }
                }
              }
            };
          })(this), true);
        };

        WindowChildModel.prototype.handleClick = function() {
          if (this.markerCtrl != null) {
            return this.googleMapsHandles.push(google.maps.event.addListener(this.markerCtrl, 'click', (function(_this) {
              return function() {
                var pos;
                if (_this.gWin == null) {
                  _this.createGWin();
                }
                pos = _this.markerCtrl.getPosition();
                if (_this.gWin != null) {
                  _this.gWin.setPosition(pos);
                  if (_this.opts) {
                    _this.opts.position = pos;
                  }
                  _this.showWindow();
                }
                _this.initialMarkerVisibility = _this.markerCtrl.getVisible();
                return _this.markerCtrl.setVisible(_this.isIconVisibleOnClick);
              };
            })(this)));
          }
        };

        WindowChildModel.prototype.showWindow = function() {
          var show;
          show = (function(_this) {
            return function() {
              if (_this.gWin) {
                if ((_this.scope.show || (_this.scope.show == null)) && !_this.gWin.isOpen()) {
                  return _this.gWin.open(_this.mapCtrl);
                }
              }
            };
          })(this);
          if (this.scope.templateUrl) {
            if (this.gWin) {
              $http.get(this.scope.templateUrl, {
                cache: $templateCache
              }).then((function(_this) {
                return function(content) {
                  var compiled, templateScope;
                  templateScope = _this.scope.$new();
                  if (angular.isDefined(_this.scope.templateParameter)) {
                    templateScope.parameter = _this.scope.templateParameter;
                  }
                  compiled = $compile(content.data)(templateScope);
                  return _this.gWin.setContent(compiled[0]);
                };
              })(this));
            }
            return show();
          } else {
            return show();
          }
        };

        WindowChildModel.prototype.showHide = function() {
          if (this.scope.show) {
            return this.showWindow();
          } else {
            return this.hideWindow();
          }
        };

        WindowChildModel.prototype.getLatestPosition = function() {
          if ((this.gWin != null) && (this.markerCtrl != null)) {
            return this.gWin.setPosition(this.markerCtrl.getPosition());
          }
        };

        WindowChildModel.prototype.hideWindow = function() {
          if ((this.gWin != null) && this.gWin.isOpen()) {
            return this.gWin.close();
          }
        };

        WindowChildModel.prototype.remove = function() {
          this.hideWindow();
          _.each(this.googleMapsHandles, function(h) {
            return google.maps.event.removeListener(h);
          });
          this.googleMapsHandles.length = 0;
          return delete this.gWin;
        };

        WindowChildModel.prototype.destroy = function(manualOverride) {
          var self;
          if (manualOverride == null) {
            manualOverride = false;
          }
          this.remove();
          if ((this.scope != null) && (this.needToManualDestroy || manualOverride)) {
            this.scope.$destroy();
          }
          return self = void 0;
        };

        return WindowChildModel;

      })(BaseObject);
      return WindowChildModel;
    }
  ]);

}).call(this);
