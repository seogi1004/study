String.prototype.format = function () {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i - 0] = arguments[_i];
    }
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match;
    });
};

var Notify;
(function (Notify) {
    Notify.locked = false;
    Notify.levels = {
        sucess: "alert-success",
        warn: "alert-warn",
        error: "alert-error"
    };
    function display(header, message, autoHideTime, cssStyle, doNotOverWrite) {
        if (autoHideTime === void 0) {
            autoHideTime = 2800;
        }
        if (cssStyle === void 0) {
            cssStyle = Notify.levels.sucess;
        }
        if (doNotOverWrite === void 0) {
            doNotOverWrite = false;
        }
        if (!Notify.locked) {
            Notify.locked = doNotOverWrite;
            $("#notifaction").removeClass(Notify.levels.warn);
            $("#notifaction").removeClass(Notify.levels.error);
            $("#notifaction").removeClass(Notify.levels.sucess);
            $("#notifaction").addClass(cssStyle);
            $("#notifaction strong").empty();
            $("#notifaction strong").html(header);
            $("#notifaction p").empty();
            $("#notifaction p").html(message);
            $("#notifaction").animate({
                top: (parseInt($("#notifaction").css("height"))) + "px"
            }, 400, function () {
                if (autoHideTime > 0) {
                    setTimeout(hide, autoHideTime);
                }
            });
        }
    }

    Notify.display = display;
    function hide(callback) {
        if (!Notify.locked) {
            $("#notifaction").animate({
                top: (-parseInt($("#notifaction").css("height"))) - 100 + "px"
            }, 400, function () {
                locked = false;
                if (callback != null) {
                    callback();
                }
            });
        }
    }

    Notify.hide = hide;
})(Notify || (Notify = {}));

