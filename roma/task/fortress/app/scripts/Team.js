var Team = (function () {
    function Team(playerId) {
        this.color = Utilies.pickUnqine(["#FA6C1D", "#12AB00", "#B46DD2", "#B31A35", "#23A3C6", "#9A4C44"], "colors");
        //Using strings instead of spriteDef to make it easier to sync across clients
        this.graveStone = Utilies.pickUnqine(["grave1", "grave2", "grave3", "grave4", "grave5", "grave6"], "gravestones");
        this.name = "Team " + Team.teamCount;
        this.teamId = playerId;
        Team.teamCount++;
        this.weaponManager = new WeaponManager();
        this.currentWorm = 0;
        this.initalNumberOfWorms = 4;
        this.worms = new Array(this.initalNumberOfWorms);
        for (var i = 0; i < this.initalNumberOfWorms; i++) {
            var tmp = Game.map.getNextSpawnPoint();
            this.worms[i] = (new Worm(this, tmp.x, tmp.y));
        }
    }

    Team.prototype.getTeamNetData = function () {
        var packet = {};
        for (var w in this.worms) {
            packet[w] = this.worms[w].getWormNetData();
        }
        return packet;
    };
    Team.prototype.setTeamNetData = function (packetStream) {
        for (var w in packetStream) {
            this.worms[w].setWormNetData(packetStream[w]);
        }
    };
    Team.prototype.getPercentageHealth = function () {
        var totalHealth = 0;
        for (var worm in this.worms) {
            totalHealth += this.worms[worm].health;
        }
        return totalHealth / this.initalNumberOfWorms;
    };
    Team.prototype.areAllWormsDead = function () {
        for (var worm in this.worms) {
            if (this.worms[worm].isDead == false) {
                return false;
            }
        }
        return true;
    };
    Team.prototype.getCurrentWorm = function () {
        return this.worms[this.currentWorm];
    };
    Team.prototype.nextWorm = function () {
        if (this.currentWorm + 1 == this.worms.length) {
            this.currentWorm = 0;
        }
        else {
            this.currentWorm++;
        }
        if (this.worms[this.currentWorm].isDead) {
            this.nextWorm();
        }
        else {
            this.worms[this.currentWorm].activeWorm();
        }
    };
    Team.prototype.getWeaponManager = function () {
        return this.weaponManager;
    };
    Team.prototype.setCurrentWorm = function (wormIndex) {
        this.currentWorm = wormIndex;
    };
    Team.prototype.getWorms = function () {
        return this.worms;
    };
    //Sets all worms sprites to winning state
    Team.prototype.celebrate = function () {
        for (var w in this.worms) {
            var worm = this.worms[w];
            worm.setSpriteDef(Sprites.worms.weWon, true);
        }
        GameInstance.camera.panToPosition(Physics.vectorMetersToPixels(this.worms[0].body.GetPosition()));
        AssetManager.getSound("victory").play(1, 15);
        AssetManager.getSound("Ireland").play(1, 16);
    };
    Team.prototype.update = function () {
        var cachedLenght = this.worms.length;
        for (var i = 0; i < cachedLenght; i++) {
            this.worms[i].update();
        }
    };
    Team.prototype.draw = function (ctx) {
        var cachedLenght = this.worms.length;
        for (var i = 0; i < cachedLenght; i++) {
            this.worms[i].draw(ctx);
        }
    };
    Team.teamCount = 0;
    return Team;
})();

var TeamDataPacket = (function () {
    function TeamDataPacket(team) {
        this.graveStone = team.graveStone;
        this.name = team.name;
        this.color = team.color;
        this.wormsDataPacket = [];
        for (var w in team.worms) {
            this.wormsDataPacket.push(new WormDataPacket(team.worms[w]));
        }
    }

    TeamDataPacket.prototype.override = function (team) {
        team.name = this.name;
        team.graveStone = this.graveStone;
        team.color = this.color;
        for (var w in this.wormsDataPacket) {
            this.wormsDataPacket[w].override(team.getWorms()[w]);
        }
    };
    return TeamDataPacket;
})();
