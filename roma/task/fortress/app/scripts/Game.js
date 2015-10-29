var Game = (function(){

    function Game(){
        this.map = new Map(Maps.castle);
        Graphics.init();
        this.canvas = Graphics.createCanvas("fortress");
        this.canvasContext = this.canvas.getContext("2d");
        this.canvasWidth = 800;
        this.canvasHeight = 512;
        this.setupCanvas();
        Physics.init(this.canvas);

        this.state = new GameStateManager();
        this.players = [];
    }

    Game.prototype.setupCanvas = function(){
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvasContext.font = 'bold 16px Sans-Serif';
        this.canvasContext.textAlign = 'center';
        this.canvasContext.fillStyle = "#384084"; // Water
    }

    Game.prototype.start = function(){
        this.terrain = new Terrain(this.canvas, this.map.getTerrainImg(), Physics.world, Physics.worldScale);

        for (var i = 0; i < 2; i++) {
            this.players.push(new Player());
        }
    }

    Game.prototype.nextTurn = function(){

    }

    Game.prototype.update = function(){

    }

    Game.prototype.draw = function(){

    }

    Game.prototype.step = function(){
        Physics.world.Step(1/60, 10, 10);
        //Physics.world.DrawDebugData();
        //Physics.world.ClearForces();
    }

    return Game;

})();