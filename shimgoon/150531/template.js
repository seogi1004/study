jui.define("chart.brush.template", [ "handler", "util.base" ], function(handler, _) {
    var Template = function(chart) {
        var self = this;
        var fps, timeout, wait, count, radius, g;
        var seq = 0, seqLimit = 0, round = 0, list = [];

        function resetElement(newList) {
            var retList = newList || list;

            g.each(function(i, circle) {
                circle.attr({
                    cx: retList[i].cx,
                    cy: retList[i].cy,
                    fill: retList[i].fill,
                    visibility: "visible"
                });
                if( retList[i].r ){ circle.attr({ r:retList[i].r }); }
                if( retList[i]["fill-opacity"] ){ circle.attr({ 'fill-opacity': retList[i]["fill-opacity"] }); }     
            });
        }

        function moveElement() {
            var callback = setInterval(function() {
                seq++;

                if(seq == 1) {
                    handler.start(list, ++round);
                } else if(seq > seqLimit) {
                    handler.end();
                    seq = 0;

                    resetElement();
                    clearInterval(callback);

                    // ��� ������Ʈ �����
                    g.each(function(i, circle) {
                        circle.attr({ visibility: "hidden" });
                    });

                    setTimeout(moveElement, wait);
                } else {
                    var retList = handler.move(seq - 1, seqLimit);

                    // ���� ���� ���� ���
                    if(_.typeCheck("array", retList)) {
                        resetElement(retList);
                    }
                }
            }, fps);
        }

        this.drawBefore = function() {
            g = chart.svg.group();

            fps = handler.fps || 60;
            timeout = handler.timeout || 5000;
            wait = handler.wait || 1000;
            count = handler.count || 36;
            radius = handler.radius || 3;
            seqLimit = timeout / fps;

            // �ʱ� ������ ����
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
        padding: 0,
        width: handler.width || 500,
        height: handler.height || 500,
        theme: "dark",
        axis: {
            c: {
                type : "panel"
            }
        },
        brush: {
            type : "template"
        }
    });
});