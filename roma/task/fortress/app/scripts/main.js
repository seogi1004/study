var GameInstance;
$(document).ready(function () {

    console.log("ready");

    Settings.getSettingsFromUrl();

    if (!Settings.RUN_UNIT_TEST_ONLY) {

        var startMenu = new StartMenu();
        GameInstance = new Game();
        AssetManager.loadAssets();

        startMenu.onGameReady(function () {

            startMenu.hide();

            if (GameInstance.state.isStarted == false) {
                GameInstance.start();
                console.log("start");
            }

            function gameloop() {
                if (Settings.DEVELOPMENT_MODE)
                    Graphics.stats.update();

                GameInstance.step();
                GameInstance.update();
                GameInstance.draw();
                console.log("update");
                window.requestAnimationFrame(gameloop);
            }

            gameloop();

        });
    }
});
