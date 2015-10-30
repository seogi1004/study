var Sprite = (function () {
    function Sprite(spriteDef, noLoop) {
        if (noLoop === void 0) {
            noLoop = false;
        }
        //Defualts to moving forward though the sprite
        //though can be used to move back though the sprite
        this.frameIncremeter = 1;
        this.lastUpdateTime = 0;
        this.accumulateDelta = 0;
        this.isSpriteLocked = false;
        this.setSpriteDef(spriteDef);
        this.noLoop = noLoop;
    }

    Sprite.prototype.update = function () {
        if (this.finished == false) {
            var delta = Date.now() - this.lastUpdateTime;
            if (this.accumulateDelta > this.spriteDef.msPerFrame) {
                this.accumulateDelta = 0;
                this.currentFrameY += this.frameIncremeter;
                if (this.currentFrameY >= this.spriteDef.frameCount) {
                    // If aniamtion is not meant to loop 
                    if (this.noLoop) {
                        this.finished = true;
                        if (this.onFinishFunc != null) {
                            this.onFinishFunc();
                            this.onFinishFunc = null;
                            return;
                        }
                    }
                    this.currentFrameY = this.spriteDef.frameY; //reset to start
                }
            }
            else {
                this.accumulateDelta += delta;
            }
            this.lastUpdateTime = Date.now();
        }
    };
    //Draws this sprite at the center of another
    Sprite.prototype.drawOnCenter = function (ctx, x, y, spriteToCenterOn) {
        if (this.finished == false) {
            ctx.save();
            ctx.translate((spriteToCenterOn.getImage().width - this.getImage().width) / 2, (spriteToCenterOn.getFrameHeight() - this.getFrameHeight()) / 2);
            this.draw(ctx, x, y);
            ctx.restore();
        }
    };
    Sprite.prototype.draw = function (ctx, x, y) {
        var tmpCurrentFrameY = Math.floor(this.currentFrameY);
        if (tmpCurrentFrameY >= 0) {
            ctx.drawImage(this.image, 0, tmpCurrentFrameY * this.frameHeight, this.image.width, this.frameHeight, Math.floor(x), Math.floor(y), this.image.width, this.frameHeight);
        }
    };
    Sprite.prototype.getImage = function () {
        return this.image;
    };
    Sprite.prototype.getCurrentFrame = function () {
        return this.currentFrameY;
    };
    Sprite.prototype.setCurrentFrame = function (frame) {
        if (frame >= 0 && frame < this.spriteDef.frameCount) {
            this.currentFrameY = frame;
        }
    };
    Sprite.prototype.setNoLoop = function (val) {
        this.noLoop = val;
    };
    Sprite.prototype.getFrameHeight = function () {
        return this.frameHeight;
    };
    Sprite.prototype.getFrameWidth = function () {
        return this.image.width;
    };
    Sprite.prototype.getTotalFrames = function () {
        return this.spriteDef.frameCount;
    };
    // Allows for func to be called once this sprite animation has finished
    Sprite.prototype.onAnimationFinish = function (func) {
        if (this.isSpriteLocked == false)
            this.onFinishFunc = func;
    };
    Sprite.prototype.setSpriteDef = function (spriteDef, lockSprite, noLoop) {
        if (lockSprite === void 0) {
            lockSprite = false;
        }
        if (noLoop === void 0) {
            noLoop = false;
        }
        if (spriteDef != this.spriteDef) {
            if (this.isSpriteLocked == false) {
                this.noLoop = noLoop;
                this.finished = false;
                this.spriteDef = spriteDef;
                this.currentFrameY = spriteDef.frameY;
                this.isSpriteLocked = lockSprite;
                this.image = AssetManager.getImage(spriteDef.imageName);
                this.frameHeight = this.image.height / spriteDef.frameCount;
            }
        }
        //This allows a call to this method to lock the current spriteDef
        // Which stops other calls to this method from unlocking changing the spriteDef
        // unless they pass in the same spritedef that was used when it was inital set.
        // This is useful to stop the game loop and other states from unsetting each others spritedefs
        // Mainly used in the weapon classes.
        if (this.spriteDef == spriteDef) {
            this.isSpriteLocked = lockSprite;
        }
    };
    //Changes sprite sheet but stops the currentframe from resetting
    Sprite.prototype.swapSpriteSheet = function (spriteSheet) {
        var currentFrame = this.getCurrentFrame();
        this.setSpriteDef(spriteSheet);
        this.setCurrentFrame(currentFrame);
        this.finished = true; //So the sprite doesn't animate
    };

    return Sprite;

})();
