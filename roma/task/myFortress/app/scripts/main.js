String.prototype.format = function () {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i - 0] = arguments[_i];
    }
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};
// Just some short-cut renaming
var Box2D;
var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    b2AABB = Box2D.Collision.b2AABB,
    b2ContactListener = Box2D.Dynamics.b2ContactListener,
    b2RayCastInput = Box2D.Collision.b2RayCastInput,
    b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
    b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
    b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
    b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint,
    b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
    b2WorldManifold = Box2D.Collision.b2WorldManifold,
    b2Shape = Box2D.Collision.Shapes.b2Shape;

var Physics;
(function (Physics) {
    Physics.worldScale;
    Physics.world;
    Physics.debugDraw;
    Physics.fastAcessList = [];

    function addToFastAcessList(body) {
        Physics.fastAcessList.push(body);
    }
    Physics.addToFastAcessList = addToFastAcessList;

    function removeToFastAcessList(body) {
        for (var b in Physics.fastAcessList) {
            if (Physics.fastAcessList[b] === body) {
                Utilies.deleteFromCollection(Physics.fastAcessList, b);
            }
        }
    }
    Physics.removeToFastAcessList = removeToFastAcessList;

    function init(ctx) {
        Physics.worldScale = 30;
        Physics.world = new b2World(new b2Vec2(0, 10), true);
        Physics.debugDraw = new b2DebugDraw();
        Physics.debugDraw.SetSprite(ctx);
        Physics.debugDraw.SetDrawScale(Physics.worldScale);
        Physics.debugDraw.SetFillAlpha(0.3);
        Physics.debugDraw.SetLineThickness(1.0);
        Physics.debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        Physics.world.SetDebugDraw(Physics.debugDraw);

    }
    Physics.init = init;

    function isCollisionBetweenTypes(objType1, objType2, contact) {
        var obj1 = contact.GetFixtureA().GetBody().GetUserData();
        var obj2 = contact.GetFixtureB().GetBody().GetUserData();
        if ((obj1 instanceof objType1 || obj1 instanceof objType2) && (obj2 instanceof objType1 || obj2 instanceof objType2)) {
            return true;
        } else {
            return false;
        }
    }
    Physics.isCollisionBetweenTypes = isCollisionBetweenTypes;

    function shotRay(startPiontInMeters, endPiontInMeters) {
        var input = new b2RayCastInput();
        var output = new b2RayCastOutput();
        var intersectionPoint = new b2Vec2();
        var normalEnd = new b2Vec2();
        var intersectionNormal = new b2Vec2();
        endPiontInMeters.Multiply(30);
        endPiontInMeters.Add(startPiontInMeters);
        input.p1 = startPiontInMeters;
        input.p2 = endPiontInMeters;
        input.maxFraction = 1;
        var closestFraction = 1;
        var bodyFound = false;
        var b = new b2BodyDef();
        var f = new b2FixtureDef();
        for (b = Physics.world.GetBodyList(); b; b = b.GetNext()) {
            for (f = b.GetFixtureList(); f; f = f.GetNext()) {
                if (!f.RayCast(output, input))
                    continue;
                else if (output.fraction < closestFraction && output.fraction > 0) {
                    if (output.fraction > 0.001) {
                        closestFraction = output.fraction;
                        intersectionNormal = output.normal;
                        bodyFound = true;
                    }
                }
            }

        }
        intersectionPoint.x = startPiontInMeters.x + closestFraction * (endPiontInMeters.x - startPiontInMeters.x);
        intersectionPoint.y = startPiontInMeters.y + closestFraction * (endPiontInMeters.y - startPiontInMeters.y);
        if (bodyFound) {
            return intersectionPoint;
        }
        return null;
    }
    Physics.shotRay = shotRay;

    function applyToNearByObjects(epicenter, effectedRadius, funcToApplyToEach) {
        var aabb = new b2AABB();
        aabb.lowerBound.Set(epicenter.x - effectedRadius, epicenter.y - effectedRadius);
        aabb.upperBound.Set(epicenter.x + effectedRadius, epicenter.y + effectedRadius);

        Physics.world.QueryAABB(function (fixture) {
            funcToApplyToEach(fixture, epicenter);
            return true;
        }, aabb);
    }
    Physics.applyToNearByObjects = applyToNearByObjects;

    function pixelToMeters(pixels) {
        return pixels / Physics.worldScale;
    }
    Physics.pixelToMeters = pixelToMeters;

    function metersToPixels(meters) {
        return meters * Physics.worldScale;
    }
    Physics.metersToPixels = metersToPixels;

    function vectorPixelToMeters(vPixels) {
        return new b2Vec2(vPixels.x / Physics.worldScale, vPixels.y / Physics.worldScale);
    }
    Physics.vectorPixelToMeters = vectorPixelToMeters;

    function vectorMetersToPixels(vMeters) {
        return new b2Vec2(vMeters.x * Physics.worldScale, vMeters.y * Physics.worldScale);
    }
    Physics.vectorMetersToPixels = vectorMetersToPixels;

    function bodyToDrawingPixelCoordinates(body) {
        var pos = body.GetPosition();
        var radius = body.GetFixtureList().GetShape().GetRadius();
        pos.x -= radius;
        pos.y -= radius;
        return Physics.vectorMetersToPixels(pos);
    }
    Physics.bodyToDrawingPixelCoordinates = bodyToDrawingPixelCoordinates;

})(Physics || (Physics = {}));

