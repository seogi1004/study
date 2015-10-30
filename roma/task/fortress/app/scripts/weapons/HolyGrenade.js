///<reference path="BaseWeapon.ts"/>
///<reference path="ThrowableWeapon.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

var HolyGrenade = (function (_super) {
    __extends(HolyGrenade, _super);
    function HolyGrenade(ammo) {
        _super.call(this, "Holy Grenade", // Weapon name
            ammo, Sprites.weaponIcons.holyGernade, //Icon for menu
            Sprites.weapons.holyGernade, //Inital weapon object state
            Sprites.worms.takeOutHolyGernade, Sprites.worms.aimHolyGernade);
        // The area in pxiels that get cut out of the terrain
        this.explosionRadius = 145;
        // Force/worm damge radius
        this.effectedRadius = Physics.pixelToMeters(360);
        // force scaler
        this.explosiveForce = 120;
        //hit damage at center
        this.maxDamage = 50;
        this.detonationTimer = new Timer(6000);
        //Sound its makes when it collides with somthing
        this.impactSound = "HOLYGRENADEIMPACT";
    }

    HolyGrenade.prototype.update = function () {
        if (this.getIsActive() && this.detonationTimer.getTimeLeftInSec() / 10 <= 2) {
            AssetManager.getSound("holygrenade").play();
        }
        _super.prototype.update.call(this);
    };
    return HolyGrenade;
})(ThrowableWeapon);
