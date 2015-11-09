var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };


var Worm = (function (_super) {

    __extends(Worm, _super);

  var that;

    function Worm(team, x, y) {
      that = this;
        _super.call(this, Sprites.worms.idle1);
        this.name = NameGenerator.randomName();

        this.health = 80;
        this.damageTake = 0;
        this.team = team;

        x = Physics.pixelToMeters(x);
        y = Physics.pixelToMeters(y);

        var circleRadius = (AssetManager.getImage(this.spriteDef.imageName).width / 2) / Physics.worldScale;
        var fixDef = new b2FixtureDef;
        fixDef.density = Worm.DENSITY;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.1;
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
        this.speed = 1.2;

        // Setup foot sensor
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(circleRadius / 2, circleRadius / 4);
        fixDef.isSensor = true;

        this.footSensor = this.body.CreateFixture(fixDef);
        this.body.SetUserData(this);
        this.stateAnimationMgmt = new WormAnimationManager(this);
        this.canJump = 0;
        this.target = new Target(this);
        this.isDead = false;
        this.soundDelayTimer = new Timer(200);
        this.preRendering();
        this.fallHeight = this.body.GetPosition().y;

        Physics.addToFastAcessList(this.body);
    };

    Worm.prototype.getFortressNetData = function () {
        return {"x": this.body.GetPosition().x, "y": this.body.GetPosition().y, "arrow": this.arrow};
    };

    Worm.prototype.setWormNetData = function (packetStream) {
        console.log(" old pos " + this.body.m_xf.position.x + " new pos " + packetStream.x);
        this.body.SetPosition(new b2Vec2(packetStream.x, packetStream.y));
    };

    // Pre-renders the boxes above their heads with name and health
    Worm.prototype.preRendering = function () {
        var nameBoxWidth = this.name.length * 10;
        var healthBoxWidth = 39;
        var healthBoxHeight = 18;
        this.nameBox = Graphics.preRenderer.render(function (ctx) {

            ctx.fillStyle = '#1A1110';
            ctx.strokeStyle = "#eee";
            ctx.font = 'bold 16.5px Sans-Serif';
            ctx.textAlign = 'center';

            Graphics.roundRect(ctx, 0, 0, nameBoxWidth, 20, 4).fill();
            Graphics.roundRect(ctx, 0, 0, nameBoxWidth, 20, 4).stroke();
            ctx.fillStyle = '#ff00ff'; //this.team.color;
            ctx.fillText(that.name, (that.name.length * 10) / 2, 15);

        }, nameBoxWidth, 20);

        this.healthBox = Graphics.preRenderer.render(function (ctx) {

            ctx.fillStyle = '#1A1110';
            ctx.strokeStyle = "#eee";
            ctx.font = 'bold 16.5px Sans-Serif';
            ctx.textAlign = 'center';

            Graphics.roundRect(ctx, 0, 0, healthBoxWidth, healthBoxHeight, 4).fill();
            Graphics.roundRect(ctx, 0, 0, healthBoxWidth, healthBoxHeight, 4).stroke();

            ctx.fillStyle = '#ff0000'; //this.team.color;
            ctx.fillText(Math.floor(that.health), healthBoxWidth / 2, healthBoxHeight - 3);

        }, 39, 20);
    };

    Worm.prototype.getHealth = function () {
        return this.health;
    };

    Worm.prototype.setHealth = function (health) {
        if (health > 0) {
            this.health = health;
        }
        else {
            this.health = 0;
        }
        //Update worm heading with the health
        this.preRendering();
    };

    Worm.prototype.getWeapon = function () {
        return this.team.getWeaponManager().getCurrentWeapon();
    };

    // What happens when a worm collies with another object
    Worm.prototype.beginContact = function (contact) {
        if (Physics.isCollisionBetweenTypes(Terrain, Worm, contact)) {
            if (this.footSensor == contact.GetFixtureA() || this.footSensor == contact.GetFixtureB()) {
                this.canJump++;
                //If backflip animation playing then disable it
                //when the worm colides with somthing.
                if (this.spriteDef == Sprites.worms.wbackflp) {
                    this.setSpriteDef(Sprites.worms.wbackflp, false);
                    this.setSpriteDef(Sprites.worms.idle1, false);
                }
            }
        }
    };

    //What happens when a worm is no longer in contact with the object it was in contact with
    Worm.prototype.endContact = function (contact) {
        if (Physics.isCollisionBetweenTypes(Terrain, Worm, contact)) {
            if (this.footSensor == contact.GetFixtureA() || this.footSensor == contact.GetFixtureB()) {
                this.canJump--;
            }
        }
    };

    Worm.prototype.postSolve = function (contact, impulse) {
        if (contact.GetFixtureA() instanceof BaseWeapon == false && contact.GetFixtureB() instanceof BaseWeapon == false) {
            var impactTheroshold = 8 * Worm.DENSITY;
            // If the worm is using the Jetpack don't take damage
            if ((this.getWeapon() instanceof JetPack) && this.getWeapon().getIsActive()) {
                impactTheroshold += 2 * Worm.DENSITY;
            }
            //If the worm is using the NijaRope don't take damage
            if ((this.getWeapon() instanceof NinjaRope) == false || this.getWeapon().getIsActive() == false) {
                if (impulse.normalImpulses[0] > impactTheroshold) {
                    var damage = Math.round(impulse.normalImpulses[0]) / Worm.DENSITY;
                    Logger.log(damage);
                    if (damage > 10) {
                        damage = 10;
                    }
                    this.hit(damage);
                }
                if (impulse.normalImpulses[0] > 25) {
                    //AssetManager.getSound("WormLanding").play();
                }
            }
        }
    };

    Worm.prototype.isStationary = function () {
        var isStationary = this.body.GetLinearVelocity().Length() == 0 // Completely stopped
            ||
            Utilies.isBetweenRange(this.body.GetLinearVelocity().y, 0.001, -0.001) && Utilies.isBetweenRange(this.body.GetLinearVelocity().x, 0.001, -0.001); // near enough stopped
        return isStationary;
    };

    Worm.prototype.fire = function () {
        if (GameInstance.state.hasNextTurnBeenTiggered() == false) {
            var weapon = this.team.getWeaponManager().getCurrentWeapon();
            weapon.activate(this);
            //Once the player fires removed bouncing arrow
            if (this.arrow) {
                this.arrow.finished = true;
            }
            weapon.getForceIndicator().reset();
        }
    };

    Worm.prototype.playWalkingSound = function () {
        if (this.soundDelayTimer.hasTimePeriodPassed()) {
            if (this.spriteDef == Sprites.worms.walking) {
                if (_super.prototype.getCurrentFrame.call(this) % 5 == 0) {
                    //AssetManager.getSound("WalkCompress").play(0.5);
                }
                else {
                    //AssetManager.getSound("WalkExpand").play(0.5);
                }
            }
        }
    };

    Worm.prototype.walkLeft = function () {
        if (WormAnimationManager.playerAttentionSemaphore == 0) {
            var currentPos = this.body.GetPosition();
            this.direction = Worm.DIRECTION.left;
            this.target.changeDirection(Worm.DIRECTION.left);
            this.stateAnimationMgmt.setState(WormAnimationManager.WORM_STATE.walking);
            _super.prototype.update.call(this);
            this.body.SetPosition(new b2Vec2(currentPos.x - this.speed / Physics.worldScale, currentPos.y));
            this.playWalkingSound();
        }
        //Once the player moves removed bouncing arrow
        if (this.arrow) {
            this.arrow.finished = true;
        }
    };

    Worm.prototype.walkRight = function () {
        if (WormAnimationManager.playerAttentionSemaphore == 0) {
            var currentPos = this.body.GetPosition();
            this.direction = Worm.DIRECTION.right;
            this.target.changeDirection(Worm.DIRECTION.right);
            this.stateAnimationMgmt.setState(WormAnimationManager.WORM_STATE.walking);
            _super.prototype.update.call(this);
            this.body.SetPosition(new b2Vec2(currentPos.x + this.speed / Physics.worldScale, currentPos.y));
            this.playWalkingSound();
            //Once the player moves removed bouncing arrow
            if (this.arrow) {
                this.arrow.finished = true;
            }
        }
    };

    Worm.prototype.jump = function () {
        if (WormAnimationManager.playerAttentionSemaphore == 0) {
            if (this.canJump > 0) {
                var currentPos = this.body.GetPosition();
                var forces = new b2Vec2(this.direction, -2);
                forces.Multiply(1.5 * Worm.DENSITY);
                this.body.ApplyImpulse(forces, this.body.GetPosition());
            }
            //Once the player moves removed bouncing arrow
            if (this.arrow) {
                this.arrow.finished = true;
            }
        }
    };

    Worm.prototype.backFlip = function () {
        if (WormAnimationManager.playerAttentionSemaphore == 0) {
            if (this.canJump > 0) {
                // Setup a callback that once the animation finish
                // unlock it and set it to idel
                this.onAnimationFinish(function () {
                    this.setSpriteDef(Sprites.worms.wbackflp, false);
                    this.setSpriteDef(Sprites.worms.idle1, false);
                });
                //Set backflip sprite and lock the sprite
                this.setSpriteDef(Sprites.worms.wbackflp, true, true);
                var currentPos = this.body.GetPosition();
                var forces = new b2Vec2(this.direction * -1, -2);
                forces.Multiply(2.3 * Worm.DENSITY);
                this.body.ApplyImpulse(forces, this.body.GetPosition());
            }
            //Once the player moves removed bouncing arrow
            if (this.arrow) {
                this.arrow.finished = true;
            }
        }
    };

    Worm.prototype.hit = function (damage, worm, overrideClientOnlyUse) {
        //For Networked games.
        if (worm === void 0) {
            worm = null;
        }
        if (overrideClientOnlyUse === void 0) {
            overrideClientOnlyUse = false;
        }
        {
            if (this.isDead == false) {
                if (overrideClientOnlyUse || Client.isClientsTurn()) {
                    console.log("CLIENT HIT");
                    this.damageTake += damage;
                    GameInstance.wormManager.syncHit(this.name, damage);
                    //AssetManager.getSound("ow" + Utilies.random(1, 2)).play(0.8);
                }
                //If worm using Jetpack, deactive it if they get hurt.
                if (this.getWeapon() instanceof JetPack) {
                    this.getWeapon().deactivate();
                }
                //if from same team call the player a tratitor :)
                if (worm && worm != this && worm.team == this.team) {
                    //AssetManager.getSound("traitor").play(0.8, 10);
                }
                else if (worm) {
                    //Utilies.pickRandomSound(["justyouwait", "youllregretthat"]).play(0.8, 10);
                }
            }
        }
    };

    //Sets the current worm to active by placing a bouncing arrow
    // over their head and panning the camera toward him.
    Worm.prototype.activeWorm = function () {
        //This makes no sence, but it works.
        if (GameInstance.gameType == Game.types.LOCAL_GAME || !Client.isClientsTurn())
        {
            var pos = Physics.vectorMetersToPixels(this.body.GetPosition());
            this.arrow = new BounceArrow(pos);
            GameInstance.miscellaneousEffects.add(this.arrow);
        }
    };

    //Is this the current worm of the current player
    Worm.prototype.isActiveWorm = function () {
        return this.team.getCurrentWorm() == this && GameInstance.state.getCurrentPlayer().getTeam() == this.team;
    };

    Worm.prototype.update = function () {
        if (this.isDead == false) {
            this.soundDelayTimer.update();
            //Manages the different states of the animation
            this.stateAnimationMgmt.update();
            //updates the current sprite
            _super.prototype.update.call(this);
            // Always reset to idle
            this.stateAnimationMgmt.setState(WormAnimationManager.WORM_STATE.idle);
            if (this.isActiveWorm())
                this.team.getWeaponManager().getCurrentWeapon().update();
            this.target.update();
        }
        else {
            //Quick hack to get the sprite to unlock
            // Seems the die squence locks the sprite
            if (Sprites.worms.die == this.spriteDef) {
                this.setSpriteDef(Sprites.worms.die, false);
                this.setSpriteDef(Sprites.particleEffects[this.team.graveStone], true);
            }
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
        }
    };

    Worm.prototype.draw = function (ctx) {
        this.team.getWeaponManager().getCurrentWeapon().draw(ctx);
        if (Sprites.worms.weWon != this.spriteDef && this.isActiveWorm()) {
            if (this.isDead == false && Client.isClientsTurn()) {
                this.target.draw(ctx);
            }
        }
        ctx.save();
        var radius = this.fixture.GetShape().GetRadius() * Physics.worldScale;
        ctx.translate(Physics.metersToPixels(this.body.GetPosition().x), Physics.metersToPixels(this.body.GetPosition().y));
        ctx.save();
        if (this.direction == Worm.DIRECTION.right) {
            // Used to flip the sprites
            ctx.scale(-1, 1);
        }
        _super.prototype.draw.call(this, ctx, -this.getFrameWidth() / 2, -this.getFrameHeight() / 1.5);
        ctx.restore();
        if (this.isDead == false) {
            var nameBoxX = -radius * this.name.length / 2.6;
            var nameBoxY = -radius * 6;
            ctx.drawImage(this.nameBox, nameBoxX, nameBoxY);
            ctx.drawImage(this.healthBox, -radius * 1.5, -radius * 4);
        }
        ctx.restore();
        if (this.isActiveWorm()) {
            this.getWeapon().getForceIndicator().draw(ctx, this);
        }
    };

    Worm.DENSITY = 10.0;

    Worm.DIRECTION = {
        left: -1,
        right: 1
    };

    return Worm;

})(Sprite);
