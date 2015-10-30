var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

var RayWeapon = (function (_super) {
    __extends(RayWeapon, _super);
    function RayWeapon(name, ammo, iconSpriteDef, takeOutAnimation, takeAimAnimation) {
        _super.call(this, name, ammo, iconSpriteDef, takeOutAnimation, takeAimAnimation);
        //Amount of the terrain to cut out
        this.damageToTerrainRadius = 30; //px
        //Health removed from worm when shot hits
        this.damgeToWorm = 10;
    }

    RayWeapon.prototype.update = function () {
        _super.prototype.update.call(this);
        return (this.ammo != 0) && this.getIsActive();
    };
    return RayWeapon;
})(BaseWeapon);
