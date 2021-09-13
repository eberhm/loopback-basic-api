'use strict';

module.exports = function(City) {
const unusedConst = 1;
const a = {};

  function cyclomaticComplexityLimitExceeded() {
    for (var i in a) {
      for (var j in a[i]) {
        for (var k in a[i][j]) {
          for (var l in a[i][j][k]) {
            console.log(a[i][j][k][l]);
          }
        }
      }
    }
  }
};