var Utilies;
(function (Utilies) {
    //Allows for the copying of Object types into their proper types, used for copy constructer
    //for objects that are sent over the network. I have intergrated this function, into
    // the constructor of the Person object so it acts like C-style copy construction
    // WARNING: This creates a deep copy, so reference are not preserved
    function copy(newObject, oldObject) {
        for (var member in oldObject) {
            // if the member is itself an object, then we most also call copy on that
            if (typeof (oldObject[member]) == "object") {
                //FIXME : Should be usig this try catch, fix it later
                try {
                    newObject[member] = copy(newObject[member], oldObject[member]);
                }
                catch (e) {
                }
            }
            else {
                // if its a primative member just assign it
                try {
                    newObject[member] = oldObject[member];
                }
                catch (e) {
                }
            }
        }
        return newObject;
    }

    Utilies.copy = copy;
    function sign(x) {
        return x > 0 ? 1 : x < 0 ? -1 : 0;
    }

    Utilies.sign = sign;
    function findByValue(needle, haystack, haystackProperity) {
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i][haystackProperity] === needle) {
                return haystack[i];
            }
        }
        throw "Couldn't find object with proerpty " + haystackProperity + " equal to " + needle;
    }

    Utilies.findByValue = findByValue;
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    Utilies.random = random;
    function pickRandom(collection) {
        return collection[random(0, collection.length - 1)];
    }

    Utilies.pickRandom = pickRandom;
    var pickUnqineCollection = [];

    function pickUnqine(collection, stringId) {
        if (pickUnqineCollection[stringId]) {
            var items = pickUnqineCollection[stringId];
            if (items.length <= 0) {
                console.error("Out of unqine items in collection " + stringId);
                return;
            }
            var index = random(0, items.length - 1);
            var unqineItem = items[index];
            deleteFromCollection(items, index);
            return unqineItem;
        }
        else {
            pickUnqineCollection[stringId] = collection;
            return pickUnqine(collection, stringId);
        }
    }

    Utilies.pickUnqine = pickUnqine;
    function pickRandomSound(collection) {
        var sound = AssetManager.getSound(collection[random(0, collection.length - 1)]);
        if (!sound.play) {
            Logger.warn(" Somthing looks dogoy with the sound object " + sound);
        }
        return sound;
    }

    Utilies.pickRandomSound = pickRandomSound;
    function deleteFromCollection(collection, indexToRemove) {
        delete collection[indexToRemove];
        collection.splice(indexToRemove, 1);
    }

    Utilies.deleteFromCollection = deleteFromCollection;
    function isBetweenRange(value, rangeMax, rangeMin) {
        return value >= rangeMin && value <= rangeMax;
    }

    Utilies.isBetweenRange = isBetweenRange;
    function angleToVector(angle) {
        return new b2Vec2(Math.cos(angle), Math.sin(angle));
    }

    Utilies.angleToVector = angleToVector;
    function vectorToAngle(vector) {
        return Math.atan2(vector.y, vector.x);
    }

    Utilies.vectorToAngle = vectorToAngle;
    function toRadians(angleInDegrees) {
        return angleInDegrees * (Math.PI / 180);
    }

    Utilies.toRadians = toRadians;
    function toDegrees(angleInRdains) {
        return angleInRdains * (180 / Math.PI);
    }

    Utilies.toDegrees = toDegrees;

    function compress(s) {
        var dict = {};
        var data = (s + "").split("");
        var out = [];
        var currChar;
        var phrase = data[0];
        var code = 256;
        for (var i = 1; i < data.length; i++) {
            currChar = data[i];
            if (dict[phrase + currChar] != null) {
                phrase += currChar;
            }
            else {
                out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
                dict[phrase + currChar] = code;
                code++;
                phrase = currChar;
            }
        }
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
        for (var i = 0; i < out.length; i++) {
            out[i] = String.fromCharCode(out[i]);
        }
        return out.join("");
    }

    Utilies.compress = compress;
    function decompress(s) {
        var dict = {};
        var data = (s + "").split("");
        var currChar = data[0];
        var oldPhrase = currChar;
        var out = [currChar];
        var code = 256;
        var phrase;
        for (var i = 1; i < data.length; i++) {
            var currCode = data[i].charCodeAt(0);
            if (currCode < 256) {
                phrase = data[i];
            }
            else {
                phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
            }
            out.push(phrase);
            currChar = phrase.charAt(0);
            dict[code] = oldPhrase + currChar;
            code++;
            oldPhrase = phrase;
        }
        return out.join("");
    }

    Utilies.decompress = decompress;
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    Utilies.isNumber = isNumber;
})(Utilies || (Utilies = {}));

var Logger;
(function (Logger) {
    function log(message) {
        if (Settings.DEVELOPMENT_MODE || Settings.LOG)
            console.info(message);
    }

    Logger.log = log;
    function warn(message) {
        if (Settings.DEVELOPMENT_MODE || Settings.LOG)
            console.warn(message);
    }

    Logger.warn = warn;
    function debug(message) {
        if (Settings.DEVELOPMENT_MODE || Settings.LOG)
            console.log(message);
    }

    Logger.debug = debug;
    function error(message) {
        if (Settings.DEVELOPMENT_MODE || Settings.LOG)
            console.error(message);
    }

    Logger.error = error;
})(Logger || (Logger = {}));