var Utilies;
(function (Utilies) {
    function copy(newObject, oldObject) {
        for (var member in oldObject) {
            if (typeof (oldObject[member]) == "object") {
                try {
                    newObject[member] = copy(newObject[member], oldObject[member]);
                }
                catch (e) {
                }
            }
            else {
                try {
                    newObject[member] = oldObject[member];
                }
                catch (e) {
                }
            }
        }
        return newObject;
    }
    Utilies.copy = copy;

    function sign(x) {
        return x > 0 ? 1 : x < 0 ? -1 : 0;
    }
    Utilies.sign = sign;

    function findByValue(needle, haystack, haystackProperity) {
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i][haystackProperity] === needle) {
                return haystack[i];
            }
        }
        throw "Couldn't find object with proerpty " + haystackProperity + " equal to " + needle;
    }
    Utilies.findByValue = findByValue;

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    Utilies.random = random;
    function pickRandom(collection) {
        return collection[random(0, collection.length - 1)];
    }
    Utilies.pickRandom = pickRandom;

    var pickUnqineCollection = [];
    function pickUnqine(collection, stringId) {
        if (pickUnqineCollection[stringId]) {
            var items = pickUnqineCollection[stringId];
            if (items.length <= 0) {
                console.error("Out of unqine items in collection " + stringId);
                return;
            }
            var index = random(0, items.length - 1);
            var unqineItem = items[index];
            deleteFromCollection(items, index);
            return unqineItem;
        }
        else {
            pickUnqineCollection[stringId] = collection;
            return pickUnqine(collection, stringId);
        }
    }
    Utilies.pickUnqine = pickUnqine;

    function deleteFromCollection(collection, indexToRemove) {
        delete collection[indexToRemove];
        collection.splice(indexToRemove, 1);
    }
    Utilies.deleteFromCollection = deleteFromCollection;

    function isBetweenRange(value, rangeMax, rangeMin) {
        return value >= rangeMin && value <= rangeMax;
    }
    Utilies.isBetweenRange = isBetweenRange;

    function angleToVector(angle) {
        return new b2Vec2(Math.cos(angle), Math.sin(angle));
    }
    Utilies.angleToVector = angleToVector;

    function vectorToAngle(vector) {
        return Math.atan2(vector.y, vector.x);
    }
    Utilies.vectorToAngle = vectorToAngle;

    function toRadians(angleInDegrees) {
        return angleInDegrees * (Math.PI / 180);
    }
    Utilies.toRadians = toRadians;

    function toDegrees(angleInRdains) {
        return angleInRdains * (180 / Math.PI);
    }
    Utilies.toDegrees = toDegrees;

    function compress(s) {
        var dict = {};
        var data = (s + "").split("");
        var out = [];
        var currChar;
        var phrase = data[0];
        var code = 256;
        for (var i = 1; i < data.length; i++) {
            currChar = data[i];
            if (dict[phrase + currChar] != null) {
                phrase += currChar;
            }
            else {
                out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
                dict[phrase + currChar] = code;
                code++;
                phrase = currChar;
            }
        }
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
        for (var i = 0; i < out.length; i++) {
            out[i] = String.fromCharCode(out[i]);
        }
        return out.join("");
    }
    Utilies.compress = compress;

    function decompress(s) {
        var dict = {};
        var data = (s + "").split("");
        var currChar = data[0];
        var oldPhrase = currChar;
        var out = [currChar];
        var code = 256;
        var phrase;
        for (var i = 1; i < data.length; i++) {
            var currCode = data[i].charCodeAt(0);
            if (currCode < 256) {
                phrase = data[i];
            }
            else {
                phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
            }
            out.push(phrase);
            currChar = phrase.charAt(0);
            dict[code] = oldPhrase + currChar;
            code++;
            oldPhrase = phrase;
        }
        return out.join("");
    }
    Utilies.decompress = decompress;

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    Utilies.isNumber = isNumber;

})(Utilies || (Utilies = {}));

