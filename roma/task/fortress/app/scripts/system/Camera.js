var Camera = (function () {
    function Camera(levelWidth, levelHeight, vpWidth, vpHeight) {
        this.levelWidth = levelWidth;
        this.levelHeight = levelHeight;
        this.vpWidth = vpWidth;
        this.vpHeight = vpHeight;
        this.position = new b2Vec2(0, 0);
        this.panPosition = new b2Vec2(0, 0);
        this.panSpeed = 6.1;
        this.toPanOrNotToPan = false;
    }

    Camera.prototype.update = function () {
        //Logger.log("before Update this.panX = " + this.panX + "  this.x = " + this.x);
        //Logger.log("before Update this.panY = " + this.panY + "  this.y = " + this.y);
        if (this.toPanOrNotToPan) {
            if (this.panPosition.x > this.position.x) {
                this.incrementX(this.panSpeed);
            }
            if (this.panPosition.x < this.position.x) {
                this.incrementX(-this.panSpeed);
            }
            if (this.panPosition.y > this.position.y) {
                this.incrementY(this.panSpeed);
            }
            if (this.panPosition.y < this.position.y) {
                this.incrementY(-this.panSpeed);
            }
        }
        // Logger.log("after Update this.panX = " + this.panX + "  this.x = " + this.x);
        //Logger.log("after Update this.panY = " + this.panY + "  this.y = " + this.y);
    };
    Camera.prototype.cancelPan = function () {
        this.toPanOrNotToPan = false;
    };
    Camera.prototype.panToPosition = function (vector) {
        // Center on said position
        vector.x -= this.vpWidth / 2;
        vector.y -= this.vpHeight / 2;
        var currentPos = this.position.Copy();
        currentPos.Subtract(vector);
        var diff = currentPos.Length() / 25;
        this.panSpeed = diff;
        this.panPosition.x = vector.x;
        this.toPanOrNotToPan = true;
        this.panPosition.y = vector.y;
    };
    Camera.prototype.getX = function () {
        return this.position.x;
    };
    Camera.prototype.getY = function () {
        return this.position.y;
    };
    Camera.prototype.setX = function (x) {
        if (this.vpWidth + x <= this.levelWidth && x >= 0) {
            this.position.x = x;
            return true;
        }
        return false;
    };
    Camera.prototype.setY = function (y) {
        if (this.vpHeight + y <= this.levelHeight && y >= 0) {
            this.position.y = y;
            return true;
        }
        return false;
    };
    Camera.prototype.incrementX = function (x) {
        return this.setX(this.position.x + x);
    };
    Camera.prototype.incrementY = function (y) {
        return this.setY(this.position.y + y);
    };
    return Camera;
})();
