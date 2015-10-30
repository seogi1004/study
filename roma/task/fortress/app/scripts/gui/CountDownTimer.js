var CountDownTimer = (function () {
    function CountDownTimer() {
        //Choice a type of timer based on where we are playing online or not
        if (GameInstance.gameType == Game.types.ONLINE_GAME) {
            this.timer = new NetworkTimer(Settings.PLAYER_TURN_TIME);
        }
        else {
            this.timer = new Timer(Settings.PLAYER_TURN_TIME);
        }
        this.previousSecound = this.timer.timePeriod;
        $('#turnTimeCounter').hide();
    }

    CountDownTimer.prototype.show = function () {
        $('#turnTimeCounter').show();
    };
    CountDownTimer.prototype.update = function () {
        if (Settings.DEVELOPMENT_MODE)
            this.timer.pause();
        this.timer.update();
        var timeLeft = Math.floor(this.timer.getTimeLeft() / 1000);
        // Dont update the HTML element while 
        if (timeLeft != this.previousSecound && timeLeft >= 0) {
            if (timeLeft == 5) {
                AssetManager.getSound("hurry").play();
            }
            this.previousSecound = timeLeft;
            $('#turnTimeCounter').html(timeLeft);
            if (timeLeft < Settings.TURN_TIME_WARING && timeLeft >= 0) {
                $('#turnTimeCounter').css("background", "red");
                AssetManager.getSound("TIMERTICK").play(0.3);
            }
            else {
                $('#turnTimeCounter').css("background", "black");
            }
        }
        if (this.timer.hasTimePeriodPassed(false)) {
            this.timer.pause();
            GameInstance.state.timerTiggerNextTurn();
        }
    };
    return CountDownTimer;
})();
