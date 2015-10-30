var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

var Particle = (function (_super) {
    __extends(Particle, _super);
    function Particle(initalPos, initalVelocity, spriteDef) {
        if (spriteDef === void 0) {
            spriteDef = Sprites.particleEffects.flame1;
        }
        _super.call(this, initalPos, initalVelocity, spriteDef);
        this.setNoLoop(true);
    }

    return Particle;
})(PhysicsSprite);

var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud() {
        var initalPos = new b2Vec2(Utilies.random(0, GameInstance.camera.levelWidth), Utilies.random(GameInstance.terrain.Offset.y - 900, GameInstance.terrain.Offset.y - 220));
        var initalVelocity = new b2Vec2(Utilies.random(3, 7) * 0.4, 0);
        var spriteDef = Utilies.pickRandom([Sprites.particleEffects.cloudl, Sprites.particleEffects.cloudm, Sprites.particleEffects.clouds]);
        _super.call(this, initalPos, initalVelocity, spriteDef);
    }

    Cloud.prototype.physics = function () {}; //just to override the physics from super

    Cloud.prototype.update = function () {
        // Once the sprite animation has reached the end, then change the framIncremter so it goes
        // back down though the sprites again and then back up etc.
        if (this.getCurrentFrame() >= this.getTotalFrames() - 1) {
            this.setCurrentFrame(this.getTotalFrames() - 1);
            this.frameIncremeter *= -1;
        }
        else if (this.getCurrentFrame() <= 0) {
            this.setCurrentFrame(0);
            this.frameIncremeter *= -1;
        }
        _super.prototype.update.call(this);
        this.position.x += this.velocity.x;
        if (this.position.x > GameInstance.camera.levelWidth) {
            this.position.x = 0;
        }
    };
    return Cloud;
})(PhysicsSprite);
