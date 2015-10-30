var Settings;
(function (Settings) {
    //Game vars
    Settings.PLAYER_TURN_TIME = 45 * 1000; // 60 secounds
    Settings.TURN_TIME_WARING = 5; // after 10 secounds warn player they are running out of time
    //General game settings
    Settings.SOUND = false;
    //Server details
    Settings.NODE_SERVER_IP = '96.126.111.211';
    Settings.LEADERBOARD_API_URL = 'http://96.126.111.211';
    Settings.NODE_SERVER_PORT = '8080';
    // development vars
    Settings.DEVELOPMENT_MODE = true;
    Settings.LOG = true;
    //When I want to build the manifest file using 
    // http://westciv.com/tools/manifestR/
    Settings.BUILD_MANIFEST_FILE = false;
    Settings.REMOTE_ASSERT_SERVER = "../"; //"../college/fyp/"
    Settings.API_KEY = "AIzaSyA1aZhcIhRQ2gbmyxV5t9pGK47hGsiIO7U";
    Settings.PHYSICS_DEBUG_MODE = false;
    Settings.RUN_UNIT_TEST_ONLY = !true;
    Settings.NETWORKED_GAME_QUALITY_LEVELS = {
        HIGH: 0,
        MEDIUM: 1,
        LOW: 2
    };
    Settings.NETWORKED_GAME_QUALITY = Settings.NETWORKED_GAME_QUALITY_LEVELS.HIGH;

    //Pasers commandline type arguments from the page url like this ?argName=value
    function getSettingsFromUrl() {
        var argv = getUrlVars();
        var commands = ["physicsDebugDraw", "devMode", "unitTest", "sound"];
        if (argv[commands[0]] == "true") {
            Settings.PHYSICS_DEBUG_MODE = true;
        }
        if (argv[commands[1]] == "true") {
            Settings.DEVELOPMENT_MODE = true;
        }
        if (argv[commands[2]] == "true") {
            var testWindow = window.open('test.html', '|UnitTests', 'height=1000,width=700,top:100%');
            testWindow.location.reload(); // This is so if the window was left open it refreshs
        }
        if (argv[commands[3]] == "false") {
            Settings.SOUND = false;
        }
        console.log(" Notice: argv are as follows " + commands);
    }
    Settings.getSettingsFromUrl = getSettingsFromUrl;

    function getUrlVars() {
        var vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
            return true;
        });
        return vars;
    }

    Settings.getUrlVars = getUrlVars;
})(Settings || (Settings = {}));
