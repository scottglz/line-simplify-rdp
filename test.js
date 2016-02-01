'use strict';

var test = require('tape');
var simplify = require('.');

test("stairstep", function(t) {
    t.plan(4);
    var stairstep = [ { x:0, y: 0}];
    for (var i=1; i < 4; i++) {
        stairstep.push({
            x: Math.floor((i)/2),
            y: Math.floor((i+2)/2)
        });
        var simplified = simplify(stairstep, 1);
        t.deepEquals(simplified, [stairstep[0],stairstep[i]], (i+1) + " points");
    }
    
    for (var i=3; i < 1000; i++) {
        stairstep.push({
            x: Math.floor((i)/2),
            y: Math.floor((i+2)/2)
        });
    }
     t.deepEquals(simplify(stairstep, 1 ), [stairstep[0],stairstep[999]], "1000 points");
});

test("unsimplifiable", function(t) {
    t.plan(1);
    var points = [
        { x: 15, y: 60 },
        { x: 8, y: 45 },
        { x: 19, y: 16 },
        { x: 27, y: 42 }
    ];
    
    t.deepEquals(simplify(points, 1), points);
});