var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

var NetworkTimer = (function (_super) {
    __extends(NetworkTimer, _super);
    function NetworkTimer(gameTurnTimeDuraction) {
        _super.call(this, gameTurnTimeDuraction);
        this.packetRateTimer = new Timer(1000);
        this.currentServerTime = Date.now();
    }

    NetworkTimer.prototype.update = function () {
        this.packetRateTimer.update();
        _super.update();

        if (this.packetRateTimer.hasTimePeriodPassed()) {
            Client.socket.emit(Events.client.GET_GAME_TIME, '', function (data) {
                this.currentServerTime = data;
            });
        }
    }

    NetworkTimer.prototype.getTimeNow = function () {
        return this.currentServerTime;
    }

    return NetworkTimer;
})(Timer);
