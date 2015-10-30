var ParticleEffect = (function () {
    function ParticleEffect(x, y) {
        this.x = x;
        this.y = y;
        this.eclipse = new Sprite(Sprites.particleEffects.eclipse, true);
        this.cirlce = new Sprite(Sprites.particleEffects.cirlce1, true);
        this.word = new Sprite(Sprites.particleEffects.wordBiff, true);
        this.center = new b2Vec2(this.eclipse.getImage().width / 2, this.eclipse.getFrameHeight() / 2);
        this.finished = false;
        this.particles = [];
        for (var p = 9; p >= 0; p--) {
            this.particles.push(new Particle(new b2Vec2(x + this.center.x, y + this.center.y), new b2Vec2(Utilies.random(-300, 300), Utilies.random(-500, 0))));
        }
    }

    ParticleEffect.prototype.draw = function (ctx) {
        ctx.save();
        //Center it on the position instead of from the left top hand conor
        ctx.translate(-this.eclipse.getImage().width / 2, -this.eclipse.getFrameHeight() / 2);
        for (var p = this.particles.length - 1; p >= 0; p--) {
            this.particles[p].draw(ctx);
        }
        this.cirlce.drawOnCenter(ctx, this.x, this.y, this.eclipse);
        //hack, to do with the sprite draw() method not using the isfinished var, fix later
        if (this.eclipse.finished == false) {
            this.eclipse.draw(ctx, this.x, this.y);
        }
        this.word.drawOnCenter(ctx, this.x, this.y, this.eclipse);
        ctx.restore();
    };
    ParticleEffect.prototype.update = function () {
        this.eclipse.update();
        this.cirlce.update();
        this.word.update();
        for (var p = this.particles.length - 1; p >= 0; p--) {
            this.particles[p].update();
        }
        //Particles have the longest animation so once they are finished we can make the effect for deletion
        this.finished = this.particles[0].finished;
        if (this.finished) {
            if (this.onFinished) {
                this.onFinished();
            }
        }
    };
    ParticleEffect.prototype.onAnimationFinish = function (func) {
        this.onFinished = func;
    };
    return ParticleEffect;
})();
