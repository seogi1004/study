jui.ready([ "jquery", "util.svg" ], function($, SVGUtil) {
    var svg = new SVGUtil($("#text1")[0], { width: 300, height: 300 });

    svg.text({
        y: 40
    }).text("Example SVG text 1");

    svg.text({
        y: 80
    }).text("Example SVG text 2");

    svg.render();

    printXML(svg);
});