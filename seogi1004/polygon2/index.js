jui.define("util.matrix", [ "util.base" ], function(_) {
    // 2x1 or 3x1 or ?x1 형태의 매트릭스 연산
    function matrix(a, b) {
        var m = [];

        for(var i = 0, len = a.length; i < len; i++) {
            var sum = 0;

            for(var j = 0, len2 = a[i].length; j < len2; j++) {
                sum += a[i][j] * b[j];
            }

            m.push(sum);
        }

        return m;
    }


    // 2x2 or 3x3 형태의 매트릭스 연산
    function deepMatrix(a, b) {
        var m = [], nm = [];

        for(var i = 0, len = b.length; i < len; i++) {
            m[i] = [];
            nm[i] = [];
        }

        for(var i = 0, len = b.length; i < len; i++) {
            for(var j = 0, len2 = b[i].length; j < len2; j++) {
                m[j].push(b[i][j]);
            }
        }

        for(var i = 0, len = m.length; i < len; i++) {
            var mm = matrix(a, m[i]);

            for(var j = 0, len2 = mm.length; j < len2; j++) {
                nm[j].push(mm[j]);
            }
        }

        return nm;
    }

    return function(a, b) {
        if(_.typeCheck("array", b[0])) {
            return deepMatrix(a, b);
        }

        return matrix(a, b);
    }
});

jui.define("util.transform", [ "util.matrix", "util.math" ], function(matrix, math) {
    var Transform = function(points) {

        function calculate(m) {
            for(var i = 0, count = points.length; i < count; i++) {
                points[i] = matrix(m, points[i]);
            }

            return points;
        };

        // 매트릭스 맵
        this.matrix = function() {
            var a = arguments,
                type = a[0];

            var map = {
                // 2D 행렬, 3x3
                move: [
                    [ 1, 0, a[1] ],
                    [ 0, 1, a[2] ],
                    [ 0, 0, 1 ]
                ],
                scale: [
                    [ a[1], 0, 0 ],
                    [ 0, a[2], 0 ],
                    [ 0, 0, 1 ]
                ],
                rotate: [
                    [ Math.cos(math.radian(a[1])), -Math.sin(math.radian(a[1])), 0 ],
                    [ Math.sin(math.radian(a[1])), Math.cos(math.radian(a[1])), 0 ],
                    [ 0, 0, 1 ]
                ],

                // 3D 행렬, 4x4
                move3d: [
                    [ 1, 0, 0, a[1] ],
                    [ 0, 1, 0, a[2] ],
                    [ 0, 0, 1, a[3] ],
                    [ 0, 0, 0, 1 ]
                ],
                scale3d: [
                    [ a[1], 0, 0, 0 ],
                    [ 0, a[2], 0, 0 ],
                    [ 0, 0, a[3], 0 ],
                    [ 0, 0, 0, 1 ]
                ],
                rotate3dz: [
                    [ Math.cos(math.radian(a[1])), -Math.sin(math.radian(a[1])), 0, 0 ],
                    [ Math.sin(math.radian(a[1])), Math.cos(math.radian(a[1])), 0, 0 ],
                    [ 0, 0, 1, 0 ],
                    [ 0, 0, 0, 1 ]
                ],
                rotate3dx: [
                    [ 1, 0, 0, 0 ],
                    [ 0, Math.cos(math.radian(a[1])), -Math.sin(math.radian(a[1])), 0 ],
                    [ 0, Math.sin(math.radian(a[1])), Math.cos(math.radian(a[1])), 0 ],
                    [ 0, 0, 0, 1 ]
                ],
                rotate3dy: [
                    [ Math.cos(math.radian(a[1])), 0, Math.sin(math.radian(a[1])), 0 ],
                    [ 0, 1, 0, 0 ],
                    [ -Math.sin(math.radian(a[1])), 0, Math.cos(math.radian(a[1])), 0 ],
                    [ 0, 0, 0, 1 ]
                ]
            }

            return map[type];
        }

        // 2차원 이동
        this.move = function(dx, dy) {
            return calculate(this.matrix("move", dx, dy));
        }

        // 3차원 이동
        this.move3d = function(dx, dy, dz) {
            return calculate(this.matrix("move3d", dx, dy, dz));
        }

        // 2차원 스케일
        this.scale = function(sx, sy) {
            return calculate(this.matrix("scale", sx, sy));
        }

        // 3차원 스케일
        this.scale3d = function(sx, sy, sz) {
            return calculate(this.matrix("scale3d", sx, sy, sz));
        }

        // 2차원 회전
        this.rotate = function(angle) {
            return calculate(this.matrix("rotate", angle));
        }

        // Z축 중심 3차원 회전 - 롤(ROLL)
        this.rotate3dz = function(angle) {
            return calculate(this.matrix("rotate3dz", angle));
        }

        // X축 중심 3차원 회전 - 롤(PITCH)
        this.rotate3dx = function(angle) {
            return calculate(this.matrix("rotate3dx", angle));
        }

        // Y축 중심 3차원 회전 - 요(YAW)
        this.rotate3dy = function(angle) {
            return calculate(this.matrix("rotate3dy", angle));
        }

        // 임의의 행렬 처리
        this.custom = function(m) {
            return calculate(m);
        }

        // 행렬의 병합
        this.merge = function() {
            var a = arguments,
                m = this.matrix.apply(this, a[0]);

            for(var i = 1; i < a.length; i++) {
                m = matrix(m, this.matrix.apply(this, a[i]));
            }

            return calculate(m);
        }
    }

    return Transform;
});

jui.define("chart.brush.polygon3d", [], function() {
    var Polygon3dBrush = function() {
        this.drawBefore = function() {
            var model = this.axis.data;

            this.vertices = model.vertices;
            this.faces = model.faces;
        }

        this.draw = function() {
            var g = this.chart.svg.group(),
                path = this.chart.svg.path({
                    stroke: this.color(0),
                    "stroke-width": 0.5
                });

            for(var i = 0, len = this.faces.length; i < len; i++) {
                var face = this.faces[i]

                for (var j = 0, len2 = face.length; j < len2; j++) {
                    var targetPoint = this.vertices[face[j]];

                    if (targetPoint) {
                        var x = this.axis.x(targetPoint[0]),
                            y = this.axis.y(targetPoint[1]);

                        if (j == 0) {
                            path.MoveTo(x, y);
                        } else {
                            if(j == face.length - 1) {
                                var firstPoint = this.vertices[face[0]],
                                    x = this.axis.x(firstPoint[0]),
                                    y = this.axis.y(firstPoint[1]);

                                path.LineTo(x, y);
                            } else {
                                path.LineTo(x, y);
                            }
                        }
                    }
                }
            }

            g.append(path);

            return g;
        }
    }

    return Polygon3dBrush;
}, "chart.brush.core");