jui.define("util.matrix", [ "util.base" ], function(_) {
    // 2x1 or 3x1 or ?x1 ������ ��Ʈ���� ����
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


    // 2x2 or 3x3 ������ ��Ʈ���� ����
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

        function GetPerspective(width, height, near, far, angle)
        {
            var ar = width / height,
                an = math.radian(angle);

            return [
                [ 1 / (ar * Math.tan(an / 2)), 0, 0, 0 ],
                [ 0, 1 / Math.tan(an / 2), 0, 0 ],
                [ 0, 0, (-near -far) / (near - far), 2 * near * far / (near - far) ],
                [ 0, 0, 1, 0 ],
            ]
        }

        function GetPerspective2(top, right, bottom, left, near, far)
        {
            return [
                [ (2*near) / (right-left), 0, (right+left) / (right-left), 0 ],
                [ 0, (2*near) / (top-bottom), (top+bottom) / (top-bottom), 0 ],
                [ 0, 0, (near+far) / (near-far), (2*near*far) / (near-far) ],
                [ 0, 0, -1, 0 ],
            ]
        }

        // ��Ʈ���� ��
        this.matrix = function() {
            var a = arguments,
                type = a[0];

            var map = {
                // 2D ���, 3x3
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

                // 3D ���, 4x4
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
                ],
                perspective: GetPerspective(a[1], a[2], a[3], a[4], a[5]),
                perspective2: GetPerspective2(a[1], a[2], a[3], a[4], a[5], a[6])
            }

            return map[type];
        }

        // 2���� �̵�
        this.move = function(dx, dy) {
            return calculate(this.matrix("move", dx, dy));
        }

        // 3���� �̵�
        this.move3d = function(dx, dy, dz) {
            return calculate(this.matrix("move3d", dx, dy, dz));
        }

        // 2���� ������
        this.scale = function(sx, sy) {
            return calculate(this.matrix("scale", sx, sy));
        }

        // 3���� ������
        this.scale3d = function(sx, sy, sz) {
            return calculate(this.matrix("scale3d", sx, sy, sz));
        }

        // 2���� ȸ��
        this.rotate = function(angle) {
            return calculate(this.matrix("rotate", angle));
        }

        // Z�� �߽� 3���� ȸ�� - ��(ROLL)
        this.rotate3dz = function(angle) {
            return calculate(this.matrix("rotate3dz", angle));
        }

        // X�� �߽� 3���� ȸ�� - ��(PITCH)
        this.rotate3dx = function(angle) {
            return calculate(this.matrix("rotate3dx", angle));
        }

        // Y�� �߽� 3���� ȸ�� - ��(YAW)
        this.rotate3dy = function(angle) {
            return calculate(this.matrix("rotate3dy", angle));
        }

        // ������ ��� ó��
        this.custom = function(m) {
            return calculate(m);
        }

        // ����� ����
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

jui.define("chart.brush.rectangle3d", [ "util.base" ], function(_) {
    var Rectangle3D = function() {
        this.draw = function() {
            var opts = {
                    fill: this.color(0),
                    "fill-opacity": 0.1,
                    stroke: this.color(1),
                    "stroke-width": 1
                },
                g = this.chart.svg.group(),
                path = null,
                data = this.axis.data.vertices;

            for(var i = 0; i < data.length; i++) {
                if(i % 4 == 0 || i == 0) {
                    /*/
                    if(data[i][2] > 0) {
                        opts.fill = "red";
                        opts.stroke = "red";
                        opts["fill-opacity"] = 1;
                    } else {
                        opts.fill = "blue";
                        opts.stroke = "blue";
                        opts["fill-opacity"] = 1;
                    }
                    /**/

                    path = this.chart.svg.polygon(opts);
                    g.append(path);
                }

                if(path != null) {
                    path.point(this.axis.x(data[i][0]), this.axis.y(data[i][1]));
                }
            }

            return g;
        }
    }

    return Rectangle3D;
}, "chart.brush.core");