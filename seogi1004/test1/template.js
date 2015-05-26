jui.define("chart.brush.template", [ "handler", "util.base" ], function(handler, _) {
    var Template = function(chart) {
        var self = this;
        var fps, timeout, count, radius, g;
        var seq = 0, seqLimit = 0, list = [];

        function resetElement(newList) {
            var retList = newList || list;

            g.each(function(i, circle) {
                circle.attr({
                    cx: retList[i].cx,
                    cy: retList[i].cy,
                    fill: retList[i].fill,
                    visibility: "visible"
                });
            });
        }

        function moveElement() {
            var callback = setInterval(function() {
                if(seq == 0) {
                    handler.start(list);
                } else if(seq > seqLimit) {
                    handler.end();
                    seq = 0;

                    resetElement();
                    clearInterval(callback);

                    // 모든 엘리먼트 숨기기
                    g.each(function(i, circle) {
                        circle.attr({ visibility: "hidden" });
                    });

                    setTimeout(moveElement, 1000);
                } else {
                    var retList = handler.move(list, seq);

                    // 리턴 값이 있을 경우
                    if(_.typeCheck("array", retList)) {
                        resetElement(retList);
                    }
                }

                seq++;
            }, fps);
        }

        this.drawBefore = function() {
            g = chart.svg.group();

            fps = handler.fps || 60;
            timeout = handler.timeout || 5000;
            count = handler.count || 300;
            radius = handler.radius || 5;
            seqLimit = timeout / fps;

            // 초기 데이터 설정
            for(var i = 0; i < count; i++) {
                list[i] = {
                    cx: chart.area("width") / 2,
                    cy: chart.area("height") / 2,
                    fill: self.color(0)
                };

                g.append(chart.svg.circle({
                    cx: list[i].cx,
                    cy: list[i].cy,
                    fill: list[i].fill,
                    r: radius
                }));
            }
        }

        this.draw = function() {
            if(!_.typeCheck("function", handler.start)
                || !_.typeCheck("function", handler.move)
                || !_.typeCheck("function", handler.end)) return;

            moveElement();
            return g;
        }
    }

    return Template;
}, "chart.brush.core");

jui.ready([ "chart.builder", "handler" ], function(chart, handler) {
    chart("#chart", {
        width : handler.width || 500,
        height : handler.height || 500,
        theme : "dark",
        axis : {
            c : {
                type : "panel"
            }
        },
        brush : {
            type : "template"
        }
    });
});