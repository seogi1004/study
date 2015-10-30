var Effects;
(function (Effects) {
    function explosion(epicenter, explosionRadius, effectedRadius, explosiveForce, maxDamage, entityThatCausedExplosion, soundEffectToPlay, particleEffectType) {
        if (entityThatCausedExplosion === void 0) {
            entityThatCausedExplosion = null;
        }
        if (soundEffectToPlay === void 0) {
            soundEffectToPlay = AssetManager.getSound("explosion" + Utilies.random(1, 3));
        }
        if (particleEffectType === void 0) {
            particleEffectType = ParticleEffect;
        }
        var posX = Physics.metersToPixels(Math.floor(epicenter.x));
        var posY = Physics.metersToPixels(Math.floor(epicenter.y));
        GameInstance.terrain.addToDeformBatch(posX, posY, explosionRadius);

        Physics.applyToNearByObjects(
            epicenter,
            effectedRadius,
            function (fixture, epicenter) {
                if (fixture.GetBody().GetType() != b2Body.b2_staticBody && fixture.GetBody().GetUserData() instanceof Worm) {
                    var direction = fixture.GetBody().GetPosition().Copy();
                    direction.x = Math.floor(direction.x);
                    direction.y = Math.floor(direction.y);
                    direction.Subtract(epicenter);
                    var forceVec = direction.Copy();

                    var diff = effectedRadius - direction.Length();

                    if (diff < 0) {
                        diff = 0;
                    }

                    var distanceFromEpicenter = diff / effectedRadius;
                    fixture.GetBody().GetUserData().hit(maxDamage * distanceFromEpicenter, entityThatCausedExplosion)

                    forceVec.Normalize();
                    forceVec.Multiply(explosiveForce * distanceFromEpicenter);

                    //Quick hack so grave stones are not checked by explosions
                    if (fixture.GetBody().GetUserData().isDead == true) {
                        forceVec.x = 0;
                        forceVec.y /= 10;
                    }

                    fixture.GetBody().ApplyImpulse(forceVec, fixture.GetBody().GetPosition());

                }
            }
        );

        var particleAnimation = new particleEffectType(posX, posY);
        GameInstance.particleEffectMgmt.add(particleAnimation);
        if (soundEffectToPlay != null)
            soundEffectToPlay.play();
        return particleAnimation;
    }

    Effects.explosion = explosion;
})(Effects || (Effects = {}));