var keyboard;
(function (keyboard) {
    keyboard.keys = [];
    (function () {
        $(window).keydown(function (e) {
            console.log("keyboard.code: "+e.which);
            keyboard.keys[e.which] = true;
        });
        $(window).keyup(function (e) {
            delete keyboard.keys[e.which];
        });
    })();
    function isKeyDown(keyCode, actLikeKeyPress) {
        if (actLikeKeyPress === void 0) {
            actLikeKeyPress = false;
        }
        for (var key in keyboard.keys) {
            if (key == keyCode) {
                if (actLikeKeyPress) {
                    delete keyboard.keys[key];
                }
                return true;
            }
        }
        return false;
    }
    keyboard.isKeyDown = isKeyDown;

    function getKeyName(keycode) {
        for (var i in keyboard.keyCodes) {
            if (keyboard.keyCodes[i] == keycode) {
                return i;
            }
        }
    }
    keyboard.getKeyName = getKeyName;

    keyboard.keyCodes = {
        'Backspace': 8,
        'Tab': 9,
        'Enter': 13,
        'Shift': 16,
        'Ctrl': 17,
        'Alt': 18,
        'Pause': 19,
        'Capslock': 20,
        'Esc': 27,
        'Pageup': 33,
        'Space': 32,
        'Pagedown': 34,
        'End': 35,
        'Home': 36,
        'Leftarrow': 37,
        'Uparrow': 38,
        'Rightarrow': 39,
        'Downarrow': 40,
        'Insert': 45,
        'Delete': 46,
        '0': 48,
        '1': 49,
        '2': 50,
        '3': 51,
        '4': 52,
        '5': 53,
        '6': 54,
        '7': 55,
        '8': 56,
        '9': 57,
        'a': 65,
        'b': 66,
        'c': 67,
        'd': 68,
        'e': 101,
        'f': 70,
        'g': 71,
        'h': 72,
        'i': 73,
        'j': 74,
        'k': 75,
        'l': 76,
        'm': 77,
        'n': 78,
        'o': 79,
        'p': 80,
        'q': 81,
        'r': 82,
        's': 83,
        't': 84,
        'u': 85,
        'v': 86,
        'w': 87,
        'x': 88,
        'y': 89,
        'z': 90,
        'numpad0': 96,
        'numpad1': 97,
        'numpad2': 98,
        'numpad3': 99,
        'numpad4': 100,
        'numpad6': 102,
        'numpad7': 103,
        'numpad8': 104,
        'numpad9': 105,
        'Multiply': 106,
        'Plus': 107,
        'Minut': 109,
        'Dot': 110,
        'Slash1': 111,
        'F1': 112,
        'F2': 113,
        'F3': 114,
        'F4': 115,
        'F5': 116,
        'F6': 117,
        'F7': 118,
        'F8': 119,
        'F9': 120,
        'F10': 121,
        'F11': 122,
        'F12': 123,
        'equal': 187,
        'Coma': 188,
        'Slash': 191,
        'Backslash': 220
    };
})(keyboard || (keyboard = {}));

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
        Graphics.stats = new Stats();
        Graphics.stats.domElement.style.position = 'absolute';
        Graphics.stats.domElement.style.left = '0px';
        Graphics.stats.domElement.style.top = '0px';
        document.body.appendChild(Graphics.stats.domElement);
        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (/* function */ callback, /* DOMElement */ element) {
                    window.setTimeout(callback, 1000 / 60);
                    return true;
                };
        })();
    }
    Graphics.init = init;

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
        canvas.style.left = "50%";
        canvas.style.marginLeft = "-400px";
        canvas.style.top = "0px";
        canvas.style.border = '1px solid #ff0000';
        canvas.style.backgroundColor = '#eee';
        window.document.body.appendChild(canvas);
        //Disable context menu so I can use right click for game controls
        $('body').on('contextmenu', "#" + name, function (e) {
            return false;
        });
        return canvas;
    }
    Graphics.createCanvas = createCanvas;
})(Graphics || (Graphics = {}));

