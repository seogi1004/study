var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
var BounceArrow = (function (_super) {
    __extends(BounceArrow, _super);
    function BounceArrow(initalPos) {
        initalPos.x -= 15;
        initalPos.y -= 120;
        this.initalPos = initalPos;
        _super.call(this, Sprites.weapons.arrow);
    }

    BounceArrow.prototype.draw = function (ctx) {
        if (this.finished == false) {
            _super.prototype.draw.call(this, ctx, this.initalPos.x, this.initalPos.y);
        }
    };
    BounceArrow.prototype.physics = function () {
        //override the base class
    };
    return BounceArrow;
})(Sprite);
