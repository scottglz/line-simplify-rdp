'use strict';

var test = require('tape');
var simplify = require('.');

test("stairstep", function(t) {
    t.plan(5);
    var stairstep = [ { x:0, y: 0}];
    for (var i=1; i < 4; i++) {
        stairstep.push({
            x: Math.floor((i)/2),
            y: Math.floor((i+2)/2)
        });
        var simplified = simplify(stairstep, 1);
        t.deepEquals(simplified, [stairstep[0],stairstep[i]], (i+1) + " points");
    }
    
    for (var i=4; i < 1000; i++) {
        stairstep.push({
            x: Math.floor((i)/2),
            y: Math.floor((i+2)/2)
        });
    }
    t.deepEquals(simplify(stairstep, 1 ), [stairstep[0],stairstep[999]], "1000 points");
    t.deepEquals(simplify(stairstep, 1, true), [stairstep[0],stairstep[999]], "1000 points, closed");
});

test("unsimplifiable", function(t) {
    t.plan(2);
    var points = [
        { x: 15, y: 60 },
        { x: 8, y: 45 },
        { x: 19, y: 16 },
        { x: 27, y: 42 }
    ];
    
    t.deepEquals(simplify(points, 1), points);
    t.deepEquals(simplify(points, 1, true), points, "Same results here with closed flag");
});

function expandPts(pts) {
   var ret = [];
   for (var i=0; i < pts.length; i += 2) {
      ret.push({x: pts[i], y: pts[i+1]}); 
   }
   return ret;
}

test("redundant square", function(t) {
    t.plan(2);
    var points = expandPts([0,0, 0,1, 0,2, 0,3, 1,3, 2,3, 3,3, 3,2, 3,1, 3,0, 2,0, 1,0]);
    t.deepEquals(simplify(points, 0, true), expandPts([0,0, 0,3, 3,3, 3,0]));
    t.deepEquals(simplify(points, 0), expandPts([0,0, 0,3, 3,3, 3,0, 1,0]), "Different results without closed flag");

});