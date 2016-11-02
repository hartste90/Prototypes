(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api.models.parent").factory("LayerParentModel", [
    "BaseObject", "Logger", function(BaseObject, Logger) {
      var LayerParentModel;
      LayerParentModel = (function(_super) {
        __extends(LayerParentModel, _super);

        function LayerParentModel(scope, element, attrs, mapCtrl, $timeout, onLayerCreated, $log) {
          this.scope = scope;
          this.element = element;
          this.attrs = attrs;
          this.mapCtrl = mapCtrl;
          this.$timeout = $timeout;
          this.onLayerCreated = onLayerCreated != null ? onLayerCreated : void 0;
          this.$log = $log != null ? $log : Logger;
          this.createGoogleLayer = __bind(this.createGoogleLayer, this);
          if (this.attrs.type == null) {
            this.$log.info("type attribute for the layer directive is mandatory. Layer creation aborted!!");
            return;
          }
          this.createGoogleLayer();
          this.gMap = void 0;
          this.doShow = true;
          this.$timeout((function(_this) {
            return function() {
              _this.gMap = mapCtrl.getMap();
              if (angular.isDefined(_this.attrs.show)) {
                _this.doShow = _this.scope.show;
              }
              if (_this.doShow && (_this.gMap != null)) {
                _this.layer.setMap(_this.gMap);
              }
              _this.scope.$watch("show", function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  _this.doShow = newValue;
                  if (newValue) {
                    return _this.layer.setMap(_this.gMap);
                  } else {
                    return _this.layer.setMap(null);
                  }
                }
              }, true);
              _this.scope.$watch("options", function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  _this.layer.setMap(null);
                  _this.layer = null;
                  return _this.createGoogleLayer();
                }
              }, true);
              return _this.scope.$on("$destroy", function() {
                return _this.layer.setMap(null);
              });
            };
          })(this));
        }

        LayerParentModel.prototype.createGoogleLayer = function() {
          if (this.attrs.options == null) {
            this.layer = this.attrs.namespace === void 0 ? new google.maps[this.attrs.type]() : new google.maps[this.attrs.namespace][this.attrs.type]();
          } else {
            this.layer = this.attrs.namespace === void 0 ? new google.maps[this.attrs.type](this.scope.options) : new google.maps[this.attrs.namespace][this.attrs.type](this.scope.options);
          }
          return this.$timeout((function(_this) {
            return function() {
              var fn;
              if ((_this.layer != null) && (_this.onLayerCreated != null)) {
                fn = _this.onLayerCreated(_this.scope, _this.layer);
                if (fn) {
                  return fn(_this.layer);
                }
              }
            };
          })(this));
        };

        return LayerParentModel;

      })(BaseObject);
      return LayerParentModel;
    }
  ]);

}).call(this);
