(function() {
  describe("_.isEqual", function() {
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
      return describe("isEqual", function() {
        describe("same length", function() {
          it("when two arrays are identical - same reference", function() {
            return expect(_.isEqual(this.objArray, this.objArray)).toBeTruthy;
          });
          it("diff reference, same values", function() {
            var difArray;
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
            return expect(_.isEqual(this.objArray, difArray)).toBeTruthy;
          });
          return it("diff reference one added (new), same values (intersected)", function() {
            var difArray;
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
            return expect(_.isEqual(this.objArray, difArray)).toBeFalsy;
          });
        });
        describe("different length - not identical", function() {
          it("diff reference, diff values", function() {
            var difArray;
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
            return expect(_.isEqual(this.objArray, difArray)).toBeFalsy;
          });
          return it("diff reference, 1 val identical", function() {
            var difArray;
            difArray = [
              {
                a: 1,
                b: 1
              }
            ];
            return expect(_.isEqual(this.objArray, difArray)).toBeFalsy;
          });
        });
        return describe("array of nested objects", function() {
          beforeEach(function() {
            return this.objArray = [
              {
                a: 1,
                b: {
                  n: 1,
                  m: 2,
                  o: "hi!"
                }
              }, {
                a: 2,
                b: {
                  n: 4,
                  m: 5,
                  o: "hi!"
                }
              }, {
                a: {
                  n: 2,
                  m: 3,
                  o: "hi!"
                },
                b: 3
              }
            ];
          });
          it("same - reference should be equal", function() {
            return expect(_.isEqual(this.objArray, this.objArray)).toBeTruthy;
          });
          it("same - dif reference same values should be ==", function() {
            var difArray;
            difArray = [
              {
                a: 1,
                b: {
                  n: 1,
                  m: 2,
                  o: "hi!"
                }
              }, {
                a: 2,
                b: {
                  n: 4,
                  m: 5,
                  o: "hi!"
                }
              }, {
                a: {
                  n: 2,
                  m: 3,
                  o: "hi!"
                },
                b: 3
              }
            ];
            return expect(_.isEqual(this.objArray, difArray)).toBeTruthy;
          });
          return it("dif reference diff values should be !=", function() {
            var difArray;
            difArray = [
              {
                a: 1,
                b: {
                  n: 1,
                  m: 2,
                  o: "hi!"
                }
              }, {
                a: 2,
                b: {
                  n: 4,
                  m: 5,
                  o: "hi!!"
                }
              }, {
                a: {
                  n: 2,
                  m: 3,
                  o: "hi!"
                },
                b: 3
              }
            ];
            return expect(_.isEqual(this.objArray, difArray)).toBeFalsy;
          });
        });
      });
    });
  });

}).call(this);
