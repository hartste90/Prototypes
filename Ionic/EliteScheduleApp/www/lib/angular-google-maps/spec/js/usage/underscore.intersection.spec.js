(function() {
  describe("_.intersectionObjects", function() {
    beforeEach(function() {
      return this.objArray = [
        {
          a: 1,
          b: 1
        }, {
          a: 2,
          b: 2
        }, {
          a: 3,
          b: 3
        }
      ];
    });
    return describe("Comparing Arrays of Objects", function() {
      describe("intersection", function() {
        describe("same length", function() {
          return it("when two arrays are identical - same reference", function() {
            var interArray;
            interArray = _.intersection(this.objArray, this.objArray);
            return expect(interArray.length).toEqual(this.objArray.length);
          });
        });
        return describe("different length - not identical", function() {
          it("diff reference, diff values", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 2
              }, {
                a: 2,
                b: 3
              }, {
                a: 3,
                b: 4
              }
            ];
            interArray = _.intersection(this.objArray, difArray);
            return expect(interArray.length).toEqual(0);
          });
          it("diff reference, 1 val identical", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }
            ];
            interArray = _.intersection(this.objArray, difArray);
            return expect(interArray.length).toEqual(0);
          });
          return it("diff reference, same values", function() {
            var difArray, diffArray, index, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }, {
                a: 2,
                b: 2
              }, {
                a: 3,
                b: 3
              }
            ];
            diffArray = this.objArray;
            index = this.objArray.indexOf({
              a: 1,
              b: 1
            });
            expect(index).toBe(-1);
            interArray = _.intersection(this.objArray, difArray);
            return expect(interArray.length).toEqual(0);
          });
        });
      });
      return describe("_.intersectionObjects - extension", function() {
        describe("same length", function() {
          it("when two arrays are identical - same reference", function() {
            var interArray;
            interArray = _.intersectionObjects(this.objArray, this.objArray);
            return expect(interArray.length).toEqual(this.objArray.length);
          });
          it("diff reference, same values", function() {
            var difArray, diffArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }, {
                a: 2,
                b: 2
              }, {
                a: 3,
                b: 3
              }
            ];
            diffArray = this.objArray;
            interArray = _.intersectionObjects(this.objArray, difArray);
            return expect(interArray.length).toEqual(this.objArray.length);
          });
          return it("diff reference one added (new), same values (intersected)", function() {
            var difArray, diffArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }, {
                a: 2,
                b: 2
              }, {
                a: 3,
                b: 3
              }, {
                a: 4,
                b: 4
              }
            ];
            diffArray = this.objArray;
            interArray = _.intersectionObjects(this.objArray, difArray);
            return expect(interArray.length).toEqual(this.objArray.length);
          });
        });
        return describe("different length - not identical", function() {
          it("diff reference, diff values", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 2
              }, {
                a: 2,
                b: 3
              }, {
                a: 3,
                b: 4
              }
            ];
            interArray = _.intersectionObjects(this.objArray, difArray);
            return expect(interArray.length).toEqual(0);
          });
          return it("diff reference, 1 val identical", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }
            ];
            interArray = _.intersectionObjects(this.objArray, difArray);
            expect(interArray.length).toEqual(1);
            return expect(interArray.length).not.toEqual(this.objArray.length);
          });
        });
      });
    });
  });

}).call(this);
