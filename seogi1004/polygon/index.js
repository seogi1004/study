jui.define("util.transform3d", [], function() {
	var Transform3D = function(points) {

		this.getPoints = function(m) {
			/*
			 |a, b, c| |x|
			 |d, e, f| |y|
			 |g, h, i| |z|
			 */
			var point;
			var x, y, z;
			var result = null;

			for( var i= 0, count=points.length ; i<count ; i+=1 ){
				point = points[ i ];
				z = point.z;
				x = point.x;
				y = point.y;
				result = {};
				result.x = m.a * x + m.b * y + m.c * z;
				result.y = m.d * x + m.e * y + m.f * z;
				result.z = m.g * x  + m.h * y + m.i * z;
				points[ i ] = result;
			}

			return points;
		},

			this.rotateZ = function(a){
				a = a / 180 * Math.PI;
				/*
				 | a, b, c || cosA, -sinA, 0 |
				 | d, e, f || sinA, cosA,  0 |
				 | g, h, i ||    0,    0,  1 |
				 */
				var cosA = Math.cos(a);
				var sinA = Math.sin(a);

				return this.getPoints({
					a : cosA,
					b : -sinA,
					c : 0,
					d : sinA,
					e : cosA,
					f : 0,
					g : 0,
					h : 0,
					i : 1
				});
			},

			this.rotateX = function(a) {
				a = a / 180 * Math.PI;
				/*
				 | a, b, c || 1,    0,     0 |
				 | d, e, f || 0, cosA, -sinA |
				 | g, h, i || 0, sinA,  cosA |
				 */
				var cosA = Math.cos(a);
				var sinA = Math.sin(a);

				return this.getPoints({
					a : 1,
					b : 0,
					c : 0,
					d : 0,
					e : cosA,
					f :  -sinA,
					g : 0,
					h : sinA,
					i : cosA
				});
			},

			this.rotateY = function(a) {
				a = a / 180 * Math.PI;
				/*
				 | a, b, c || cosA,  0, -sinA |
				 | d, e, f || 0,    1,     0 |
				 | g, h, i || sinA, 0,  cosA |
				 */
				var cosA = Math.cos(a);
				var sinA = Math.sin(a);

				return this.getPoints({
					a : cosA,
					b : 0,
					c : -sinA ,
					d : 0,
					e : 1,
					f : 0,
					g : sinA,
					h : 0,
					i : cosA
				});
			}
	}

	return Transform3D;
});

jui.define("chart.brush.point3d", [], function() {
	var Point3dBrush = function() {
		this.draw = function() {
			var g = this.chart.svg.group();

			this.eachData(function(i, data) {
				var c = this.chart.svg.circle({
					r: 1,
					fill: this.color(0),
					cx: this.axis.x(data.x),
					cy: this.axis.y(data.y)
				});

				g.append(c);
			});

			return g;
		}
	}

	return Point3dBrush;
}, "chart.brush.core");