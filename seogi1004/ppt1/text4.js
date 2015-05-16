jui.ready([ "jquery", "util.svg" ], function($, SVGUtil) {
    var svg = new SVGUtil($("#text4")[0], { width: "100%", height: 250 });

    svg.text({
        x: 40,
        "writing-mode": "tb",
        "glyph-orientation-vertical": 90
    }).text("Example SVG Text");

    svg.text({
        fill: "#a9a9a9",
        x: 300
    }).text("Example SVG Text").rotate(25, 0, 0);

    svg.text({
        fill: "#a9a9a9",
        x: 300
    }).text("Example SVG Text").rotate(30, 0, 0);

    svg.text({
        x: 300
    }).text("Example SVG Text").rotate(30, 20, 40);

    printXML(svg);
});
