jui.ready([ "jquery", "util.svg" ], function($, SVGUtil) {
    var svg = new SVGUtil($("#tspan2")[0], { width: "100%", height: 250 });

    svg.text({
        y: 40
    }).html("<tspan dy='5 10 20 40'>Word</tspan>");

    svg.text({
        x: 200,
        y: 40
    }).html("<tspan dx='5 10 20 40'>Word</tspan>");

    printXML(svg);
});