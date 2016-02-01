'use strict';

var distanceToLineSegment2 = require('distance-to-line-segment').squaredWithPrecalc;

function simplifyInternal(points, idx1, idx2, threshold, keepers) {
   keepers[idx1] = keepers[idx2] = true;
   if (idx2 <= idx1+1) 
      return;
   
   
   var point1 = points[idx1],
       point2 = points[idx2],
       x1 = point1.x,
       y1 = point1.y,
       dx = point2.x - x1,
       dy = point2.y - y1,
       lineLengthSquared = dx*dx + dy*dy;
   
   var maxDist = Number.NEGATIVE_INFINITY,
       maxDistIdx = -1;
   for (var i=idx1+1; i < idx2; i++) {
      var pointBetween = points[i];
      var dist = distanceToLineSegment2(x1, y1, dx, dy, lineLengthSquared, pointBetween.x, pointBetween.y);
      if (dist > maxDist) {
         maxDist = dist;
         maxDistIdx = i;
      }
   }
   
   if (maxDist <= threshold) 
      return; 
   
   simplifyInternal(points, idx1, maxDistIdx, threshold, keepers);
   simplifyInternal(points, maxDistIdx, idx2, threshold, keepers);
   
   
}


function simplify(points, threshold) {
   var len = points.length;
   if (len <= 2)
      return points;
   
   var keepers = [];
   simplifyInternal(points, 0, len-1, threshold, keepers);
   
   var out = [];
   for (var i=0; i < len; i++) {
      if (keepers[i])
         out.push(points[i]);
   }
   return out;
}

module.exports = simplify;
