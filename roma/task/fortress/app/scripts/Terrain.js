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