var TouchUI;
(function (TouchUI) {
    var isFireHeld = false;
    var isJumpPressed = false;

    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.msMaxTouchPoints;
    }

    TouchUI.isTouchDevice = isTouchDevice;
    ;
    function init() {
        if (TouchUI.isTouchDevice()) {
            var fireButtonCssId = "touchFireButton";
            var jumpButtonCssId = "touchJump";
            //Using this to also insert the touch contorls for tablets
            $('body').append("<div class=touchButton id=" + fireButtonCssId + ">Fire</div>");
            $('body').append("<div class=touchButton id=" + jumpButtonCssId + ">Jump</div>");
            $("#" + fireButtonCssId).bind('touchstart', function (e) {
                e.preventDefault();
                isFireHeld = true;
                Logger.log("touchstarted");
            });
            $("#" + fireButtonCssId).bind("touchend", function (e) {
                isFireHeld = false;
                Logger.log("touchend");
            });
            $("#" + jumpButtonCssId).bind('touchstart', function (e) {
                e.preventDefault();
                isJumpPressed = true;
            });
            $("#" + jumpButtonCssId).bind("touchend", function (e) {
                isJumpPressed = false;
            });
        }
    }

    TouchUI.init = init;
    function isFireButtonDown(reset) {
        if (reset === void 0) {
            reset = false;
        }
        if (isFireHeld && reset) {
            isFireHeld = false;
            return true;
        }
        return isFireHeld;
    }

    TouchUI.isFireButtonDown = isFireButtonDown;
    function isJumpDown(reset) {
        if (reset === void 0) {
            reset = false;
        }
        if (isJumpPressed && reset) {
            isJumpPressed = false;
            return true;
        }
        return isJumpPressed;
    }

    TouchUI.isJumpDown = isJumpDown;
})(TouchUI || (TouchUI = {}));

var keyboard;
(function (keyboard) {
    keyboard.keys = [];
    (function () {
        $(window).keydown(function (e) {
            keyboard.keys[e.which] = true;
        });
        $(window).keyup(function (e) {
            delete keyboard.keys[e.which];
        });
    })();
    function isKeyDown(keyCode, actLikeKeyPress) {
        if (actLikeKeyPress === void 0) {
            actLikeKeyPress = false;
        }
        for (var key in keyboard.keys) {
            if (key == keyCode) {
                if (actLikeKeyPress) {
                    delete keyboard.keys[key];
                }
                return true;
            }
        }
        return false;
    }

    keyboard.isKeyDown = isKeyDown;
    function getKeyName(keycode) {
        for (var i in keyboard.keyCodes) {
            if (keyboard.keyCodes[i] == keycode) {
                return i;
            }
        }
    }

    keyboard.getKeyName = getKeyName;
    keyboard.keyCodes = {
        'Backspace': 8,
        'Tab': 9,
        'Enter': 13,
        'Shift': 16,
        'Ctrl': 17,
        'Alt': 18,
        'Pause': 19,
        'Capslock': 20,
        'Esc': 27,
        'Pageup': 33,
        'Space': 32,
        'Pagedown': 34,
        'End': 35,
        'Home': 36,
        'Leftarrow': 37,
        'Uparrow': 38,
        'Rightarrow': 39,
        'Downarrow': 40,
        'Insert': 45,
        'Delete': 46,
        '0': 48,
        '1': 49,
        '2': 50,
        '3': 51,
        '4': 52,
        '5': 53,
        '6': 54,
        '7': 55,
        '8': 56,
        '9': 57,
        'a': 65,
        'b': 66,
        'c': 67,
        'd': 68,
        'e': 101,
        'f': 70,
        'g': 71,
        'h': 72,
        'i': 73,
        'j': 74,
        'k': 75,
        'l': 76,
        'm': 77,
        'n': 78,
        'o': 79,
        'p': 80,
        'q': 81,
        'r': 82,
        's': 83,
        't': 84,
        'u': 85,
        'v': 86,
        'w': 87,
        'x': 88,
        'y': 89,
        'z': 90,
        'numpad0': 96,
        'numpad1': 97,
        'numpad2': 98,
        'numpad3': 99,
        'numpad4': 100,
        'numpad6': 102,
        'numpad7': 103,
        'numpad8': 104,
        'numpad9': 105,
        'Multiply': 106,
        'Plus': 107,
        'Minut': 109,
        'Dot': 110,
        'Slash1': 111,
        'F1': 112,
        'F2': 113,
        'F3': 114,
        'F4': 115,
        'F5': 116,
        'F6': 117,
        'F7': 118,
        'F8': 119,
        'F9': 120,
        'F10': 121,
        'F11': 122,
        'F12': 123,
        'equal': 187,
        'Coma': 188,
        'Slash': 191,
        'Backslash': 220
    };
})(keyboard || (keyboard = {}));
