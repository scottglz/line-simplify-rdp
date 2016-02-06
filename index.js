'use strict';

/** @module line-simplify-rdp */


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

function ptsEqual(p1, p2) {
   return p1.x === p2.x && p1.y === p2.y;
}



/**
* Return a simplified version of the polyline or polygon defined by the given 
* points. Basically what happens is that some points are removed from the line,
* but only ones that leave the resulting line within a certain distance of the 
* original.
* @alias module:line-simplify-rdp
* @param {array} points - polyline or polygon. Each element of the array must be
*        an object with at least x and y numeric properties. Neither the array
*        nor any member will be modified.
* @param {number} threshold - maximum distance the simplified line can be from 
*        the original. Should be grater than or equal to zero. Passing zero means
*        only colinear points will be eliminated; greater values lead to more
*        aggressive line approximations.
* @param {boolean} closed - if the passed first point and the last points are
*        the same, this flag does nothing. Otherwise, if closed is true, the
*        points will be treated as a polygon with an implied last segment
*        between the last point and the first point.
* @returns {array} the simplified points. (This will always be separately
*        allocated object, not the one passed in, but it *will* contain the
*        same point objects passed in.)
*/
function simplify(points, threshold, closed) {
   var len = points.length;
   threshold = threshold || 0;
   if (len <= 2 || threshold < 0)
      return points.slice(0);
      
   if (closed) {
      if (ptsEqual(points[0], points[points.length-1])) {
         // Treat as unclosed
         closed = false;  
      }
      else {
         points = points.slice(0);
         points.push(points[0]);
         len++;
      }
      
   }

   var keepers = [];
   simplifyInternal(points, 0, len-1, threshold, keepers);
   
   var out = [];
   for (var i=0; i < len; i++) {
      if (keepers[i])
         out.push(points[i]);
   }
   
   if (closed) {
      out.pop();
   }
   return out;
}

module.exports = simplify;
