var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

var Minigun = (function (_super) {
    __extends(Minigun, _super);
    function Minigun(ammo) {
        _super.call(this, "Minigun", ammo, Sprites.weaponIcons.minigun, Sprites.worms.minigunTakeOut, Sprites.worms.minigunAim);
        //Amount of the terrain to cut out
        this.damageToTerrainRadius = 30; //px
        //Health removed from worm when shot hits
        this.damgeToWorm = 30;
        this.forceScaler = 30;
        this.fireRate = new Timer(300);
    }

    Minigun.prototype.activate = function (worm) {
        _super.activate(worm);
        this.worm.swapSpriteSheet(Sprites.worms.minigunFire);

        //Setup a timer, to stop the weapon firing after so many secounds
        setTimeout(function () {

            //Once finished firing, deactive weapon and singal next turn
            this.setIsActive(false);
            GameInstance.state.tiggerNextTurn();

            this.worm.swapSpriteSheet(this.takeAimAnimations);
        }, 1000);
        AssetManager.getSound("MiniGunFire").play();
    };
    Minigun.prototype.update = function () {
        if (_super.prototype.update.call(this)) {
            this.fireRate.update();
            if (this.fireRate.hasTimePeriodPassed()) {
                var hitPiont = Physics.shotRay(this.worm.body.GetPosition(), this.worm.target.getTargetDirection().Copy());
                if (hitPiont) {
                    Effects.explosion(hitPiont, this.damageToTerrainRadius, 1, this.forceScaler, this.damgeToWorm, this.worm, null);
                }
            }
        }
    };
    return Minigun;
})
(RayWeapon);
