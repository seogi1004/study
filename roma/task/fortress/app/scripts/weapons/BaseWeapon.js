var BaseWeapon = (function () {
    function BaseWeapon(name, ammo, iconSprite, takeOutAnimation, takeAimAnimation) {
        this.name = name;
        this.ammo = ammo;
        this.takeOutAnimations = takeOutAnimation;
        this.takeAimAnimations = takeAimAnimation;
        //Setup the icon used in the weapon menu
        this.iconImage = AssetManager.getImage(iconSprite.imageName);
        this.requiresAiming = true;
        this.setIsActive(false);
        this.forceIndicator = new ForceIndicator(0);
    }

    BaseWeapon.prototype.getForceIndicator = function () {
        return this.forceIndicator;
    };
    BaseWeapon.prototype.getIsActive = function () {
        return this.isActive;
    };
    BaseWeapon.prototype.setIsActive = function (val) {
        this.isActive = val;
    };
    BaseWeapon.prototype.deactivate = function () {
    };
    BaseWeapon.prototype.activate = function (worm) {
        this.setIsActive(true);
        this.ammo--;
        this.worm = worm;
        Logger.debug(this.name + " was activated ");
    };
    BaseWeapon.prototype.update = function () {
    };
    BaseWeapon.prototype.draw = function (ctx) {
    };
    return BaseWeapon;
})();