var AssetManager;
(function(AssetManager){
    var imagesToBeLoaded = [ "assets/images/stick.png" ];
    AssetManager.numAssetsLoaded = 0;
    AssetManager.images = [];

    function isReady() {
        return (AssetManager.numAssetsLoaded) == imagesToBeLoaded.length;
    };
    AssetManager.isReady = isReady;

    function getPerAssetsLoaded() {
        return ((AssetManager.numAssetsLoaded) / (imagesToBeLoaded.length)) * 100;
    };
    AssetManager.getPerAssetsLoaded = getPerAssetsLoaded;

    function getImage(s) {
        return AssetManager.images[s];
    };
    AssetManager.getImage = getImage;

    function loadImages(sources) {
        var images = [];
        var loadedImages = 0;
        var numImages = 0;
        for (var src in sources) {
            numImages++;
        }
        for (var src in sources) {
            var name = sources[src].match("[a-z,A-Z,0-9]+[.]png")[0].replace(".png", "");
            if (images[name] == null) {
                images[name] = new Image();
                images[name].onload = function () {
                    console.log(" Image " + this.src + " loaded sucessfully ");
                    if (++loadedImages >= numImages) {
                        for (var img in images) {
                            AssetManager.images[img] = images[img];
                        }
                        loadDone();
                    }
                    AssetManager.numAssetsLoaded++;
                };
            }
            else {
                console.error("Image " + sources[src] + " has the same name as" + images[name].src);
            }
            images[name].src = sources[src];
        }
    };
    AssetManager.loadImages = loadImages;

    function addSpritesDefToLoadList() {
        imagesToBeLoaded.push("assets/images/sky.png");
        imagesToBeLoaded.push("assets/images/grass.png");
        imagesToBeLoaded.push("assets/images/tank.png");
        imagesToBeLoaded.push("assets/images/tankRight.png");
    };
    AssetManager.addSpritesDefToLoadList = addSpritesDefToLoadList;

    function loadAssets() {
        addSpritesDefToLoadList();
        loadImages(imagesToBeLoaded);
    };
    AssetManager.loadAssets = loadAssets;

})(AssetManager || (AssetManager = {}));

