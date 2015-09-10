jui.ready([ "jquery", "util.svg" ], function($, SVGUtil) {
    var svg = new SVGUtil($("#tref1")[0], { width: "100%", height: 0 });

    svg.defs(function() {
        svg.text({
            id: "text1"
        }).text("Example SVG text");
    });

    svg.text({
        y: 40
    }).html("<tref xlink:href='#text1'></tref>");

    svg.text({
        y: 80
    }).html("<tref xlink:href='#text1'></tref>");

    printXML(svg);
});