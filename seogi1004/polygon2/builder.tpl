jui.define("chart.polygon.${name}", [], function() {
    var Polygon = function() {
        this.vertices = [
${vertices}
        ];

        this.faces = [
${faces}
        ];

        this.edges = [];

        this.min = new Float32Array([
            ${minX}, ${minY}, ${minZ}
        ]);

        this.max = new Float32Array([
            ${maxX}, ${maxY}, ${maxZ}
        ]);
    }

    return Polygon;
}, "chart.polygon.core");