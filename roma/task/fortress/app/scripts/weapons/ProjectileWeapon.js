var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

var ProjectileWeapon = (function (_super) {
    __extends(ProjectileWeapon, _super);
    function ProjectileWeapon(name, ammo, iconSpriteDef, weaponSpriteDef, takeOutAnimation, takeAimAnimation) {
        _super.call(this, name, ammo, iconSpriteDef, takeOutAnimation, takeAimAnimation);
        this.projectileSprite = new Sprite(weaponSpriteDef);
        // Force/worm damge radius
        this.effectedRadius = Physics.pixelToMeters(60);
        // The area in pxiels that get cut out of the terrain
        this.explosionRadius = 70;
        // force scaler
        this.explosiveForce = 60;
        this.maxDamage = 50;
        //Max force this weapon can be thrown with
        this.forceIndicator.setMaxForce(120);
    }

    //Gets the direction of aim from the target and inital velocity
    // The creates the box2d physics body at that pos with that inital v
    ProjectileWeapon.prototype.setupDirectionAndForce = function (worm) {
        var initalVelocity = worm.target.getTargetDirection().Copy();
        initalVelocity.Multiply(1.5);
        var initalPosition = worm.body.GetPosition();
        initalPosition.Add(initalVelocity);
        initalVelocity = worm.target.getTargetDirection().Copy();
        initalVelocity.Multiply(this.forceIndicator.getForce());
        this.setupPhysicsBodies(initalPosition, initalVelocity);
    };
    ProjectileWeapon.prototype.setupPhysicsBodies = function (initalPosition, initalVelocity) {
        // Setup of physical body
        var image = this.projectileSprite.getImage();
        var fixDef = new b2FixtureDef;
        fixDef.density = 50.0;
        fixDef.friction = 3.5;
        fixDef.restitution = 0.6;
        fixDef.shape = new b2CircleShape((image.width / 4) / Physics.worldScale);
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position = initalPosition;
        bodyDef.angle = Utilies.vectorToAngle(initalVelocity);
        this.fixture = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef);
        this.body = this.fixture.GetBody();
        this.body.ApplyImpulse(initalVelocity, this.body.GetPosition());
        if (initalVelocity.x >= 0) {
            //TODO make this even better, by setting the rotation off
            // the inital velocity of the projectile.
            // Looks ok for the mo, other more important things to do atm.
            this.body.SetAngularVelocity(0.7);
        }
        else {
            this.body.SetAngularVelocity(-0.7);
        }
        this.body.SetUserData(this);
        Physics.addToFastAcessList(this.body);
    };
    ProjectileWeapon.prototype.beginContact = function (contact) {
        if (this.isActive && this.isLive) {
            GameInstance.state.tiggerNextTurn();
            var animation = Effects.explosion(this.body.GetPosition(), this.explosionRadius, this.effectedRadius, this.explosiveForce, this.maxDamage, this.worm);
            this.deactivate();
        }
    };
    ProjectileWeapon.prototype.deactivate = function () {
        _super.prototype.deactivate.call(this);
        Logger.debug(this.name + " was deactivated ");
        // Set this object to dead so it can be cleaned up       
        this.isLive = false;
    };
    ProjectileWeapon.prototype.activate = function (worm) {
        //FIXME: Hack some how activate gets called on the opisite team if they used a bazzoka before hand.
        // doesnt happen for any other weapon, very strange. This is a temp fix. Investage later
        if (GameInstance.state.getCurrentPlayer().getTeam().getCurrentWorm() == worm && this.ammo > 0 && this.getIsActive() == false) {
            this.isLive = true;
            _super.prototype.activate.call(this, worm);
            this.setupDirectionAndForce(worm);
        }
    };
    ProjectileWeapon.prototype.update = function () {
        if (!this.isLive && this.isActive) {
            //The bomb has exploded so remove it from the world         
            Physics.removeToFastAcessList(this.body);
            Physics.world.DestroyBody(this.body);
            this.isActive = false;
        }
    };
    ProjectileWeapon.prototype.draw = function (ctx) {
        if (this.isActive && this.isLive) {
            ctx.save();
            ctx.translate(this.body.GetPosition().x * Physics.worldScale, this.body.GetPosition().y * Physics.worldScale);
            ctx.rotate(this.body.GetAngle());
            var radius = this.fixture.GetShape().GetRadius() * 2 * Physics.worldScale;
            this.projectileSprite.draw(ctx, -this.projectileSprite.getFrameWidth() / 2, -this.projectileSprite.getFrameHeight() / 1.5);
            ctx.restore();
        }
    };
    return ProjectileWeapon;
})(BaseWeapon);

var Bazzoka = (function (_super) {
    __extends(Bazzoka, _super);
    function Bazzoka(ammo) {
        _super.call(this, "Bazooka", ammo, Sprites.weaponIcons.bazooka, Sprites.weapons.missle, Sprites.worms.takeOutBazooka, Sprites.worms.aimBazooka);
    }

    return Bazzoka;
})(ProjectileWeapon);
