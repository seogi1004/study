var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

var ThrowableWeapon = (function (_super) {
    __extends(ThrowableWeapon, _super);
    function ThrowableWeapon(name, ammo, iconSpriteDef, weaponSpriteDef, takeOutAnimation, takeAimAnimation) {
        _super.call(this, name, ammo, iconSpriteDef, takeOutAnimation, takeAimAnimation);
        //Max force this weapon can be thrown with
        this.forceIndicator.setMaxForce(40);
        this.sprite = new Sprite(weaponSpriteDef);
        // The area in pxiels that get cut out of the terrain
        this.explosionRadius = 40;
        // Force/worm damge radius
        this.effectedRadius = Physics.pixelToMeters(50);
        // force scaler
        this.explosiveForce = 50;
        //hit damage at center
        this.maxDamage = 30;
        // Counter till bomb explodes
        this.detonationTimer = new Timer(5000);
        //To stop the large amount of edges in the
        // terrain of causing the bound sound been played to many times
        this.hasImpacted = 0;
        //Sound its makes when it collides with somthing
        this.impactSound = "GRENADEIMPACT";
    }

    // pre-render box around countdown number
    ThrowableWeapon.preRender = function () {
        var timerBoxWidth = 20;
        var timerBoxHeight = 22
        return Graphics.preRenderer.render(function (ctx) {

            ctx.fillStyle = '#1A1110';
            ctx.strokeStyle = "#eee";

            Graphics.roundRect(ctx, 0, 0, timerBoxWidth, timerBoxHeight, 4).fill();
            Graphics.roundRect(ctx, 0, 0, timerBoxWidth, timerBoxHeight, 4).stroke();


        }, timerBoxWidth + 3, timerBoxHeight + 3);
    };
    // What happens when a worm collies with another object
    ThrowableWeapon.prototype.beginContact = function (contact) {
        if (this.hasImpacted == 0) {
            //AssetManager.getSound(this.impactSound).play(0.6);
        }
        this.hasImpacted++;
    };
    //What happens when a worm is no longer in contact with the object it was in contact with
    ThrowableWeapon.prototype.endContact = function (contact) {
        this.hasImpacted--;
    };
    ThrowableWeapon.prototype.deactivate = function () {
        Logger.debug(this.name + " was deactivated ");
        this.setIsActive(false);
        _super.prototype.deactivate.call(this);
    };
    ThrowableWeapon.prototype.setupPhysicsBodies = function (initalPosition, initalVelocity) {
        // Setup of physical body
        var image = this.sprite.getImage();
        var fixDef = new b2FixtureDef;
        fixDef.density = ThrowableWeapon.DENSITY;
        fixDef.friction = 3.5;
        fixDef.restitution = 0.6;
        fixDef.shape = new b2CircleShape((image.width / 4) / Physics.worldScale);
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position = initalPosition;
        if ((this instanceof Dynamite) == false) {
            bodyDef.angle = Utilies.vectorToAngle(initalVelocity);
        }
        this.fixture = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef);
        this.body = this.fixture.GetBody();
        this.body.SetLinearVelocity(initalVelocity);
        if ((this instanceof Dynamite) == false) {
            //Visual hack, as box2d doesn't have air resistence
            //objects won't rotate in the air, so add some AngularVelcoity.
            if (initalVelocity.x >= 0) {
                this.body.SetAngularVelocity(0.7);
            }
            else {
                this.body.SetAngularVelocity(-0.7);
            }
        }
        this.body.SetUserData(this);
        Physics.addToFastAcessList(this.body);
    };
    //Gets the direction of aim from the target and inital velocity
    // The creates the box2d physics body at that pos with that inital v
    ThrowableWeapon.prototype.setupDirectionAndForce = function (worm) {
        var initalVelocity = worm.target.getTargetDirection().Copy();
        //if(this.worm.direction
        initalVelocity.Multiply(1.5);
        var initalPosition = worm.body.GetPosition();
        initalPosition.Add(initalVelocity);
        initalVelocity = worm.target.getTargetDirection().Copy();
        initalVelocity.Multiply(this.forceIndicator.getForce());
        this.setupPhysicsBodies(initalPosition, initalVelocity);
    };
    //This method is overloaded in sub-classes
    ThrowableWeapon.prototype.playWormVoice = function () {
        //Utilies.pickRandomSound(["watchthis", "fire", "grenade", "incoming", "laugh"]).play();
    };
    ThrowableWeapon.prototype.activate = function (worm) {
        if (this.ammo > 0 && this.getIsActive() == false) {
            this.detonationTimer.reset();
            this.playWormVoice();
            _super.prototype.activate.call(this, worm);
            this.setupDirectionAndForce(worm);
        }
        else {
            //AssetManager.getSound("cantclickhere").play();
        }
    };
    ThrowableWeapon.prototype.detonate = function () {
        GameInstance.state.tiggerNextTurn();
        var animation = Effects.explosion(this.body.GetPosition(), this.explosionRadius, this.effectedRadius, this.explosiveForce, this.maxDamage, this.worm);
        Physics.removeToFastAcessList(this.body);
        Physics.world.DestroyBody(this.body);
        this.deactivate();
        this.worm.team.weaponManager.getListOfWeapons()[6].deactivate();
    };
    ThrowableWeapon.prototype.update = function () {
        if (this.getIsActive()) {
            //Checks if its time for the bomb to explode
            if (this.detonationTimer.hasTimePeriodPassed()) {
                this.detonate();
            }
            this.detonationTimer.update();
        }
    };
    ThrowableWeapon.prototype.draw = function (ctx) {
        if (this.getIsActive()) {
            ctx.save();
            var wormPosInPixels = Physics.vectorMetersToPixels(this.body.GetPosition());
            ctx.translate(wormPosInPixels.x, wormPosInPixels.y);
            ctx.save();
            ctx.rotate(this.body.GetAngle());
            var radius = this.fixture.GetShape().GetRadius() * 2 * Physics.worldScale;
            this.sprite.draw(ctx, -radius, -radius);
            ctx.restore();
            ctx.drawImage(ThrowableWeapon.numberBox, 10, -40);
            ctx.fillStyle = 'rgba(255,0,0,255)';
            var secoundsLeft = Math.floor(this.detonationTimer.getTimeLeftInSec() / 10);
            if (secoundsLeft < 0) {
                secoundsLeft = 0;
            }
            ctx.fillText(secoundsLeft, 22, -22);
            ctx.restore();
        }
    };
    ThrowableWeapon.DENSITY = 50;
    ThrowableWeapon.numberBox = ThrowableWeapon.preRender();
    return ThrowableWeapon;
})(BaseWeapon);
