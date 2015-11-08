var WormAnimationManager = (function () {

    function WormAnimationManager(worm) {
        this.worm = worm;
        this.currentState = WormAnimationManager.WORM_STATE.idle;
        this.idleTimer = new Timer(100);
        this.previouslySelectedWeapon = this.worm.team.getWeaponManager().getCurrentWeapon();
    };

    WormAnimationManager.prototype.setState = function (state) {
        this.currentState = state;
    };

    WormAnimationManager.prototype.getState = function () {
        return this.currentState;
    };

    WormAnimationManager.prototype.setIdleAnimation = function () {
        // If this worm is the worm of the current player and its not in a dieing state
        if (this.worm.isActiveWorm() && this.worm.spriteDef != Sprites.worms.die) {
            //If the worm is the current worm its idel will be to take out its weapon
            this.worm.setSpriteDef(this.worm.team.getWeaponManager().getCurrentWeapon().takeOutAnimations, false, true);
            // Once the animation to take out the weapon is finished then display this still image, which is the aiming image 
            // most of the time, depending on the type or weapon or tool.
            this.worm.onAnimationFinish(function () {
                this.worm.setSpriteDef(this.worm.team.getWeaponManager().getCurrentWeapon().takeAimAnimations);
                this.worm.setCurrentFrame(this.worm.target.previousSpriteFrame);
                this.worm.finished = true;
                this.currentState = WormAnimationManager.WORM_STATE.aiming;
            });
        } else {
            // If not current worm just normal idel.
            if (this.worm.health > 30) {
                this.worm.setSpriteDef(Sprites.worms.idle1);
            }
            else {
                this.worm.setSpriteDef(Sprites.worms.hurt);
            }
        }
    };
    WormAnimationManager.prototype.update = function () {
        if (GameInstance.wormManager.areAllWormsStationary() && this.worm.health == 0 && WormAnimationManager.playerAttentionSemaphore == 0 && this.worm.spriteDef != Sprites.worms.die ) {
            WormAnimationManager.playerAttentionSemaphore++;
            GameInstance.camera.panToPosition(Physics.vectorMetersToPixels(this.worm.body.GetPosition()));
            this.worm.onAnimationFinish(function ()
            {
                this.worm.isDead = true;

                var effectedRadius = Physics.pixelToMeters(50);
                var maxDamage = 10;
                var explosiveForce = 20;
                var explosionRadius = 40;

                var animation = Effects.explosion(
                    this.worm.body.GetPosition(),
                    explosionRadius,
                    effectedRadius,
                    explosiveForce,
                    maxDamage
                );

                animation.onAnimationFinish(function () {
                    WormAnimationManager.playerAttentionSemaphore--;
                });
            });
            this.worm.setSpriteDef(Sprites.worms.die, true, true);
            this.worm.setNoLoop(true);
            Utilies.pickRandomSound(["byebye", "ohdear", "fatality"]).play(1, 2);
        }

        if (GameInstance.wormManager.areAllWormsStationary() && this.worm.damageTake > 0) {

            WormAnimationManager.playerAttentionSemaphore++;
            var animation = new ToostMessage(Physics.vectorMetersToPixels(this.worm.body.GetPosition()), this.worm.damageTake, this.worm.team.color);
            animation.onAnimationFinish(function () {
                WormAnimationManager.playerAttentionSemaphore--;
                GameInstance.healthMenu.update(this.worm.team);
                if (GameInstance.state.getCurrentPlayer().getTeam().getCurrentWorm() == this.worm) {
                    GameInstance.state.tiggerNextTurn();
                }
            });

            GameInstance.particleEffectMgmt.add(animation);

            this.worm.setHealth(this.worm.getHealth() - this.worm.damageTake);
            this.worm.damageTake = 0;
        }

        if (this.previouslySelectedWeapon != this.worm.team.getWeaponManager().getCurrentWeapon()) {
            this.previouslySelectedWeapon = this.worm.team.getWeaponManager().getCurrentWeapon();
            this.setIdleAnimation();
        }

        if (this.currentState == WormAnimationManager.WORM_STATE.walking) {
            this.worm.setSpriteDef(Sprites.worms.walking);
            this.idleTimer.reset();
        }

        if (this.worm.canJump == 0 && this.worm.body.GetLinearVelocity().y > 0) {
            this.worm.setSpriteDef(Sprites.worms.falling);
            this.currentState = WormAnimationManager.WORM_STATE.failing;
            this.idleTimer.reset();

        } else if (this.worm.canJump == 0 && this.worm.body.GetLinearVelocity().y < 0) {
            this.worm.setSpriteDef(Sprites.worms.jumpBegin);
            this.currentState = WormAnimationManager.WORM_STATE.jumping;
            this.idleTimer.reset();
        }

        if (this.idleTimer.hasTimePeriodPassed()) {
            this.idleTimer.pause();
            this.setIdleAnimation();
        }

        this.idleTimer.update();
    };

    WormAnimationManager.WORM_STATE = {
        idle: 0,
        walking: 1,
        jumping: 2,
        failing: 3,
        aiming: 4
    };

    WormAnimationManager.playerAttentionSemaphore = 0;

    return WormAnimationManager;
})();
