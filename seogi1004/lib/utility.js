function printXML(svg) {
    svg.render();

    var g = svg.root.get(0),
        $root = $(svg.root.element).parent();

    g.each(function(i, child) {
        var xml = child.element.outerHTML;

        if($root.find("pre").size() == 0) {
            $root.append("<pre></pre>");
        }

        $root.find("pre").append(xml.split("<").join("&lt;") + "<br/>");
    });
}