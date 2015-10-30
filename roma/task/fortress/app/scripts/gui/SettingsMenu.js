var SettingsMenu = (function () {
    function SettingsMenu() {
        this.CSS_ID = {
            MAP_LIST_DIV: "#maps"
        };
        //default selected map
        this.levelName = Maps.priates.name;
        this.view = '<div id="mapSelector"><h1 style="text-align: center">Select a Map</h1><p> <div class="row-fluid" style="text-align: center"><ul class="thumbnails"></p>';
        for (var map in Maps) {
            this.view += this.addMapItem(Maps[map], map);
        }
        this.view += '</ul></div><p style="text-align: center"> All map images were sourced from <a href="http://wmdb.org/">http://wmdb.org/</a></p></div>';
    }

    SettingsMenu.prototype.addMapItem = function (map, name) {
        var item = '<li class="span4" style="width:30%"><a href="#" class="thumbnail" id={1}>' + '<img style="width: 160px; height: 80px;" src={0}> </a></li>';
        //item = item.format(AssetManager.getImage(map.smallImage).src, name);
        return item;
    };
    SettingsMenu.prototype.bind = function (callback) {
        var _this = this;
        $('a.thumbnail').click(function () {
            var levelId = $(this).attr('id');
            $('a.thumbnail').css({"background": "white"});
            $(this).css({"background": "yellow"});
            _this.levelName = levelId;
            Game.map = new Map(Maps[levelId]);
            callback();
        });
    };
    SettingsMenu.prototype.getLevelName = function () {
        return this.levelName;
    };
    SettingsMenu.prototype.getView = function () {
        return this.view;
    };
    return SettingsMenu;
})();
