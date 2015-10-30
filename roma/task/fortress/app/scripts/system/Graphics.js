var PreRenderer = (function () {
    function PreRenderer() {
    }

    PreRenderer.prototype.createPreRenderCanvas = function (width, height) {
        var bufferCanvas = document.createElement('canvas');
        bufferCanvas.width = width;
        bufferCanvas.height = height;
        return bufferCanvas.getContext("2d");
    };
    PreRenderer.prototype.render = function (drawFunc, width, height, canvas) {
        if (canvas === void 0) {
            canvas = null;
        }
        width += 2;
        height += 2;
        var ctx;
        // If we have a canvas thats we want to reRender onto
        if (canvas) {
            ctx = canvas.getContext('2d');
        }
        else {
            ctx = this.createPreRenderCanvas(width, height);
            ctx.translate(1, 1);
        }
        drawFunc(ctx);
        return ctx.canvas;
    };
    PreRenderer.prototype.renderAnimation = function (drawFuncsCollection, width, height) {
        var ctx = this.createPreRenderCanvas(width, height);
        for (var i in drawFuncsCollection) {
            drawFuncsCollection[i].call(ctx);
            ctx.translate(0, height);
        }
        return ctx.canvas;
    };
    return PreRenderer;
})();
var Graphics;
(function (Graphics) {
    Graphics.stats;
    Graphics.preRenderer = new PreRenderer();
    function init() {
        if (Settings.DEVELOPMENT_MODE) {
            Graphics.stats = new Stats();
            // Align top-left
            Graphics.stats.domElement.style.position = 'absolute';
            Graphics.stats.domElement.style.left = '0px';
            Graphics.stats.domElement.style.top = '0px';
            document.body.appendChild(Graphics.stats.domElement);
        }
        // requestAnim shim layer by Paul Irish
        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (/* function */ callback, /* DOMElement */ element) {
                    window.setTimeout(callback, 1000 / 60);
                    return true;
                };
        })();
    }

    Graphics.init = init;
    // may be useful in the furture for drawing rounded conor boxes for over the players head
    function roundRect(ctx, x, y, w, h, r) {
        if (w < 2 * r)
            r = w / 2;
        if (h < 2 * r)
            r = h / 2;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        return ctx;
    }

    Graphics.roundRect = roundRect;
    function createCanvas(name) {
        var canvas = document.createElement('canvas');
        canvas.id = name;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = "absolute";
        canvas.style.left = "0px";
        canvas.style.top = "0px";
        window.document.body.appendChild(canvas);
        //Disable context menu so I can use right click for game controls
        $('body').on('contextmenu', "#" + name, function (e) {
            return false;
        });
        return canvas;
    }

    Graphics.createCanvas = createCanvas;
})(Graphics || (Graphics = {}));
//# sourceMappingURL=Graphics.js.map