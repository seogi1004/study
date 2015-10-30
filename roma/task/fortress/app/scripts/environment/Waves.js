var Waves = (function () {
    function Waves() {
        this.wave = new Sprite(Sprites.particleEffects.wave);
        var wave2 = Sprites.particleEffects.wave;
        wave2.frameY = 2;
        this.wave2 = new Sprite(wave2);
    }

    Waves.prototype.update = function () {
        this.wave.update();
        this.wave2.update();
    };
    Waves.prototype.drawBackgroundWaves = function (ctx, x, y, w) {
        y -= 35;
        ctx.fillRect(x, y, w, 400);
        var waveY = y - this.wave.getFrameHeight() * 0.5;
        for (var i = 0; i < w; i += this.wave.getFrameWidth()) {
            this.wave.draw(ctx, i, waveY);
        }
    };
    Waves.prototype.draw = function (ctx, x, y, w) {
        var waveY = y - this.wave.getFrameHeight() * 0.5;
        for (var i = 0; i < w; i += this.wave.getFrameWidth()) {
            this.wave2.draw(ctx, i - 1, waveY);
        }
        waveY = y + this.wave.getFrameHeight() * 0.5;
        for (var i = 0; i < w; i += this.wave.getFrameWidth()) {
            this.wave.draw(ctx, i - 1, waveY);
        }
    };
    return Waves;
})();
