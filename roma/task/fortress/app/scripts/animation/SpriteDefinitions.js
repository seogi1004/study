var Sprites;
(function (Sprites) {
    Sprites.weaponIcons = {
        holyGernade: { imageName: "iconhgrenade" },
        gernade: { imageName: "icongrenade" },
        drill: { imageName: "drill" },
        dynamite: { imageName: "icondynamite" },
        ninjaRope: { imageName: "iconrope" },
        jetPack: { imageName: "iconjetpack" },
        shotgun: { imageName: "iconshotgun" },
        minigun: { imageName: "iconminigun" },
        bazooka: { imageName: "iconbazooka" }
    };
    Sprites.weapons = {
        jetPackFlamesDown: {
            imageName: "wjetflmd",
            frameY: 0,
            frameCount: 6,
            msPerFrame: 100
        },
        jetPackFlamesSide: {
            imageName: "wjetflmb",
            frameY: 0,
            frameCount: 6,
            msPerFrame: 60
        },
        holyGernade: {
            imageName: "hgrenade",
            frameY: 0,
            frameCount: 32,
            msPerFrame: 10
        },
        missle: {
            imageName: "missile",
            frameY: 9,
            frameCount: 32,
            msPerFrame: 10
        },
        gernade: {
            imageName: "grenade",
            frameY: 0,
            frameCount: 32,
            msPerFrame: 10
        },
        dynamite: {
            imageName: "dynamite",
            frameY: 0,
            frameCount: 129,
            msPerFrame: 50
        },
        redTarget: {
            imageName: "crshairr",
            frameY: 0,
            frameCount: 32,
            msPerFrame: 50
        },
        arrow: {
            imageName: "arrowdnb",
            frameY: 0,
            frameCount: 30,
            msPerFrame: 10
        },
        ninjaRopeTip: {
            imageName: "ropecuff",
            frameY: 0,
            frameCount: 112,
            msPerFrame: 10
        }
    };
    // These are defined frames for said animations
    Sprites.worms = {
        idle1: {
            imageName: "wselbak",
            frameY: 0,
            frameCount: 12,
            msPerFrame: 200
        },
        drilling: {
            imageName: "wdrill",
            frameY: 0,
            frameCount: 4,
            msPerFrame: 100
        },
        walking: {
            imageName: "wwalk",
            frameY: 0,
            frameCount: 15,
            msPerFrame: 50
        },
        falling: {
            imageName: "wfall",
            frameY: 0,
            frameCount: 2,
            msPerFrame: 100
        },
        jumpBegin: {
            imageName: "wflyup",
            frameY: 0,
            frameCount: 2,
            msPerFrame: 100
        },
        takeOutHolyGernade: {
            imageName: "whgrlnk",
            frameY: 0,
            frameCount: 10,
            msPerFrame: 50
        },
        takeOutDynamite: {
            imageName: "wdynlnk",
            frameY: 0,
            frameCount: 10,
            msPerFrame: 50
        },
        aimHolyGernade: {
            imageName: "wthrhgr",
            frameY: 30 / 2,
            frameCount: 32,
            msPerFrame: 100
        },
        takeOutDrill: {
            imageName: "wdrllnk",
            frameY: 0,
            frameCount: 13,
            msPerFrame: 60
        },
        die: {
            imageName: "wdie",
            frameY: 0,
            frameCount: 60,
            msPerFrame: 5
        },
        weWon: {
            imageName: "wwinner",
            frameY: 0,
            frameCount: 14,
            msPerFrame: 25
        },
        hurt: {
            imageName: "wbrth2",
            frameY: 0,
            frameCount: 13,
            msPerFrame: 150
        },
        takeOutGernade: {
            imageName: "wgrnlnk",
            frameY: 0,
            frameCount: 10,
            msPerFrame: 50
        },
        takeNinjaRope: {
            imageName: "wbatlnk",
            frameY: 0,
            frameCount: 10,
            msPerFrame: 50
        },
        aimNinjaRope: {
            imageName: "wbataim",
            frameY: 32 / 2,
            frameCount: 32,
            msPerFrame: 50
        },
        aimGernade: {
            imageName: "wthrgrn",
            frameY: 30 / 2,
            frameCount: 32,
            msPerFrame: 100
        },
        takeOutJetPack: {
            imageName: "wjetlnk",
            frameY: 0,
            frameCount: 10,
            msPerFrame: 50
        },
        defualtJetPack: {
            imageName: "wjetbak",
            frameY: 0,
            frameCount: 10,
            msPerFrame: 50
        },
        aimingShotgun: {
            imageName: "wshotp",
            frameY: 32 / 2,
            frameCount: 32,
            msPerFrame: 50
        },
        shotgunTakeOut: {
            imageName: "wshglnk",
            frameY: 0,
            frameCount: 10,
            msPerFrame: 60
        },
        //shotgunPutAway: {
        //    imageName: "wshgbak",
        //    frameY: 0,
        //    frameCount: 10,
        //    msPerFrame: 60,
        //},
        shotgunFireAnimation1: {
            imageName: "wshotf",
            frameY: 0,
            frameCount: 32,
            msPerFrame: 60
        },
        shotgunFirePump: {
            imageName: "wshotg",
            frameY: 0,
            frameCount: 32,
            msPerFrame: 60
        },
        minigunAim: {
            imageName: "wmini",
            frameY: 32 / 2,
            frameCount: 32,
            msPerFrame: 60
        },
        minigunFire: {
            imageName: "wminif",
            frameY: 0,
            frameCount: 32,
            msPerFrame: 60
        },
        minigunTakeOut: {
            imageName: "wmgnlnk",
            frameY: 0,
            frameCount: 10,
            msPerFrame: 60
        },
        // minigunPutAway: {
        //    imageName: "wmgnbak",
        //    frameY: 0,
        //    frameCount: 10,
        //    msPerFrame: 60,
        //},
        //takeOutLandMine: {
        //    imageName: "wminlnk",
        //    frameY: 0,
        //    frameCount: 10,
        //    msPerFrame: 60,
        //},
        //takeOutSheep: {
        //    imageName: "wshplnk",
        //    frameY: 0,
        //    frameCount: 10,
        //    msPerFrame: 60,
        //},
        //takeOutBlowtorch: {
        //    imageName: "wblowlk",
        //    frameY: 0,
        //    frameCount: 15,
        //    msPerFrame: 60,
        //},
        //blowtorching: {
        //    imageName: "wbloww",
        //    frameY: 0,
        //    frameCount: 15,
        //    msPerFrame: 60,
        //},
        takeOutBazooka: {
            imageName: "wbazlnk",
            frameY: 0,
            frameCount: 7,
            msPerFrame: 60
        },
        aimBazooka: {
            imageName: "wbaz",
            frameY: 32 / 2,
            frameCount: 32,
            msPerFrame: 60
        },
        wbackflp: {
            imageName: "wbackflp",
            frameY: 0,
            frameCount: 22,
            msPerFrame: 50
        }
    };
    Sprites.particleEffects = {
        eclipse: {
            imageName: "elipse75",
            frameY: 0,
            frameCount: 10,
            msPerFrame: 20
        },
        cirlce1: {
            imageName: "circl100",
            frameY: 0,
            frameCount: 4,
            msPerFrame: 20
        },
        wordBiff: {
            imageName: "exbiff",
            frameY: 0,
            frameCount: 12,
            msPerFrame: 20
        },
        flame1: {
            imageName: "flame1",
            frameY: 0,
            frameCount: 32,
            msPerFrame: 50
        },
        smoke75: {
            imageName: "smklt75",
            frameY: 0,
            frameCount: 28,
            msPerFrame: 50
        },
        wave: {
            imageName: "water3",
            frameY: 0,
            frameCount: 12,
            msPerFrame: 50
        },
        blob: {
            imageName: "blob",
            frameY: 0,
            frameCount: 16,
            msPerFrame: 50
        },
        clouds: {
            imageName: "clouds",
            frameY: 0,
            frameCount: 20,
            msPerFrame: 60
        },
        cloudm: {
            imageName: "cloudm",
            frameY: 0,
            frameCount: 20,
            msPerFrame: 60
        },
        cloudl: {
            imageName: "cloudl",
            frameY: 0,
            frameCount: 20,
            msPerFrame: 20
        },
        grave1: {
            imageName: "grave1",
            frameY: 0,
            frameCount: 20,
            msPerFrame: 20
        },
        grave2: {
            imageName: "grave2",
            frameY: 0,
            frameCount: 20,
            msPerFrame: 20
        },
        grave3: {
            imageName: "grave3",
            frameY: 0,
            frameCount: 20,
            msPerFrame: 20
        },
        grave4: {
            imageName: "grave4",
            frameY: 0,
            frameCount: 20,
            msPerFrame: 20
        },
        grave5: {
            imageName: "grave5",
            frameY: 0,
            frameCount: 20,
            msPerFrame: 20
        },
        grave6: {
            imageName: "grave6",
            frameY: 0,
            frameCount: 20,
            msPerFrame: 20
        }
    };
})(Sprites || (Sprites = {}));