var Sprite = (function () {
    function Sprite(spriteDef, noLoop) {
        noLoop = false;
        this.frameIncremeter = 1;
        this.lastUpdateTime = 0;
        this.accumulateDelta = 0;
        this.isSpriteLocked = false;
        this.setSpriteDef(spriteDef);
        this.noLoop = noLoop;
    }
    Sprite.prototype.update = function () {
        if (this.finished == false) {
            var delta = Date.now() - this.lastUpdateTime;
            if (this.accumulateDelta > this.spriteDef.msPerFrame) {
                this.accumulateDelta = 0;
                this.currentFrameY += this.frameIncremeter;
                if (this.currentFrameY >= this.spriteDef.frameCount) {
                    if (this.noLoop) {
                        this.finished = true;
                        if (this.onFinishFunc != null) {
                            this.onFinishFunc();
                            this.onFinishFunc = null;
                            return;
                        }
                    }
                    this.currentFrameY = this.spriteDef.frameY; //reset to start
                }
            }
            else {
                this.accumulateDelta += delta;
            }
            this.lastUpdateTime = Date.now();
        }
    };
    Sprite.prototype.drawOnCenter = function (ctx, x, y, spriteToCenterOn) {
        if (this.finished == false) {
            ctx.save();
            ctx.translate((spriteToCenterOn.getImage().width - this.getImage().width) / 2, (spriteToCenterOn.getFrameHeight() - this.getFrameHeight()) / 2);
            this.draw(ctx, x, y);
            ctx.restore();
        }
    };
    Sprite.prototype.draw = function (ctx, x, y) {
        var tmpCurrentFrameY = Math.floor(this.currentFrameY);
        if (tmpCurrentFrameY >= 0) {
            ctx.drawImage(this.image, 0, tmpCurrentFrameY * this.frameHeight, this.image.width, this.frameHeight, Math.floor(x), Math.floor(y), this.image.width, this.frameHeight);
        }
    };
    Sprite.prototype.getImage = function () {
        return this.image;
    };
    Sprite.prototype.getCurrentFrame = function () {
        return this.currentFrameY;
    };
    Sprite.prototype.setCurrentFrame = function (frame) {
        if (frame >= 0 && frame < this.spriteDef.frameCount) {
            this.currentFrameY = frame;
        }
    };
    Sprite.prototype.setNoLoop = function (val) {
        this.noLoop = val;
    };
    Sprite.prototype.getFrameHeight = function () {
        return this.frameHeight;
    };
    Sprite.prototype.getFrameWidth = function () {
        return this.image.width;
    };
    Sprite.prototype.getTotalFrames = function () {
        return this.spriteDef.frameCount;
    };
    // Allows for func to be called once this sprite animation has finished
    Sprite.prototype.onAnimationFinish = function (func) {
        if (this.isSpriteLocked == false)
            this.onFinishFunc = func;
    };
    Sprite.prototype.setSpriteDef = function (spriteDef, lockSprite, noLoop) {
        lockSprite = true;
        noLoop = false;
        if (spriteDef != this.spriteDef) {
            if (this.isSpriteLocked == false) {
                this.noLoop = noLoop;
                this.finished = false;
                this.spriteDef = spriteDef;
                this.currentFrameY = spriteDef.frameY;
                this.isSpriteLocked = lockSprite;
                this.image = AssetManager.getImage(spriteDef.imageName);
                this.frameHeight = this.image.height / spriteDef.frameCount;
            }
        }
        if (this.spriteDef == spriteDef) {
            this.isSpriteLocked = lockSprite;
        }
    };
    //Changes sprite sheet but stops the currentframe from resetting
    Sprite.prototype.swapSpriteSheet = function (spriteSheet) {
        var currentFrame = this.getCurrentFrame();
        this.setSpriteDef(spriteSheet);
        this.setCurrentFrame(currentFrame);
        this.finished = true; //So the sprite doesn't animate
    };

    return Sprite;

})();

