var Controls;
(function (Controls) {

    Controls.toggleWeaponMenu = {
        gamepad: -1,
        keyboard: 101,
        mouse: 3
    };
    Controls.walkLeft = {
        gamepad: -1,
        keyboard: 65,
        mouse: -1
    };
    Controls.walkRight = {
        gamepad: -1,
        keyboard: 68,
        mouse: -1
    };
    Controls.jump = {
        gamepad: -1,
        keyboard: 32,
        mouse: -1
    };
    Controls.backFlip = {
        gamepad: -1,
        keyboard: keyboard.keyCodes.Backspace,
        mouse: -1
    };
    Controls.aimUp = {
        gamepad: -1,
        keyboard: 87,
        mouse: -1
    };
    Controls.aimDown = {
        gamepad: -1,
        keyboard: 83,
        mouse: -1
    };
    Controls.fire = {
        gamepad: -1,
        keyboard: 13,
        mouse: 1
    };
    function checkControls(control, key) {
        return (key == control.gamepad || key == control.keyboard || key == control.mouse);
    }

    Controls.checkControls = checkControls;

})(Controls || (Controls = {}));
