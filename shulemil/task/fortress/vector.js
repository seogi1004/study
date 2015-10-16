var fn;

function Vector(posX, posY) {
    var x = posX || 0, y = posY || 0;

    this.get = function () {
        return {x: x, y: y}
    };
    this.set = function (posX, posY) {
        x = posX;
        y = posY;
    };
}
fn = Vector.prototype;
fn.getDirection = function () {
    var v = this.get();
    return Math.atan2(v.y, v.x);
};
fn.setDirection = function (r) {
    var s = this.getScalar();
    this.set(s * Math.cos(r), s * Math.sin(r));
};
fn.getScalar = function () {
    var v = this.get();
    return Math.sqrt(v.x * v.x + v.y * v.y);
};
fn.setScalar = function (s) {
    var d = this.getDirection();
    this.set();
};