var Terrain = (function () {
    var _this;
    function Terrain(canvas, terrainImage, world, scale){
        _this = this;
        this.deformTerrainBatchList = [];
        this.world = world;
        this.scale = scale;
        this.Offset = new b2Vec2(800, 512);
        this.drawingCanvas = canvas;

        this.TERRAIN_RECT_HEIGHT = 5;

        this.bufferCanvas = document.createElement('canvas');
        this.bufferCanvas.width = terrainImage.width;
        this.bufferCanvas.height = terrainImage.height;
        this.boundary = new TerrainBoundary(this.bufferCanvas.width, this.bufferCanvas.height);
        this.bufferCanvasContext = this.bufferCanvas.getContext('2d');
        this.bufferCanvasContext.fillStyle = 'rgba(0,0,0,255)'; //Setup alpha colour for cutting out terrain
        this.bufferCanvasContext.drawImage(terrainImage, 0, 0, this.bufferCanvas.width, this.bufferCanvas.height);
        this.terrainData = this.bufferCanvasContext.getImageData(0, 0, this.bufferCanvas.width, this.bufferCanvas.height);
        this.createTerrainPhysics(0, 0, this.bufferCanvas.width, this.bufferCanvas.height, this.terrainData.data, world, scale)
        this.bufferCanvasContext.globalCompositeOperation = "destination-out"; // Used for cut out circles
    }

    Terrain.prototype.getWidth = function(){
        return this.boundary.worldWidth;
    }

    Terrain.prototype.getHeight = function(){
        return this.boundary.worldHeight;
    }

    Terrain.prototype.createTerrainPhysics = function(x, y, width, height, data, world, worldScale){
        x = Math.floor(x);
        y = Math.floor(y);
        width = width * 4; // 4 becase of [r,g,b,a]
        height = height;

        var theAlphaByte = 3;
        var rectWidth = 0;
        var rectheight = this.TERRAIN_RECT_HEIGHT; // Every 5 lines is used instead of every px line
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.0;
        fixDef.shape = new b2PolygonShape;

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;

        var bodiesCreated = 0;
        var makeBlock = function () {
            fixDef.shape.SetAsBox((rectWidth / worldScale) / 2, (rectheight / worldScale) / 2);
            bodyDef.position.x = ((xPos / 4) - (rectWidth / 2)) / worldScale;
            bodyDef.position.y = ((yPos - rectheight) / worldScale);

            //var offset = Physics.vectorPixelToMeters(_this.Offset);
            //bodyDef.position.x += (offset.x/5);
            //bodyDef.position.y += (offset.y/5);

            var b = world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
            b.SetUserData(_this);
        }
        for (var yPos = y; yPos <= height; yPos += rectheight)
        {
            rectWidth = 0;
            for (var xPos = x; xPos <= width; xPos += 4)
            {
                if (data[xPos + (yPos * width) + theAlphaByte] == 255) //if not alpha pixel
                {
                    rectWidth++;
                    if (rectWidth >= this.drawingCanvas.width)
                    {
                        makeBlock();
                        rectWidth = 0; //reset rect
                    }
                } else if (rectWidth > 1)
                {
                    makeBlock();
                    bodiesCreated++;
                    rectWidth = 0; //reset rect
                }
            }
        }
        console.log("Current body count " + bodiesCreated);
    }
    Terrain.prototype.update = function () {

    };
    Terrain.prototype.draw = function (ctx) {
        ctx.drawImage(this.bufferCanvas, 0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
    };
    return Terrain;
})();

var TerrainBoundary = (function () {
    function TerrainBoundary(worldWidth, worldHeight){
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;

        var topPositionY = Physics.pixelToMeters(worldHeight / 5);
        var sidesPositionX =  Physics.pixelToMeters(worldWidth / 5);

        //Bottom
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.0;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(Physics.pixelToMeters(worldWidth)+sidesPositionX*2, 0.1);

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        // bottom
        bodyDef.position.x = -sidesPositionX;
        bodyDef.position.y = Physics.pixelToMeters(worldHeight+40);
        var bottom = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        bottom.SetUserData(this);

        fixDef.shape.SetAsBox(0.1, Physics.pixelToMeters(worldHeight)+topPositionY*2);
        // left
        bodyDef.position.x = Physics.pixelToMeters(0);
        bodyDef.position.y = topPositionY;
        var left = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        left.SetUserData(this);
        // right
        bodyDef.position.x = Physics.pixelToMeters(worldWidth);
        bodyDef.position.y = topPositionY;
        var right = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        right.SetUserData(this);
    }
    return TerrainBoundary;

})();

var Worm = (function () {
    var _this;
    function Worm(x, y) {
        _this = this;
        this.name = "thomas";
        x = Physics.pixelToMeters(x);
        y = Physics.pixelToMeters(y);

        var circleRadius = (AssetManager.getImage("tank").width / 2) / Physics.worldScale;
        var fixDef = new b2FixtureDef;
        fixDef.density = Worm.DENSITY;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.05;
        fixDef.shape = new b2CircleShape(circleRadius);
        fixDef.shape.SetLocalPosition(new b2Vec2(0, (circleRadius) * -1));

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = x;
        bodyDef.position.y = y;

        this.fixture = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef);
        this.body = this.fixture.GetBody();
        this.body.SetFixedRotation(true);
        this.body.SetSleepingAllowed(false);
        this.direction = 1;
        this.speed = 0.6;

        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(circleRadius / 2, circleRadius / 4);
        fixDef.isSensor = true;

        this.footSensor = this.body.CreateFixture(fixDef);
        this.body.SetUserData(this);
        Physics.addToFastAcessList(this.body);

        this.tank = AssetManager.getImage("tank");
        this.tankRight = AssetManager.getImage("tankRight");
    };
    Worm.prototype.walkLeft = function () {
        var currentPos = this.body.GetPosition();
        this.direction = Worm.DIRECTION.left;
        this.body.SetPosition(new b2Vec2(currentPos.x - this.speed / Physics.worldScale, currentPos.y));
    };
    Worm.prototype.walkRight = function () {
        var currentPos = this.body.GetPosition();
        this.direction = Worm.DIRECTION.right;
        this.body.SetPosition(new b2Vec2(currentPos.x + this.speed / Physics.worldScale, currentPos.y));
    };
    Worm.prototype.update = function () {

    };
    Worm.prototype.draw = function (ctx) {
        var tankX = Physics.metersToPixels(this.body.GetPosition().x) - 16;
        var tankY = Physics.metersToPixels(this.body.GetPosition().y) - 20;
        if (this.direction == Worm.DIRECTION.right) {
            ctx.drawImage(this.tankRight, tankX, tankY);
        } else {
            ctx.drawImage(this.tank, tankX, tankY);
        }
        ctx.save();
        ctx.restore();
    };
    Worm.DENSITY = 10.0;
    Worm.DIRECTION = {
        left: -1,
        right: 1
    };
    return Worm;
})(Sprite);

