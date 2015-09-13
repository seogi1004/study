jui.define("chart.widget.finger", [ "util.math" ], function(_) {
    var MSG_1 = "Step 1. Select a circle",
        MSG_2 = "Step 2. Set your angle, then click the background",
        MSG_3 = "Step 3. Set the strength of the circle";

    var FINGER_WIDTH = 10,
        FINGER_HEIGHT = 20,
        FINGER_RADIUS = 22,
        GAUGE_WIDTH = 40,
        GAUGE_HEIGHT = 3,
        GAUGE_RADIUS = 3;

    var FingerWidget = function() {
        var target = null,
            degree = 0,
            percent = 0,
            pvector = 10,
            interval = null;

        this.initEvents = function(finger, gauge, line, title) {


            this.on("click", function(obj, e) {
                target = obj;

                var x = target.data.x,
                    y = target.data.y;

                finger.attr({
                    visibility: "visible"
                });

                line.attr({
                    stroke : '#fff'
                })

                title.text(MSG_2);
            });

            this.on("chart.mousemove", function(e) {
                var status = finger.attributes.visibility;

                if(target == null || status == "hidden") return;

                var cx = target.data.x,
                    cy = target.data.y,
                    r = Math.atan2(e.chartY - cy, e.chartX - cx),
                    d = _.degree(r),
                    tx = cx + (FINGER_RADIUS * Math.cos(r)),
                    ty = cy + (FINGER_RADIUS * Math.sin(r));

                finger.translate(tx - FINGER_WIDTH / 2, ty - FINGER_HEIGHT / 2);
                finger.rotate(d - 90, FINGER_WIDTH / 2, FINGER_HEIGHT / 2);
                line.translate(cx, cy);
                line.rotate(d - 90, 0, 0);
                gauge.translate(tx - GAUGE_WIDTH / 2, ty - GAUGE_HEIGHT / 2);
                gauge.rotate(d - 90, GAUGE_WIDTH / 2, GAUGE_HEIGHT / 2);

                degree = d - 180;
            });

            this.on("chart.mousedown", function(e) {
                var gaugeStatus = gauge.attributes.visibility,
                    fingerStatus = finger.attributes.visibility;

                if(target == null) return;

                if(fingerStatus == "visible") {
                    gauge.attr({
                        visibility: "visible"
                    });

                    finger.attr({
                        visibility: "hidden"
                    });

                    title.text(MSG_3);

                    // 바 게이지 작동
                    interval = setInterval(function() {
                        var bar = gauge.get(1),
                            tick = GAUGE_WIDTH/100;

                        percent += pvector;

                        if(percent < 10) {
                            pvector = -pvector;
                            percent = 10;
                        }
                        if(percent > 90) {
                            pvector = -pvector;
                            percent = 100;
                        }

                        bar.attr({ width: tick * percent });
                    }, 50);
                }

                if(gaugeStatus == "visible") {
                    clearInterval(interval);

                    gauge.attr({
                        visibility: "hidden"
                    });

                    title.text(MSG_1);

                    this.chart.emit("finger.hit", [ target.dataIndex, degree, percent, line ]);

                    target = null;
                    interval = null;
                    percent = 0;
                }
            });
        }


        this.draw = function() {
            var g = this.chart.svg.group(),
                gauge = this.chart.svg.group({
                    visibility: "hidden"
                }),
                finger = this.chart.svg.polygon({
                    fill: this.widget.fingerColor,
                    visibility: "hidden"
                }),
                line = this.chart.svg.line({
                    'x1' : 0,
                    'y1' : 0,
                    'x2' : 0,
                    'y2' : this.chart.area("height") / 2 * -1,
                    'stroke' : '#fff',
                    'stroke-width' : 2
                }),
                title = this.chart.svg.text({
                    "text-anchor": "middle",
                    "font-size": 12,
                    "x": this.chart.area("width") / 2,
                    "y": -15,
                    "fill": this.chart.theme("titleFontColor")
                });

            // 게이지 생성
            gauge.append(this.chart.svg.rect({
                rx: GAUGE_RADIUS,
                ry: GAUGE_RADIUS,
                width: GAUGE_WIDTH,
                height: GAUGE_HEIGHT,
                fill: this.widget.gaugeColor
            }));
            gauge.append(this.chart.svg.rect({
                rx: GAUGE_RADIUS,
                ry: GAUGE_RADIUS,
                width: 0,
                height: GAUGE_HEIGHT,
                fill: this.widget.fingerColor
            }));


            // 각도 조작기 생성
            finger.point(0, FINGER_HEIGHT);
            finger.point(FINGER_WIDTH, FINGER_HEIGHT);
            finger.point(FINGER_WIDTH/2, 0);

            g.append(finger);
            g.append(line);
            g.append(gauge);

            // 타이틀 생성
            title.text(MSG_1);
            g.append(title);

            // 기본 좌표 설정
            g.translate(this.chart.area("x"), this.chart.area("y"));

            // 이벤트 설정
            this.initEvents(finger, gauge, line, title);

            return g;
        }
    }

    FingerWidget.setup = function() {
        return {
            fingerColor: "#ff7800",
            gaugeColor: "#dcdcdc"
        }
    }

    return FingerWidget;
}, "chart.widget.core");