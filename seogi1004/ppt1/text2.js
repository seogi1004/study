jui.ready([ "jquery", "util.svg" ], function($, SVGUtil) {
    var svg = new SVGUtil($("#text2")[0], { width: "100%", height: 250 });

    svg.g({}, function() {
        svg.text({
            "text-anchor": "start",
            y: 40
        }).text("Example SVG text");
    }).translate(500, 0);


    svg.g({}, function() {
        svg.text({
            "text-anchor": "middle",
            y: 80
        }).text("Example SVG text");
    }).translate(500, 0);

    svg.g({}, function() {
        svg.text({
            "text-anchor": "end",
            y: 120
        }).text("Example SVG text");
    }).translate(500, 0)

    svg.path({ stroke: "red", "stroke-width": 2 })
        .MoveTo(500, 0)
        .LineTo(500, 120);

    printXML(svg);
});