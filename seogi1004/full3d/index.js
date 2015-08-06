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

		this.rotateZ = function(a) {
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

jui.define("chart.brush.full3dcolumn", [ "util.transform3d" ], function(Transform3D) {
	var Full3dColumnBrush = function() {

		this.getFloorPoints = function(w, h, x, y) {
			var rx = this.brush.rx,
				ry = this.brush.ry,
				rz = this.brush.rz,
				max = this.brush.max;

			var points = [
				{ x : x,  		y: y,  		z: 0 },
				{ x : w + x,   	y: y,  		z: 0 },
				{ x : w + x,	y: h + y, 	z: 0 },
				{ x : x,  		y: h + y, 	z: 0 },

				{ x : x,  		y: y,  		z: 0 },
				{ x : w + x,   	y: y,  		z: 0 },
				{ x : w + x,	y: y,		z: max },
				{ x : x,	  	y: y, 		z: max },

				{ x : x,  		y: y,  		z: 0 },
				{ x : x,   		y: h + y,  	z: 0 },
				{ x : x,		y: h + y,	z: max },
				{ x : x,  		y: y, 		z: max }
			];

			if(rx != 0) {
				var transform = new Transform3D(points);
				points = transform.rotateX(rx);
			}

			if(ry != 0) {
				var transform = new Transform3D(points);
				points = transform.rotateY(ry);
			}

			if(rz != 0) {
				var transform = new Transform3D(points);
				points = transform.rotateZ(rz);
			}

			return points;
		}

		this.getPoints = function(width, height, x, y, value) {
			var rx = this.brush.rx,
				ry = this.brush.ry,
				rz = this.brush.rz,
				w2 = width / 2,
				h2 = height / 2;

			var points = [
				{ x : -w2 + x,  y: h2 + y,  z: 0 },
				{ x : w2 + x,   y: h2 + y,  z: 0 },
				{ x : w2 + x,   y: -h2 + y, z: 0 },
				{ x : -w2 + x,  y: -h2 + y, z: 0 },

				{ x : -w2 + x,  y: h2 + y,  z: value },
				{ x : w2 + x,   y: h2 + y,  z: value },
				{ x : w2 + x,   y: -h2 + y, z: value },
				{ x : -w2 + x,  y: -h2 + y, z: value },

				{ x : -w2 + x,  y: h2 + y,  z: 0 },
				{ x : w2 + x,  	y: h2 + y,  z: 0 },
				{ x : w2 + x,  	y: h2 + y, 	z: value },
				{ x : -w2 + x,  y: h2 + y, 	z: value },

				{ x : -w2 + x,  y: -h2 + y, z: 0 },
				{ x : w2 + x,  	y: -h2 + y, z: 0 },
				{ x : w2 + x,  	y: -h2 + y, z: value },
				{ x : -w2 + x,  y: -h2 + y, z: value },

				{ x : -w2 + x,  y: -h2 + y, z: 0 },
				{ x : -w2 + x,  y: -h2 + y, z: value },
				{ x : -w2 + x,  y: h2 + y, 	z: value },
				{ x : -w2 + x,  y: h2 + y, 	z: 0 },

				{ x : w2 + x,  	y: -h2 + y, z: 0 },
				{ x : w2 + x,  	y: -h2 + y, z: value },
				{ x : w2 + x,  	y: h2 + y, 	z: value },
				{ x : w2 + x,  	y: h2 + y, 	z: 0 }
			];

			if(rx != 0) {
				var transform = new Transform3D(points);
				points = transform.rotateX(rx);
			}

			if(ry != 0) {
				var transform = new Transform3D(points);
				points = transform.rotateY(ry);
			}

			if(rz != 0) {
				var transform = new Transform3D(points);
				points = transform.rotateZ(rz);
			}

			return points;
		}

		this.drawFloors = function(g) {
			var padding = this.chart.get("padding"),
				area = this.axis.area(),
				points = this.getFloorPoints(area.width, area.height, 0, 0);

			for(var k = 0; k < points.length; k++) {
				if(k % 4 == 0 || k == 0) {
					_path = this.chart.svg.polygon({
						"fill-opacity": 0.2,
						"stroke-width": 1,
						fill: "#dcdcdc",
						stroke: "#dcdcdc"
					});

					g.append(_path);
				}

				if(_path != null) {
					_path.point(points[k].x, points[k].y);
				}
			}
		}

		this.draw = function() {
			var g = this.chart.svg.group(),
				data = this.axis.data,
				target = this.brush.target,
				w = this.brush.width,
				h = this.brush.height;

			// 배경 그리기
			this.drawFloors(g);

			for(var i = 0; i < data.length; i++) {
				var x = this.axis.x(i);

				for(var j = 0; j < target.length; j++) {
					var y = this.axis.y(j),
						points = this.getPoints(w, h, x, y, data[i][target[j]]),
						color = this.color(i, j);

					for(var k = 0; k < points.length; k++) {
						if(k % 4 == 0 || k == 0) {
							_path = this.chart.svg.polygon({
								"fill-opacity": 0.4,
								"stroke-width": 1,
								fill: color,
								stroke: color
							});

							g.append(_path);
						}

						if(_path != null) {
							_path.point(points[k].x, points[k].y);
						}
					}
				}
			}

			return g;
		}
	}

	Full3dColumnBrush.setup = function() {
		return {
			width: 20,
			height: 20,
			rx: 0,
			ry: 0,
			rz: 0,
			max: 0
		}
	}

	return Full3dColumnBrush;
}, "chart.brush.core");