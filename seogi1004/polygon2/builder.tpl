jui.define("chart.polygon.${name}", [], function() {
    var Polygon = function() {
        this.vertices = [
${vertices}
        ];

        this.faces = [
${faces}
        ];

        this.edges = [];

        this.min = [
            ${minX}, ${minY}, ${minZ}
        ];

        this.max = [
            ${maxX}, ${maxY}, ${maxZ}
        ];
    }

    return Polygon;
}, "chart.polygon.core");