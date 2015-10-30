///<reference path="BaseWeapon.ts"/>
///<reference path="ThrowableWeapon.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

var HandGrenade = (function (_super) {
    __extends(HandGrenade, _super);
    function HandGrenade(ammo) {
        _super.call(this, "Hand Grenade", // Weapon name
            ammo, Sprites.weaponIcons.gernade, //Icon for menu
            Sprites.weapons.gernade, //Inital weapon object state
            Sprites.worms.takeOutGernade, Sprites.worms.aimGernade);
        // The area in pxiels that get cut out of the terrain
        this.explosionRadius = 80;
        // Force/worm damge radius
        this.effectedRadius = Physics.pixelToMeters(200);
        // force scaler
        this.explosiveForce = 80;
        //hit damage at center
        this.maxDamage = 25;
        this.detonationTimer = new Timer(4000);
        //Sound its makes when it collides with somthing
        this.impactSound = "GRENADEIMPACT";
    }

    HandGrenade.prototype.deactivate = function () {
        _super.prototype.deactivate.call(this);
    };
    return HandGrenade;
})(ThrowableWeapon);
