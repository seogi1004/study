var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

var PhysicsSprite = (function (_super) {
    __extends(PhysicsSprite, _super);
    function PhysicsSprite(initalPos, initalVelocity, spriteDef) {
        _super.call(this, spriteDef);
        this.position = initalPos;
        this.velocity = initalVelocity;
    }

    PhysicsSprite.prototype.draw = function (ctx, x, y) {
        if (x === void 0) {
            x = this.position.x;
        }
        if (y === void 0) {
            y = this.position.y;
        }
        _super.prototype.draw.call(this, ctx, x, y);
    };
    PhysicsSprite.prototype.physics = function () {
        var t = 0.016;
        var g = new b2Vec2(0, 9.81);
        var at = g.Copy();
        this.velocity.Add(at);
        var vt = this.velocity.Copy();
        vt.Multiply(t);
        this.position.Add(vt);
    };
    PhysicsSprite.prototype.update = function () {
        this.physics();
        _super.prototype.update.call(this);
    };
    return PhysicsSprite;
})(Sprite);
