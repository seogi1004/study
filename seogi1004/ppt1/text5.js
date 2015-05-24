jui.ready([ "jquery", "util.svg" ], function($, SVGUtil) {
    var svg = new SVGUtil($("#text5")[0], { width: "100%", height: 250 });

    svg.text({
        y: 30,
        textLength: 150,
        lengthAdjust: "spacing"
    }).text("Example SVG text");

    svg.text({
        y: 60,
        textLength: 150,
        lengthAdjust: "spacingAndGlyphs"
    }).text("Example SVG text");

    svg.text({
        y: 100,
        textLength: 300,
        lengthAdjust: "spacing"
    }).text("Example SVG text");

    svg.text({
        y: 130,
        textLength: 300,
        lengthAdjust: "spacingAndGlyphs"
    }).text("Example SVG text");

    printXML(svg);
});