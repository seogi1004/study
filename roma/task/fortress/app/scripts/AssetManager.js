var AssetManager;
(function(AssetManager){

    var numAssetsLoaded = 0;
    var imagesToBeLoaded = [];
    var images = [];

    function isReady() {
        return numAssetsLoaded == imagesToBeLoaded.length;
    }
    AssetManager.isReady = isReady;

    function getPerAssetsLoaded() {
        return (numAssetsLoaded / imagesToBeLoaded.length) * 100;
    }
    AssetManager.getPerAssetsLoaded = getPerAssetsLoaded;

    function getImage(s) {
        return images[s];
    }
    AssetManager.getImage = getImage;

    function loadImages(sources) {
        var tempImages = [];
        var loadedImages = 0;
        var numImages = 0;
        for (var src in sources){
            numImages++;
        }
        for (var src in sources){
            var name = sources[src].match("[a-z,A-Z,0-9]+[.]png")[0].replace(".png", "");
            if (images[name] == null){
                images[name] = new Image();
                images[name].onload = function () {
                    console.log(" Image " + this.src + " loaded sucessfully ");
                    if (++loadedImages >= numImages) {
                        for (var img in tempImages) {
                            images[img] = tempImages[img];
                        }
                    }
                    numAssetsLoaded++;
                }
            } else {
                console.error("Image " + sources[src] + " has the same name as" + images[name].src);
            }
            images[name].src = sources[src];
        }
    }

    function addSpritesDefToLoadList() {
        imagesToBeLoaded.push("assets/images/sky.png");
        imagesToBeLoaded.push("assets/images/grass.png");
        imagesToBeLoaded.push("assets/images/tank.png");
        imagesToBeLoaded.push("assets/images/castles.png");
    }

    function loadAssets() {
        addSpritesDefToLoadList();
        loadImages(imagesToBeLoaded);
    }
    AssetManager.loadAssets = loadAssets;

})(AssetManager || (AssetManager = {}));
