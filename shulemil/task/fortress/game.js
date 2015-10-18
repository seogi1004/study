/**
 * Created by Mil on 2015-10-17.
 */
(function (_w) {
    "use strict";

    var publisher = {
        subscribers: {
            any: []
        },
        on: function (type, fn, context) {
            var t = type || 'any',
                f = typeof fn === 'function' ? fn : context[fn];

            if (typeof this.subscribers[t] === 'undefined') {
                this.subscribers[t] = [];
            }

            this.subscribers[t].push({ fn: f, context: context || this });
        },
        remove: function () { },
        fire: function (type, publication) {
            this.visitSubscribers('publish', type, publication);
        },
        visitSubscribers: function (action, type, arg, context) {
            var t = type || 'any',
                subscribers = this.subscribers[t],
                i, max = subscribers ? subscribers.length : 0;
            for (i = 0; i < max; i += 1) {
                if (action === 'publish') {
                    subscribers[i].fn.call(subscribers[i].context, arg);
                } else {

                }
            }
        }
    };

    function makePublisher(o) {
        var i;
        for (i in publisher) {
            if (publisher.hasOwnProperty(i) &&
                typeof publisher[i] === 'function') {
                o[i] = publisher[i];
            }
        }
        o.subscribers = { any: [] };
    }

    var Player = (function () {
        var id = 0;
        return function (name, src) {
            this.name = name;
            this.uid = id++; // UID 생성.
            this.weight = 10;
            this.width = 27;
            this.groundHit = false;
            this.character = new createjs.Bitmap(src || './assets/tank.png');
            this.character.x = Math.floor(Math.random() * 450);
            this.character.y = 0;

            this.fire('newplayer', this);

            game.on('update', 'updatePosition', this);
        };
    }());

    Player.prototype.play = function (e) {
        var c = this.character;
        switch (e.keyCode) {
            case 37:
                if (c.scaleX < 0) {
                    c.scaleX = 1;
                    c.x -= this.width
                }
                c.x -= 5;
                break;
            case 39:
                if (c.scaleX > 0) {
                    c.scaleX = -1;
                    c.x += this.width;
                }
                c.x += 5;
                break;
            default:
                break;
        }

        this.fire('play', this);
    };
    Player.prototype.updatePosition = function (g) {
        var c = this.character, r = g.getDirection(), s = g.getScalar();
        var ground = container.ground;

        if (!this.groundHit) {
            c.x += Math.cos(r) * s;
            c.y += Math.sin(r) * (s + this.weight);
        }
        this.groundHit = ground.hitTest(c.x + this.width - ground.x, ground.y - c.y)
    };

    var game = {
        keys: [],
        turn: 0,
        vGravity: new Vector(0, 5), //중력 벡터
        vWin: new Vector(), // 바람 벡터
        addPlayer: function (player) {
            var uid = player.uid;
            this.keys[uid] = player;
            this.turn = uid;
            this.fire('add', player);
        },
        changeTurn: function () {
            this.turn += 1;
            if (this.keys.length == this.turn) { this.turn = 0 }
        },
        pUpdate: function () {
            var player = this.keys,
                i, max = player.length;

            for (i = 0; i < max; i += 1) {
                this.fire('update', this.vGravity);
            }
        },
        handleKeypress: function (event) {
            var e = event || _w.event; // IE
            // key 에 따른. 이벤트 처리.
            if (e.which === 13) {
                game.changeTurn();
            } else {
                game.keys[game.turn].play(e);
            }
        },
        handlePlay: function () {
            console.log("game: handle play");
        }
    };

    var container = {
        stage: new createjs.Stage("mainCanvas"),
        ground: null,
        resPrint: function () {
            console.log('aa')
        },
        addChild: function (player) {
            container.stage.addChild(player.character);
        },
        handleTick: function (e) {
            container.fire('playerUpdate', '');
            container.stage.update();
        },
        init: function () {
            this.ground = new createjs.Bitmap('./assets/grass.png');
            this.ground.x = 250;
            this.ground.y = 300;
            this.stage.addChild(this.ground );

            createjs.Ticker.addEventListener("tick", this.handleTick);
        }
    };

    makePublisher(Player.prototype);
    makePublisher(game);
    makePublisher(container);

    Player.prototype.on("newplayer", "addPlayer", game);
    Player.prototype.on("play", "handlePlay", game);

    game.on('add', 'addChild', container);

    container.on('playerUpdate', 'pUpdate', game);
    container.init();

    window.onkeydown = game.handleKeypress;

    _w.p1 = new Player('user1');
    _w.p2 = new Player('user2');
    //_w.game = game;
}(window));