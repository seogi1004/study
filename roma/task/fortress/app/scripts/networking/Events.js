var Events;
(function (Events) {
    // All event names have been shorted to reduce packet size
    Events.lobby = {
        CREATE_GAME_LOBBY: "createLob",
        UPDATE_USER_COUNT: "newConnect",
        GOOGLE_PLUS_LOGIN: "gp"
    };
    Events.gameLobby = {
        PLAYER_JOIN: "pJoin",
        START_GAME_FOR_OTHER_CLIENTS: "startForOther",
        START_GAME_HOST: "startG",
        PLAYER_DISCONNECTED: "pd"
    };
    Events.client = {
        UPDATE_ALL_GAME_LOBBIES: "updateLobs",
        ASSIGN_USER_ID: "assignId",
        ACTION: "a",
        UPDATE: "u",
        GET_GAME_TIME: "t",
        CURRENT_WORM_ACTION: "wa"
    };
    Events.server = {};
})(Events || (Events = {}));

if (typeof exports != 'undefined') {
    (module).exports = Events;
}
