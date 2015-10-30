var EffectsManager = (function () {
    function EffectsManager() {
        this.particleEffects = [];
    }
    EffectsManager.prototype.add = function (effect) {
        this.particleEffects.push(effect);
    };
    EffectsManager.prototype.stopAll = function () {
        for (var i = this.particleEffects.length - 1; i >= 0; i--) {
            this.particleEffects[i].finished = true;
        }
    };
    EffectsManager.prototype.draw = function (ctx) {
        for (var i = this.particleEffects.length - 1; i >= 0; i--) {
            this.particleEffects[i].draw(ctx);
        }
    };
    EffectsManager.prototype.areAllAnimationsFinished = function () {
        return (this.particleEffects.length == 0);
    };
    EffectsManager.prototype.update = function () {
        for (var i = this.particleEffects.length - 1; i >= 0; i--) {
            this.particleEffects[i].update();
            if (this.particleEffects[i].finished == true) {
                Utilies.deleteFromCollection(this.particleEffects, i);
            }
        }
    };
    return EffectsManager;
})();
