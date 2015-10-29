var GameInstance;
$(document).ready(function () {
    var startMenu = new StartMenu();
    GameInstance = new Game();
    AssetManager.loadAssets();

    startMenu.onGameReady(function () {
        if (GameInstance.state.isStarted == false) {
            GameInstance.start();
        }
        function gameloop() {
            Graphics.stats.update();
            GameInstance.step();
            GameInstance.update();
            GameInstance.draw();
            window.requestAnimationFrame(gameloop);
        }

        gameloop();
    });
});
