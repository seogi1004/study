try {
    var check = require('validator').check;
    var sanitize = require('validator').sanitize;
    var curl = require('node-curl');
    //This is some mega hacky stuff, but its the only way I can get around a very strange typescript static anaylse error which
    // prevents the project from compling.
    eval("var GameLobby = require('./GameLobby');var Events = require('./Events'); " +
        " var ServerSettings = require('./ServerSettings'); var ServerUtilies = require('./ServerUtilies'); " +
        "var Util = require('util');var server = require('./Server'); var server = require('./server'); ");
} catch (error) { }

var Lobby = (function () {
    function Lobby() {
        this.userCount = 0;
        this.gameLobbies = {};
        this.client_GameLobby = new GameLobby(null, null);
    }

    Lobby.prototype.onConnection = function (socket, io) {
        this.userCount++;
        if (this.userCount > this.highestUserCount) {
            this.highestUserCount = this.userCount;
        }
        var token = ServerUtilies.createToken() + this.userCount;
        socket.set('userId', token, function () {
            io.log.info(Util.format("User connected and assigned ID " + token + " from " + socket.handshake.address.address));
        });
        socket.emit(Events.client.ASSIGN_USER_ID, token);
        io.sockets.emit(Events.lobby.UPDATE_USER_COUNT, this.userCount);
        // When someone makes a connection send them the lobbie
        socket.emit(Events.client.UPDATE_ALL_GAME_LOBBIES, JSON.stringify(this.getGameLobbies()));
    };
    Lobby.prototype.onDisconnection = function (socket, io) {
        socket.on('disconnect', function () {
            ServerUtilies.info(io, " User exit ");
            this.userCount--;
            io.sockets.emit(Events.lobby.UPDATE_USER_COUNT, this.userCount);
            this.server_removePlayerFormCurrentLobby(socket);
        });
    };
    Lobby.prototype.server_removePlayerFormCurrentLobby = function (socket) {
        socket.get('userId', function (err, userId) {
            socket.get('gameLobbyId', function (err, gameLobbyId) {
                if (gameLobbyId) {
                    socket.broadcast.to(gameLobbyId).emit(Events.gameLobby.PLAYER_DISCONNECTED, userId);
                    socket.leave(gameLobbyId);
                    if (this.gameLobbies[gameLobbyId]) {
                        this.gameLobbies[gameLobbyId].remove(userId)
                        //Checks if there is anyone left in the room
                        if (this.gameLobbies[gameLobbyId].isLobbyEmpty()) {
                            //Delete gameb lobby
                            delete this.gameLobbies[gameLobbyId];
                            //Update all clients that this lobby is now closed.
                            io.sockets.emit(Events.client.UPDATE_ALL_GAME_LOBBIES, JSON.stringify(this.getGameLobbies()));
                        }
                    }
                }
            });
        });
    };
    Lobby.prototype.server_init = function (socket, io) {
        socket.on(Events.lobby.CREATE_GAME_LOBBY, function (data){

            //If the user was connected to another room disconnect them
            this.server_removePlayerFormCurrentLobby(socket);

            data.nPlayers = sanitize(data.nPlayers).xss();
            data.name = sanitize(data.name).xss();
            data.name = data.name.substring(0, 20);
            data.mapName = sanitize(data.mapName).xss();

            // Check the user input
            if (data.nPlayers > ServerSettings.MAX_PLAYERS_PER_LOBBY || data.nPlayers < 2) {
                data.nPlayers = 4;
            }

            //Once a new game lobby has been created, add the user who created it.

            socket.get('userId', function (err, userId) {
                socket.get('googleUserId', function (err, googleUserId) {

                    io.log.info(Util.format("@ Create lobby by user with ID [%s] with name  [%s] using map ", data.name, googleUserId, data.mapName));
                    var newGameLobby = this.server_createGameLobby(data.name, parseInt(data.nPlayers), data.mapName);
                    newGameLobby.join(userId, googleUserId, socket);


                    console.log(" Lobby list " + this.gameLobbies);
                    io.sockets.emit(Events.client.UPDATE_ALL_GAME_LOBBIES, JSON.stringify(this.getGameLobbies()));
                });

            });
        });

        // Google plus login
        socket.on(Events.lobby.GOOGLE_PLUS_LOGIN, function (googleAuthToken) {

        });

        // PLAYER_JOIN Game lobby
        socket.on(Events.gameLobby.PLAYER_JOIN, function (gamelobbyId) {

            //If the user was connected to another room disconnect them
            this.server_removePlayerFormCurrentLobby(socket);

            io.log.info(Util.format("@ Events.client.JOIN_GAME_LOBBY " + gamelobbyId));

            // Get the usersId
            socket.get('userId', function (err, userId) {
                socket.get('googleUserId', function (err, googleUserId) {
                    var gamelobby = this.gameLobbies[gamelobbyId];
                    gamelobby.join(userId, googleUserId, socket);

                    io.sockets.emit(Events.client.UPDATE_ALL_GAME_LOBBIES, JSON.stringify(this.getGameLobbies()));
                });
            });

        });

        socket.on(Events.gameLobby.START_GAME_FOR_OTHER_CLIENTS, function (data) {

            socket.get('userId', function (err, userId) {

                socket.get('gameLobbyId', function (err, gameLobbyId) {

                    //this.gameLobbies[gameLobbyId].currentPlayerId = userId;
                    io.log.info(Util.format("@ Events.gameLobby.START_GAME_FOR_OTHER_CLIENTS " + userId + " for lobby " + gameLobbyId + "   " + data));
                    socket.broadcast.to(gameLobbyId).emit(Events.gameLobby.START_GAME_FOR_OTHER_CLIENTS, data);
                });
            });

        });

        /************************************************************
         *   Game sync event bindings
         ************************************************************/

        socket.on(Events.client.UPDATE, function (data) {

            socket.get('userId', function (err, userId) {
                socket.get('gameLobbyId', function (err, gameLobbyId){
                    io.log.info(Util.format("@ UPDATE   " + data));
                    socket.broadcast.to(gameLobbyId).emit(Events.client.UPDATE, data);
                });
            });

        });


        socket.on(Events.client.ACTION, function (data)  {

            socket.get('userId', function (err, userId)  {

                socket.get('gameLobbyId', function (err, gameLobbyId)  {
                    io.log.info(Util.format("@ Events.gameLobby.UPDATE from userId " + userId + " for lobby " + gameLobbyId + "   " + data));
                    socket.broadcast.to(gameLobbyId).emit(Events.client.ACTION, data);
                });
            });
        });

        // This is done to make the action packets smaller
        socket.on(Events.client.CURRENT_WORM_ACTION, function (data)  {

            socket.get('userId', function (err, userId) {

                socket.get('gameLobbyId', function (err, gameLobbyId) {
                    io.log.info(Util.format("@ Events.client.CURRENT_WORM_ACTION" + userId + " for lobby " + gameLobbyId + "   " + data));
                    socket.broadcast.to(gameLobbyId).emit(Events.client.CURRENT_WORM_ACTION, data);
                });
            });

        });
    };
    Lobby.prototype.client_init = function () {
        this.menu = new LobbyMenu(this)

        // Somthing didnt go right with connnecting to the server so exit
        if (!Client.connectionToServer(Settings.NODE_SERVER_IP, Settings.NODE_SERVER_PORT)) {
            return false;
        }

        GameInstance.gameType = Game.types.ONLINE_GAME;

        // Create lobby
        Client.socket.on(Events.lobby.UPDATE_USER_COUNT, function (userCount) {
            Logger.log("Events.lobby.NEW_USER_CONNECTED " + userCount);
            this.userCount = userCount;
            this.menu.updateUserCountUI(this.userCount);
        });

        //Bind events
        Client.socket.on(Events.client.UPDATE_ALL_GAME_LOBBIES, function (data) {
            Logger.debug(" Events.client.UPDATE_ALL_GAME_LOBBIES " + data);
            var gameLobbyList = JSON.parse(data);
            var updatedGameLobbies = {};
            for (var gameLobby in gameLobbyList) {
                updatedGameLobbies[gameLobby] = (Utilies.copy(new GameLobby(null, null), gameLobbyList[gameLobby]));
            }

            this.gameLobbies = updatedGameLobbies;
            this.menu.updateLobbyListUI(this);

        });

        this.client_GameLobby.client_init();
    };

    Lobby.prototype.getGameLobbies = function () {
        return this.gameLobbies;
    }
    Lobby.prototype.client_createGameLobby = function (name, numberOfPlayers, mapName) {
        this.menu.displayMessage(" Waiing on more players.... ");
        Client.socket.emit(Events.lobby.CREATE_GAME_LOBBY, {
            "name": name,
            "nPlayers": numberOfPlayers,
            "mapName": mapName
        });
    };
    // Creates the gamelobby object on the server
    Lobby.prototype.server_createGameLobby = function (name, numberOfPlayers, mapName) {
        var newGameLobby = new GameLobby(name, numberOfPlayers, mapName);
        newGameLobby.server_init();
        // lobbies are indexed by their unqine token
        this.gameLobbies[newGameLobby.id] = newGameLobby;
        return this.gameLobbies[newGameLobby.id];
    };
    Lobby.prototype.client_joinGameLobby = function (lobbyId) {
        this.menu.displayMessage(" Waiting on more players.... ");
        Client.socket.emit(Events.gameLobby.PLAYER_JOIN, lobbyId);
    };
    Lobby.prototype.client_joinQuickGame = function () {
        for (var i in this.gameLobbies) {
            var lob = this.gameLobbies[i];
            if (lob.isFull() == false) {
                if (lob.contains(Client.id)) {
                    Notify.display("Your already join the lobby", "Still waiting for players");
                }
                else {
                    this.menu.displayMessage(" Waiting on more players.... ");
                    Client.socket.emit(Events.gameLobby.PLAYER_JOIN, lob.id);
                    return true;
                }
            }
        }
        //If it doesn't find any empty lobby for the user it creates one.
        this.client_createGameLobby("Default QuickGame", 2, Maps.smallCastle.name);
    }
    return Lobby;
})();

if (typeof exports != 'undefined') {
    (module).exports = Lobby;
}
