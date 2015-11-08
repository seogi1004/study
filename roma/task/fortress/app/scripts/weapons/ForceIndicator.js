var ForceIndicator = (function () {
    function ForceIndicator(maxForceForWeapon) {
        this.forceMax = maxForceForWeapon; // Max force at which worms can throw
        this.forcePercentage = 1;
        this.sprite = new Sprite(Sprites.particleEffects.blob);
        this.needReRender = true;
        this.renderCanvas = null;
    }

    // Some weapons don't require a force build up meter
    ForceIndicator.prototype.isRequired = function () {
        return this.forceMax != 0;
    };
    ForceIndicator.prototype.draw = function (ctx, worm) {
        if (this.isCharging() && this.isRequired()) {
            if (this.needReRender) {
                this.renderCanvas = Graphics.preRenderer.render(function (context) {
                    this.sprite.draw(context, 0, (this.forcePercentage / 100) * 100);
                    this.needReRender = false;
                }, this.sprite.getFrameWidth(), 200, this.renderCanvas);
            }

            var radius = worm.fixture.GetShape().GetRadius() * Physics.worldScale;
            var wormPos = Physics.vectorMetersToPixels(worm.body.GetPosition().Copy());
            var targetDir = worm.target.getTargetDirection().Copy();
            targetDir.Multiply(16);
            targetDir.Add(wormPos);
            ctx.save();
            ctx.translate(
                targetDir.x,
                targetDir.y
            )

            ctx.rotate(Utilies.vectorToAngle(worm.target.getTargetDirection().Copy()) + Utilies.toRadians(-90));
            ctx.drawImage(this.renderCanvas, -radius, -radius, this.renderCanvas.width, this.renderCanvas.height);
            ctx.restore();
        }
    };
    ForceIndicator.prototype.charge = function (rate) {
        if (this.isRequired()) {
            //AssetManager.getSound("THROWPOWERUP").play();
            this.forcePercentage += rate;
            this.sprite.setCurrentFrame(this.sprite.getCurrentFrame() + 0.4);
            this.needReRender = true;
            if (this.forcePercentage > 100) {
                this.forcePercentage = 100;
                return true;
            }
        }
    };
    ForceIndicator.prototype.isCharging = function () {
        return this.forcePercentage > 1;
    };
    ForceIndicator.prototype.setMaxForce = function (forceScalerMax) {
        this.forceMax = forceScalerMax;
    };
    ForceIndicator.prototype.reset = function () {
        if (this.isRequired() && this.forcePercentage > 1) {
            this.forcePercentage = 1;
            //AssetManager.getSound("THROWPOWERUP").pause();
            //AssetManager.getSound("THROWRELEASE").play();
            this.renderCanvas.getContext('2d').clearRect(0, 0, this.renderCanvas.width, this.renderCanvas.height);
            //Used to reset the sprite
            this.sprite.currentFrameY = 0;
        }
    };
    ForceIndicator.prototype.getForce = function () {
        return (this.forcePercentage / 100) * this.forceMax;
    };
    return ForceIndicator;
})
();
