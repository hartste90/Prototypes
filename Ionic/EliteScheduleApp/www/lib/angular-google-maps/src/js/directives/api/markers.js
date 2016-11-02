(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("google-maps.directives.api").factory("Markers", [
    "IMarker", "MarkersParentModel", function(IMarker, MarkersParentModel) {
      var Markers;
      return Markers = (function(_super) {
        __extends(Markers, _super);

        function Markers($timeout) {
          this.link = __bind(this.link, this);
          var self;
          Markers.__super__.constructor.call(this, $timeout);
          this.template = '<span class="angular-google-map-markers" ng-transclude></span>';
          this.scope.idKey = '=idkey';
          this.scope.doRebuildAll = '=dorebuildall';
          this.scope.models = '=models';
          this.scope.doCluster = '=docluster';
          this.scope.clusterOptions = '=clusteroptions';
          this.scope.clusterEvents = '=clusterevents';
          this.scope.labelContent = '=labelcontent';
          this.scope.labelAnchor = '@labelanchor';
          this.scope.labelClass = '@labelclass';
          this.$timeout = $timeout;
          self = this;
          this.$log.info(this);
        }

        Markers.prototype.controller = [
          '$scope', '$element', function($scope, $element) {
            return {
              getMarkersScope: function() {
                return $scope;
              }
            };
          }
        ];

        Markers.prototype.link = function(scope, element, attrs, ctrl) {
          return new MarkersParentModel(scope, element, attrs, ctrl, this.$timeout);
        };

        return Markers;

      })(IMarker);
    }
  ]);

}).call(this);
