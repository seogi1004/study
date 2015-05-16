jui.ready([ "jquery", "util.svg" ], function($, SVGUtil) {
    var svg = new SVGUtil($("#text1")[0], { width: "100%", height: 250 });

    svg.text({
        "font-size": 40,
        x: 0,
        y: 0
    }).text("Example SVG text");

    svg.text({
        "font-size": 40,
        x: 0,
        y: 40
    }).text("Example SVG text");

    svg.text({
        "font-size": 40,
        dx: 50,
        dy: 50,
        x: 0,
        y: 80
    }).text("Example SVG text");

    printXML(svg);
});