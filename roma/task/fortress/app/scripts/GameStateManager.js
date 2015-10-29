var GameStateManager = (function(){

    function GameStateManager(){
        this.nextTurnTrigger = false;
        this.currentPlayerIndex = 0;
        this.players = [];
        this.isStarted = false;
        this.physicWorldSettled = false;
    }

    GameStateManager.prototype.init = function(players){
        this.players = players;
        this.isStarted = true;
    }

    GameStateManager.prototype.tiggerNextTurn = function(){
        GameInstance.miscellaneousEffects.stopAll();
        this.nextTurnTrigger = true;
    }
    GameStateManager.prototype.timerTiggerNextTurn = function(){
        GameInstance.wormManager.deactivedAllNonTimeBasedWeapons();
        this.tiggerNextTurn()
    }

    GameStateManager.prototype.hasNextTurnBeenTiggered = function(){
        return this.nextTurnTrigger;
    }

    GameStateManager.prototype.readyForNextTurn = function(){
        if (this.nextTurnTrigger) {
            if (GameInstance.particleEffectMgmt.areAllAnimationsFinished() && GameInstance.wormManager.areAllWormsReadyForNextTurn()) {
                this.nextTurnTrigger = false;
                return true;
            }
        }
        return false;
    }

    GameStateManager.prototype.getCurrentPlayer = function(){
        return this.players[this.currentPlayerIndex];
    }

    GameStateManager.prototype.nextPlayer = function(){
        this.nextTurnTrigger = false;
        if (this.currentPlayerIndex + 1 == this.players.length) {
            this.currentPlayerIndex = 0;
        }
        else {
            this.currentPlayerIndex++;
        }
        if (this.getCurrentPlayer().getTeam().getPercentageHealth() <= 0) {
            return null;
        }
        this.getCurrentPlayer().getTeam().nextWorm();
        GameInstance.camera.cancelPan();
        GameInstance.camera.panToPosition(Physics.vectorMetersToPixels(this.getCurrentPlayer().getTeam().getCurrentWorm().body.GetPosition()));
        return this.getCurrentPlayer().id;
    }

    GameStateManager.prototype.checkForWinner = function(){
        var playersStillLive = [];
        for (var i = this.players.length - 1; i >= 0; --i) {
            if (this.players[i].getTeam().areAllWormsDead() == false) {
                playersStillLive.push(this.players[i]);
            }
        }
        if (playersStillLive.length == 1) {
            return playersStillLive[0];
        }
        return null;
    }

    return GameStateManager;

})();