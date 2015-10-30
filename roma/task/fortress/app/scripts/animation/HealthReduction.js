var ToostMessage = (function () {
    function ToostMessage(pos, message, color, time, speed) {
        if (time === void 0) {
            time = 2700;
        }
        if (speed === void 0) {
            speed = 0.7;
        }
        this.finished = false;
        this.color = color;
        this.pos = pos;
        this.message = message;
        this.speed = speed;
        if (Utilies.isNumber(this.message)) {
            this.message = Math.floor(this.message);
            this.box = this.preRenderNumberBox();
        }
        else {
            this.box = this.preRenderMessageBox();
        }
        this.pos.x -= this.box.width / 2;
        this.pos.y -= this.box.height * 2;
        this.timer = new Timer(time);
    }
    // pre-render box around countdown number
    ToostMessage.prototype.preRenderNumberBox = function () {
        var healthBoxWidth = 39;
        var healthBoxHeight = 18
        return Graphics.preRenderer.render(function (ctx) {

            ctx.fillStyle = '#1A1110';
            ctx.strokeStyle = "#eee";

            Graphics.roundRect(ctx, 0, 0, healthBoxWidth, healthBoxHeight, 4).fill();
            Graphics.roundRect(ctx, 0, 0, healthBoxWidth, healthBoxHeight, 4).stroke();
        }, 39, 20);
    };
    ToostMessage.prototype.preRenderMessageBox = function () {
        var nameBoxWidth = this.message.length * 10;
        return Graphics.preRenderer.render(function (ctx) {

            ctx.fillStyle = '#1A1110';
            ctx.strokeStyle = "#eee";
            ctx.font = 'bold 16.5px Sans-Serif';
            ctx.textAlign = 'center';

            Graphics.roundRect(ctx, 0, 0, nameBoxWidth, 20, 4).fill();
            Graphics.roundRect(ctx, 0, 0, nameBoxWidth, 20, 4).stroke();

            ctx.fillStyle = this.color;
            ctx.fillText(this.message, (this.message.length * 10) / 2, 15);

        }, nameBoxWidth, 20);
    };
    ToostMessage.prototype.draw = function (ctx) {
        ctx.drawImage(this.box, this.pos.x, this.pos.y);
        ctx.fillStyle = this.color;
        if (Utilies.isNumber(this.message)) {
            ctx.fillText(this.message, this.pos.x + (this.box.width / 2), this.pos.y + (this.box.height / 1.4));
        }
    };
    ToostMessage.prototype.onAnimationFinish = function (func) {
        this.onFinishFunc = func;
    };
    ToostMessage.prototype.update = function () {
        this.timer.update();
        if (this.timer.hasTimePeriodPassed()) {
            this.finished = true;
            if (this.onFinishFunc) {
                this.onFinishFunc();
            }
        }
        this.pos.y -= this.speed;
    };
    return ToostMessage;
})();