var Player = (function () {
    function Player() {
        this.id = "thomas";
        this.worm = new Worm(50, 200);
        this.gamePad = new GamePad();
    }
    Player.prototype.update = function () {
        this.gamePad.connect();
        this.gamePad.update();
        if (keyboard.isKeyDown(65) ||
            this.gamePad.isButtonPressed(14) ||
            this.gamePad.getAxis(0) > 0.5) {
            //console.log("keyboard.isKeyDown: left");
            this.worm.walkLeft();
        }
        if (keyboard.isKeyDown(68) ||
            this.gamePad.isButtonPressed(15) ||
            this.gamePad.getAxis(0) > 0.5) {
            //console.log("keyboard.isKeyDown: right");
            this.worm.walkRight();
        }
        this.worm.update();
    };
    Player.prototype.draw = function (ctx) {
        this.worm.draw(ctx);
    };
    return Player;
})();





var Game = (function () {
    function Game() {
        Graphics.init();
        this.actionCanvas = Graphics.createCanvas("fortress");
        this.actionCanvasContext = this.actionCanvas.getContext("2d");
        this.setupCanvas();

        Physics.init(this.actionCanvasContext);
        //this.state = new GameStateManager();
        this.player = new Player();
    };
    Game.prototype.setupCanvas = function () {
        this.actionCanvas.width = 800;
        this.actionCanvas.height = 512;
        this.actionCanvasContext.font = 'bold 16px Sans-Serif';
        this.actionCanvasContext.textAlign = 'center';
        this.actionCanvasContext.fillStyle = "#666"; // Water
    };
    Game.prototype.start = function (playerIds) {
        playerIds = null;
        this.sky = AssetManager.getImage("sky");
        this.terrain = new Terrain(this.actionCanvas, AssetManager.getImage("grass"), Physics.world, Physics.worldScale);
        $(document).keydown(function (e) {
            if (e.keyCode == keyboard.keyCodes.Backspace) {
                e.preventDefault();
            }
        });
    };
    Game.prototype.update = function () {
        this.player.update();
        this.terrain.update();
    };
    Game.prototype.step = function () {
        Physics.world.Step((1 / 60), 10, 10);
    };
    Game.prototype.draw = function () {
        this.actionCanvasContext.clearRect(0, 0, this.actionCanvas.width, this.actionCanvas.height);
        this.actionCanvasContext.save();
        this.actionCanvasContext.restore();
        this.actionCanvasContext.drawImage(this.sky, 0, 0);
        this.terrain.draw(this.actionCanvasContext);
        this.player.draw(this.actionCanvasContext);
        //Physics.world.DrawDebugData();
    };
    return Game;

})();
var GameInstance;
function loadDone(){
    console.log("start");
    GameInstance = new Game();
    GameInstance.start();
    function gameloop() {
        Graphics.stats.update();
        GameInstance.step();
        GameInstance.update();
        GameInstance.draw();
        window.requestAnimationFrame(gameloop);
    };
    gameloop();
}
$(document).ready(function () {
    console.log("ready");
    AssetManager.loadAssets();
});
