jui.define("chart.polygon.${name}", [], function() {
    var Polygon = function() {
        this.vertices = [
${vertices}
        ];

        this.faces = [
${faces}
        ];
    }

    return Polygon;
}, "chart.polygon.core");