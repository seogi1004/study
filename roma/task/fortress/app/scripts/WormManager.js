var WormManager = (function () {
    function WormManager(players) {
        this.allWorms = [];
        // Get a reference to all the worms from each team
        // for fast acessing, when asking quetions of all them.
        for (var i = 0; i < players.length; i++) {
            var worms = players[i].getTeam().getWorms();
            for (var j = 0; j < worms.length; j++) {
                this.allWorms.push(worms[j]);
            }
        }
        console.log(this.allWorms);
    }

    WormManager.prototype.findWormWithName = function (name) {
        for (var i = this.allWorms.length - 1; i >= 0; --i) {
            if (this.allWorms[i].name == name) {
                return this.allWorms[i];
            }
        }
        console.error("Unable to find worm with name " + name);
    };
    // are all the worms completely finished, animations, health reduction, actions etc.
    WormManager.prototype.areAllWormsReadyForNextTurn = function () {
        return WormAnimationManger.playerAttentionSemaphore == 0 && this.areAllWormsStationary() && this.areAllWormsDamageTaken() && this.areAllWeaponsDeactived();
    };
    // Are all the worms stop, not moving at all. 
    WormManager.prototype.areAllWormsStationary = function () {
        for (var i = this.allWorms.length - 1; i >= 0; --i) {
            if (this.allWorms[i].isStationary() == false) {
                return false;
            }
        }
        return true;
    };
    WormManager.prototype.findFastestMovingWorm = function () {
        var highestVecloity = 0;
        var wormWithHighestVelocity = null;
        var lenght = 0;
        for (var i = this.allWorms.length - 1; i >= 0; --i) {
            lenght = this.allWorms[i].body.GetLinearVelocity().Length();
            if (lenght > highestVecloity) {
                highestVecloity = lenght;
                wormWithHighestVelocity = this.allWorms[i];
            }
        }
        return wormWithHighestVelocity;
    };
    WormManager.prototype.areAllWeaponsDeactived = function () {
        for (var i = this.allWorms.length - 1; i >= 0; --i) {
            if (this.allWorms[i].team.getWeaponManager().getCurrentWeapon().getIsActive() == true) {
                return false;
            }
        }
        return true;
    };
    //deactivate all non-time based weapons, such as jetpacks and ropes etc. 
    WormManager.prototype.deactivedAllNonTimeBasedWeapons = function () {
        for (var i = this.allWorms.length - 1; i >= 0; --i) {
            var weapon = this.allWorms[i].team.getWeaponManager().getCurrentWeapon();
            if (weapon.getIsActive() == true) {
                if ((weapon instanceof ThrowableWeapon || weapon instanceof ProjectileWeapon) == false) {
                    weapon.deactivate();
                }
            }
        }
        return true;
    };
    // Are all worm accumlated damage pionts taken from their total health yet?
    WormManager.prototype.areAllWormsDamageTaken = function () {
        for (var i = 0; i < this.allWorms.length; i++) {
            if (this.allWorms[i].damageTake != 0) {
                return false;
            }
            // May have taken the health away but are now waiting for the death squence to start, so contine to return false
            if (this.allWorms[i].getHealth() == 0 && this.allWorms[i].damageTake == 0 && this.allWorms[i].isDead == false) {
                return false;
            }
        }
        return true;
    };
    WormManager.prototype.syncHit = function (wormName, damage) {
        if (Client.isClientsTurn()) {
            var parameters = [wormName, damage];
            Client.sendImmediately(Events.client.ACTION, new InstructionChain("wormManager.syncHit", parameters));
        }
        else {
            var damage = wormName[1];
            var wormName = wormName[0];
            var worm = GameInstance.wormManager.findWormWithName(wormName);
            if (worm) {
                worm.damageTake += damage;
                worm.hit(0, null);
            }
        }
    };
    return WormManager;
})();
