jui.defineUI("chartx.coordinate", [ "chart.builder" ], function(builder) {
    var UI = function() {
        this.init = function() {
            var opts = this.options;

            this.chart = builder(this.selector, {
                theme: opts.theme,
                padding: opts.padding,
                width: opts.width,
                height: opts.height,
                axis: [{
                    x: {
                        type: "range",
                        domain: opts.domain,
                        unit: 1,
                        line: "solid"
                    },
                    y: {
                        type: "range",
                        domain: opts.domain,
                        unit: 1,
                        line: "solid"
                    },
                    data: opts.data
                }],
                brush: [{
                    type: opts.brush
                }],
                style: {
                    gridXAxisBorderWidth: 1,
                    gridYAxisBorderWidth: 1,
                    gridTickBorderSize: 0,
                    gridXFontSize: 9,
                    gridYFontSize: 9
                }
            });
        }

        this.update = function(data) {
            this.chart.axis(0).update(data);
        }
    }

    UI.setup = function() {
        return {
            theme: "dark",
            data: [],
            domain: [ -10, 10 ],
            brush: null,
            width: 750,
            height: 750,
            padding: 20
        }
    }

    return UI;
});