var Terrain = (function () {
    function Terrain(canvas, terrainImage, world, scale){

        this.deformTerrainBatchList = [];

        this.world = world;
        this.scale = scale;

        this.Offset = new b2Vec2(2300, 1300);

        this.drawingCanvas = canvas;

        this.TERRAIN_RECT_HEIGHT = 5;

        this.bufferCanvas = document.createElement("canvas");
        this.bufferCanvas.width = this.Offset.x + (terrainImage.width * 1.5);
        this.bufferCanvas.height = this.Offset.y + (terrainImage.height * 1.5);
        this.boundary = new TerrainBoundary(this.bufferCanvas.width + this.Offset.x, this.bufferCanvas.height + 100);
        this.bufferCanvasContext = this.bufferCanvas.getContext('2d');
        this.bufferCanvasContext.fillStyle = 'rgba(0,0,0,255)'; //Setup alpha colour for cutting out terrain
        this.bufferCanvasContext.drawImage(
            terrainImage,
            this.Offset.x,
            this.Offset.y,
            this.bufferCanvas.width - this.Offset.x,
            this.bufferCanvas.height - this.Offset.y
        );

        this.terrainData = this.bufferCanvasContext.getImageData(
            this.Offset.x,
            this.Offset.y,
            this.bufferCanvas.width - this.Offset.x,
            this.bufferCanvas.clientHeight - this.Offset.y
        );
        this.createTerrainPhysics(
            0,
            0,
            this.bufferCanvas.width - this.Offset.x,
            this.bufferCanvas.height - this.Offset.y,
            this.terrainData.data,
            world,
            scale
        );
        this.bufferCanvasContext.globalCompositeOperation = "destination-out";

        this.wave = new Waves();
    }

    Terrain.prototype.getWidth = function(){
        return this.boundary.worldWidth;
    }

    Terrain.prototype.getHeight = function(){
        return this.boundary.worldHeight;
    }

    Terrain.prototype.createTerrainPhysics = function(x, y, width, height, data, world, worldScale){
        this.x = Math.floor(x);
        this.y = Math.floor(y);

        this.width = width * 4;
        this.height = height;

        var theAlphaByte = 3;
        var rectWidth = 0;
        var rectHeight = this.TERRAIN_RECT_HEIGHT;
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.0;
        fixDef.shape = new b2PolygonShape;

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;

        var bodiesCreated = 0;
        var makeBlock = function(){
            fixDef.shape.SetAsBox((rectWidth / worldScale) / 2, (rectHeight / worldScale) / 2);
            bodyDef.position.x = ((xPos / 4) - (rectWidth / 2)) / worldScale;
            bodyDef.position.y = ((yPos - rectHeight)/ worldScale);

            var offset = Physics.vectorPixelToMeters(this.Offset);
            bodyDef.position.x += offset.x;
            bodyDef.position.y += offset.y;

            var b = world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
            b.SetUserData(this);
        }

        for (var yPos = y; yPos <= height; yPos += rectHeight)
        {
            rectWidth = 0;
            for (var xPos = x; xPos <= width; xPos += 4) {
                if (data[xPos + (yPos * width) + theAlphaByte] == 255) {
                    rectWidth++;
                    if (rectWidth >= this.drawingCanvas.width) {
                        makeBlock();
                        rectWidth = 0; //reset rect
                    }
                } else if (rectWidth > 1) {
                    makeBlock();
                    bodiesCreated++;
                    rectWidth = 0; //reset rect
                }
            }
        }
        console.log("Current body count " + bodiesCreated);
    }
    //Adds this deform position to the list so that the deforms
    //can be batched at the end of the update loop
    Terrain.prototype.addToDeformBatch = function (x, y, r) {
        this.deformTerrainBatchList.push({ xPos: x, yPos: y, radius: r });
    };
    Terrain.prototype.addRectToDeformBatch = function (x, y, w, h) {
        this.deformTerrainBatchList.push({ xPos: x, yPos: y, radius: h, width: w });
    };
    // This allows the terrain image data to be changed.
    // It then calls for the box2d physic terrain to be reconstructed from the new image
    Terrain.prototype.deformRegionBatch = function () {
        var lenghtCache = this.deformTerrainBatchList.length;
        var angle = Math.PI * 2;
        this.bufferCanvasContext.beginPath();
        // Draw cut outs of all batched deformations
        for (var i = 0; i < lenghtCache; i++) {
            var tmp = this.deformTerrainBatchList[i];
            if (tmp.width) {
                this.bufferCanvasContext.fillRect(tmp.xPos - tmp.width / 2, tmp.yPos, tmp.width, tmp.radius);
            }
            else {
                this.bufferCanvasContext.arc(tmp.xPos, tmp.yPos, tmp.radius, angle, 0, true);
            }
        }
        this.bufferCanvasContext.closePath();
        this.bufferCanvasContext.fill();
        this.terrainData = this.bufferCanvasContext.getImageData(this.Offset.x, this.Offset.y, this.bufferCanvas.width, this.bufferCanvas.height);
        // for each explision in batch find what rects its radius interects and destory them.
        // Then scan image from top of explosion radius down to bottom and fill back in the rects
        for (var i = 0; i < lenghtCache; i++) {
            var tmp = this.deformTerrainBatchList[i];
            var normalizedRadis = Math.floor(tmp.radius / this.TERRAIN_RECT_HEIGHT) * this.TERRAIN_RECT_HEIGHT;
            var y = Math.floor(tmp.yPos / this.TERRAIN_RECT_HEIGHT) * this.TERRAIN_RECT_HEIGHT;
            //Setup bounding box, to check which terrain rects intercest the box and need to be removed and recreated.
            var aabb = new b2AABB();
            aabb.lowerBound.Set(0, Physics.pixelToMeters(y - normalizedRadis));
            aabb.upperBound.Set(Physics.pixelToMeters(this.bufferCanvas.width), Physics.pixelToMeters(y + normalizedRadis));
            Physics.world.QueryAABB(function (fixture){
                if (fixture.GetBody().GetType() == b2Body.b2_staticBody && fixture.GetBody().GetUserData() instanceof Terrain)
                {
                    this.world.DestroyBody(fixture.GetBody());
                }
                return true;
            }, aabb);
            this.createTerrainPhysics(0, //x
                Physics.metersToPixels(aabb.lowerBound.y) - this.Offset.y, //y
                this.bufferCanvas.width, //w
                Physics.metersToPixels(aabb.upperBound.y) + (this.TERRAIN_RECT_HEIGHT * 2) - this.Offset.y, //h
                this.terrainData.data, this.world, this.scale);
        }
        this.deformTerrainBatchList = [];
    };
    Terrain.prototype.update = function () {
        if (this.deformTerrainBatchList.length > 0) {
            this.deformRegionBatch();
        }
        this.wave.update();
    };
    Terrain.prototype.draw = function (ctx) {
        //this.drawingCanvasContext.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
        // Here we draw an off screen buffer canvas onto our on screen one
        // this is more effeicent then drawing a pixel buffer onto the canvas
        var y = GameInstance.camera.getY();
        var x = GameInstance.camera.getX();
        var w = this.drawingCanvas.width;
        var h = this.drawingCanvas.height;
        if (y + this.drawingCanvas.height > this.bufferCanvas.height) {
            var diff = (y + this.drawingCanvas.height) - this.bufferCanvas.height;
            h -= diff;
        }
        if (x + this.drawingCanvas.width > this.bufferCanvas.width) {
            var diff = (x + this.drawingCanvas.width) - this.bufferCanvas.width;
            w -= diff;
        }
        //ctx.drawImage(this.bufferCanvas, -300, -300, this.drawingCanvas.width, this.drawingCanvas.height);
        ctx.drawImage(this.bufferCanvas, x, y, w, h, 0, -5, w, h);
        // this.drawingCanvasContext.drawImage(this.bufferCanvas, 2, -6)
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
        fixDef.shape.SetAsBox( Physics.pixelToMeters(worldWidth)+sidesPositionX*2, 0.5);

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = -sidesPositionX;
        bodyDef.position.y = Physics.pixelToMeters(worldHeight);

        var bottom = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        bottom.SetUserData(this);

        // Top
        bodyDef.position.x = -sidesPositionX;
        bodyDef.position.y = -topPositionY;
        fixDef.shape.SetAsBox( Physics.pixelToMeters(worldWidth)+sidesPositionX*2, 0.5);

        var body = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
        body.SetUserData(null);

        // left
        bodyDef.position.x = -sidesPositionX;
        bodyDef.position.y = -topPositionY;
        fixDef.shape.SetAsBox( 0.5,  Physics.pixelToMeters(worldHeight)+topPositionY);
        body = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();

        // right
        bodyDef.position.x = Physics.pixelToMeters(worldWidth)+sidesPositionX;
        bodyDef.position.y = -topPositionY;
        fixDef.shape.SetAsBox( 0.5,  Physics.pixelToMeters(worldHeight)+topPositionY);
        body = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
    }

    return TerrainBoundary;

})();
