var StartMenu = (function(){

    function StartMenu(){

    }

    StartMenu.prototype.hide = function(){
        $('#startMenu').remove();
    }

    StartMenu.prototype.onGameReady = function(callback){
        var loading = setInterval(function () {
            if (AssetManager.getPerAssetsLoaded() == 100) {
                clearInterval(loading);
                callback();
            }
        }, 2)
    }

    return StartMenu;

})();