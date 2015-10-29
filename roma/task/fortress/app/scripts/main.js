var stage, w, h, manifest, loader;
var sky, grass, tank;

function init() {
    stage = new createjs.Stage("fortress");

    // grab canvas width and height for later calculations:
    w = stage.canvas.width;
    h = stage.canvas.height;

    manifest = [
        {src: "sky.png", id: "sky"},
        {src: "grass.png", id: "grass"},
        {src: "tank.png", id: "tank"}
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest, true, "./assets/images/");
}

function handleComplete() {

    sky = new createjs.Shape();
    sky.graphics.beginBitmapFill(loader.getResult("sky")).drawRect(0, 0, w, h);

    grass = new createjs.Shape();
    grass.graphics.beginBitmapFill(loader.getResult("grass")).drawRect(0, 0, w, h);

    tank = new createjs.Shape();
    tank.graphics.beginBitmapFill(loader.getResult("tank")).drawRect(0, 0, 32, 31);
    tank.x = 660;
    tank.y = 360;

    stage.addChild(sky, grass, tank);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
    stage.update(event);
}

init();

