var AssetManager;
(function(AssetManager){

    var imagesToBeLoaded = [ "assets/images/stick.png" ];

    AssetManager.numAssetsLoaded = 0;
    AssetManager.images = [];
    AssetManager.sounds = [];

    function isReady() {
        return (AssetManager.numAssetsLoaded) == imagesToBeLoaded.length;
    };
    AssetManager.isReady = isReady;

    function getPerAssetsLoaded() {
        return ((AssetManager.numAssetsLoaded) / (imagesToBeLoaded.length)) * 100;
    };
    AssetManager.getPerAssetsLoaded = getPerAssetsLoaded;

    function getImage(s) {
        return AssetManager.images[s];
    };
    AssetManager.getImage = getImage;

    function loadImages(sources) {
        var images = [];
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for (var src in sources) {
            numImages++;
        }
        for (var src in sources) {
            var name = sources[src].match("[a-z,A-Z,0-9]+[.]png")[0].replace(".png", "");
            if (images[name] == null) {
                images[name] = new Image();
                images[name].onload = function () {
                    //console.log(" Image " + this.src + " loaded sucessfully ");
                    if (++loadedImages >= numImages) {
                        for (var img in images) {
                            AssetManager.images[img] = images[img];
                        }
                    }
                    AssetManager.numAssetsLoaded++;
                };
            }
            else {
                console.error("Image " + sources[src] + " has the same name as" + images[name].src);
            }
            images[name].src = sources[src];
        }
    };
    AssetManager.loadImages = loadImages;

    function addSpritesDefToLoadList() {
        for (var sprite in Sprites.worms) {
            imagesToBeLoaded.push("assets/images/" + Sprites.worms[sprite].imageName + ".png");
        }
        for (var sprite in Sprites.weaponIcons) {
            imagesToBeLoaded.push("assets/images/" + Sprites.weaponIcons[sprite].imageName + ".png");
        }
        for (var sprite in Sprites.weapons) {
            imagesToBeLoaded.push("assets/images/" + Sprites.weapons[sprite].imageName + ".png");
        }
        for (var sprite in Sprites.particleEffects) {
            imagesToBeLoaded.push("assets/images/" + Sprites.particleEffects[sprite].imageName + ".png");
        }
        for (var map in Maps) {
            imagesToBeLoaded.push("assets/images/" + Maps[map].terrainImage + ".png");
            imagesToBeLoaded.push("assets/images/" + Maps[map].smallImage + ".png");
        }
    };
    AssetManager.addSpritesDefToLoadList = addSpritesDefToLoadList;

    function loadAssets() {
        addSpritesDefToLoadList();
        loadImages(imagesToBeLoaded);
    };
    AssetManager.loadAssets = loadAssets;

})(AssetManager || (AssetManager = {}));
