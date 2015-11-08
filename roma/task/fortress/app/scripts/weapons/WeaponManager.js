var WeaponManager = (function () {
    function WeaponManager() {
        this.weaponsAndTools =
            [
                new Shotgun(99),
                new HandGrenade(20),
                new HolyGrenade(2),
                new Dynamite(5),
                // new LandMine(10), //Not finished
                new JetPack(5),
                new Minigun(4),
                new NinjaRope(50),
                new Drill(3),
                // new Blowtorch(3), //not finished
                new Bazzoka(15)
            ];
        this.currentWeaponIndex = 1;
    }
    WeaponManager.prototype.checkWeaponHasAmmo = function (weaponIndex) {
        if (this.weaponsAndTools[weaponIndex].ammo) {
            return true;
        }
        return false;
    };
    WeaponManager.prototype.getCurrentWeapon = function () {
        return this.weaponsAndTools[this.currentWeaponIndex];
    };
    WeaponManager.prototype.setCurrentWeapon = function (index) {
        //Allows the user to switch weapon once its active if its a jetpack or ninjia rope
        if (this.getCurrentWeapon().getIsActive() == false || this.getCurrentWeapon() instanceof JetPack || this.getCurrentWeapon() instanceof NinjaRope) {
            if (this.getCurrentWeapon() instanceof NinjaRope) {
                this.getCurrentWeapon().deactivate();
            }
            this.currentWeaponIndex = index;
        }
    };
    WeaponManager.prototype.getListOfWeapons = function () {
        return this.weaponsAndTools;
    };
    return WeaponManager;
})();