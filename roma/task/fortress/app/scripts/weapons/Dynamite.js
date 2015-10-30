///<reference path="BaseWeapon.ts"/>
///<reference path="ThrowableWeapon.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

var Dynamite = (function (_super) {
    __extends(Dynamite, _super);
    function Dynamite(ammo) {
        //Modify the takeout animation, to be used as its idel animation or aiming animations
        // though you don't aim dynamaie. It just happens to be easy subclass of Throwable
        var modifedSpriteDef = Utilies.copy(new Object(), Sprites.worms.takeOutDynamite);
        modifedSpriteDef.frameY = modifedSpriteDef.frameCount - 1;
        _super.call(this, "Dynamite", // Weapon name
            ammo, Sprites.weaponIcons.dynamite, //Icon for menu
            Sprites.weapons.dynamite, //Inital weapon object state
            Sprites.worms.takeOutDynamite, modifedSpriteDef);
        this.explosionRadius = 100;
        // Force/worm damge radius
        this.effectedRadius = Physics.pixelToMeters(this.explosionRadius * 1.8);
        // force scaler
        this.explosiveForce = 95;
        // No requirement for crosshairs aiming
        this.requiresAiming = false;
    }

    Dynamite.prototype.playWormVoice = function () {
        Utilies.pickRandomSound(["laugh"]).play();
    };
    //Gets the direction of aim from the target and inital velocity
    // The creates the box2d physics body at that pos with that inital v
    Dynamite.prototype.setupDirectionAndForce = function (worm) {
        //super activate calls this so I can play sound here
        var initalPosition = worm.body.GetPosition();
        //initalPosition.Multiply(1.5);
        this.setupPhysicsBodies(initalPosition, new b2Vec2(0, 0));
        // I don't want the dynmatic to roll
        this.body.SetFixedRotation(true);
    };
    Dynamite.prototype.update = function () {
        if (this.getIsActive()) {
            this.sprite.update();
            AssetManager.getSound("fuse").play(1);
            _super.prototype.update.call(this);
        }
    };
    return Dynamite;
})(ThrowableWeapon);
