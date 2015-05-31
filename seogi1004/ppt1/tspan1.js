jui.ready([ "jquery", "util.svg" ], function($, SVGUtil) {
    var svg = new SVGUtil($("#tspan1")[0], { width: "100%", height: 250 });

    svg.text({
        y: 30
    }).html("Example <tspan fill='red'>SVG</tspan> text");

    svg.text({
        y: 80
    }).html("<tspan>Word 1</tspan><tspan x='0' dy='25'>Word 2</tspan>");

    printXML(svg);
});