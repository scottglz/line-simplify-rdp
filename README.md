# line-simplify-rdp

Simplify polylines and polygons using the 
<a href="https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm">
Ramer–Douglas–Peucker algorithm</a>.

# API
<a name="module_line-simplify-rdp"></a>
## line-simplify-rdp
<a name="exp_module_line-simplify-rdp--simplify"></a>
### simplify(points, threshold, closed) ⇒ <code>array</code> ⏏
Return a simplified version of the polyline or polygon defined by the given 
points. Basically what happens is that some points are removed from the line,
but only ones that leave the resulting line within a certain distance of the 
original.

**Kind**: Exported function  
**Returns**: <code>array</code> - the simplified points. (This will always be separately
       allocated object, not the one passed in, but it *will* contain the
       same point objects passed in.)  

| Param | Type | Description |
| --- | --- | --- |
| points | <code>array</code> | polyline or polygon. Each element of the array must be        an object with at least x and y numeric properties. Neither the array        nor any member will be modified. |
| threshold | <code>number</code> | maximum distance the simplified line can be from         the original. Should be grater than or equal to zero. Passing zero means        only colinear points will be eliminated; greater values lead to more        aggressive line approximations. |
| closed | <code>boolean</code> | if the passed first point and the last points are        the same, this flag does nothing. Otherwise, if closed is true, the        points will be treated as a polygon with an implied last segment        between the last point and the first point. |

# License

MIT