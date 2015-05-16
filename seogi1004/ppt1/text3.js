jui.ready([ "jquery", "util.svg" ], function($, SVGUtil) {
    var svg = new SVGUtil($("#text3")[0], { width: "100%", height: 250 });

    svg.text({
        fill: "#000",
        stroke: "none",
        "font-size": 48,
        y: 40
    }).text("Example SVG Text");

    svg.text({
        fill: "none",
        stroke: "#000",
        "font-size": 48,
        y: 80
    }).text("Example SVG Text");

    svg.text({
        fill: "#999",
        stroke: "#000",
        "font-size": 48,
        y: 120
    }).text("Example SVG Text");

    printXML(svg);
});
