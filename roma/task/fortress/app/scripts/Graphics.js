var Graphics;
(function(Graphics){

    Graphics.stats;
    function init(){
        Graphics.stats = new Stats();
        Graphics.stats.domElement.style.position = "absolute";
        Graphics.stats.domElement.style.left = "0px";
        Graphics.stats.domElement.style.top = "0px";
        document.body.appendChild(Graphics.stats.domElement);
        var update = function () {
            Graphics.stats.begin();
            Graphics.stats.end();
            requestAnimationFrame( update );
        };
        requestAnimationFrame( update );
    }
    Graphics.init = init;

    function roundRect(ctx, x, y, w, h, r)
    {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
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

    function createCanvas(name){
        var canvas = document.createElement("canvas");
        canvas.id = name;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = "absolute";
        canvas.style.left = "0px";
        canvas.style.top = "0px";
        window.document.body.appendChild(canvas);
        return canvas;
    }
    Graphics.createCanvas = createCanvas;

})(Graphics || (Graphics = {}));
