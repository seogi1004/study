var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
var Drill = (function (_super) {
    __extends(Drill, _super);
    function Drill(ammo, name, icon, takeOutAnimation, actionAnimation) {
        if (name === void 0) {
            name = "Drill";
        }
        if (icon === void 0) {
            icon = Sprites.weaponIcons.drill;
        }
        if (takeOutAnimation === void 0) {
            takeOutAnimation = Sprites.worms.takeOutDrill;
        }
        if (actionAnimation === void 0) {
            actionAnimation = Sprites.worms.drilling;
        }
        _super.call(this, "Drill", // Weapon name
            ammo, // ammo
            icon, //Icon for menu
            takeOutAnimation, //animation fro worm taking out drill
            actionAnimation //animation fro worm taking out drill
        );
        this.timeBetweenExploisionsTimer = new Timer(450);
        this.useDurationTimer = new Timer(5200);
        // No requirement for crosshairs aiming
        this.requiresAiming = false;
    }

    Drill.prototype.activate = function (worm) {
        if (this.ammo > 0) {
            _super.prototype.activate.call(this, worm);
            this.useDurationTimer.reset();
            this.timeBetweenExploisionsTimer.reset();
            this.worm.setSpriteDef(this.takeAimAnimations, true, false);
            return true;
        }
        else {
            return false;
        }
    };
    Drill.prototype.deactivate = function () {
        this.setIsActive(false);
        Logger.debug(" deactivedate ");
        this.worm.setSpriteDef(this.takeAimAnimations, false); //unlocks sprite
        //this.worm.setSpriteDef(Sprites.worms.idle1);
    };
    Drill.prototype.update = function () {
        if (this.getIsActive()) {
            var weaponUseDuration = this.useDurationTimer.hasTimePeriodPassed();
            if (weaponUseDuration) {
                this.deactivate();
            }
            AssetManager.getSound("drill").play();
            if (this.timeBetweenExploisionsTimer.hasTimePeriodPassed()) {
                GameInstance.terrain.addToDeformBatch(Physics.metersToPixels(this.worm.body.GetPosition().x), Physics.metersToPixels(this.worm.body.GetPosition().y), 25);
            }
            this.useDurationTimer.update();
            this.timeBetweenExploisionsTimer.update();
        }
    };
    return Drill;
})(BaseWeapon);
