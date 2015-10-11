var canvas; //Will be linked to the canvas in our index.html page
var stage; //Is the equivalent of stage in AS3; we'll add "children" to it

// Graphics
//[Background]
var bg; //The background graphic

//[Title View]
var main; //The Main Background
var startB; //The Start button in the main menu
var creditsB; //The credits button in the main menu

//[Credits]
var credits; //The Credits screen

//[Game View]
var player; //The player paddle graphic
var ball; //The ball graphic
var cpu; //The CPU paddle
var win; //The winning popup
var lose; //The losing popup

//[Score]
var playerScore; //The main player score
var cpuScore; //The CPU score
var cpuSpeed=6; //The speed of the CPU paddle; the faster it is the harder the game is

// Variables
var xSpeed = 5;
var ySpeed = 5;

var tkr = new Object;

//preloader
var preloader;
var manifest;
var totalLoaded = 0;

var TitleView = new Container();

function Main() {
    canvas = document.getElementById("PongStage");
    stage = new Stage(canvas);

    stage.mouseEventEnable = true;
    manifest = [
        { src: "game/bg.png", id: "bg" },
        { src: "game/main.png", id: "main" },
        { src: "game/startB.png", id: "startB" },
        { src: "game/creditsB.png", id: "creditsB" },
        { src: "game/credits.png", id: "credits" },
        { src: "game/paddle.png", id: "cpu" },
        { src: "game/paddle.png", id: "player" },
        { src: "game/ball.png", id: "ball" },
        { src: "game/win.png", id: "win" },
        { src: "game/lose.png", id: "lose" }
    ];

    preloader = new PreloadJS();
    preloader.onProgress = handleProgress;
    preloader.onComplete = handleComplete;
    preloader.onFileLoad = handleFileLoad;
    preloader.loadManifest(manifest);

    Ticker.setFPS(30);
    Ticker.addListener(stage);
}

function handleProgress(e) {
    //use event.loaded to get the percentage of the loading
}

function handleComplete(e) {
    //triggered when all loading is complete
}

function handleFileLoad(e) {
    //triggered when an individual file completes loading

    switch(e.type) {
        case PreloadJS.IMAGE:
            var img = new Image();
            img.src = e.src;
            img.onload = handleLoadComplete;
            window[e.id] = new Bitmap(img);
            break;
    }
}

function handleLoadComplete(e) {
    totalLoaded++;

    if(manifest.length == totalLoaded) {
        addTitleView();
    }
}

function addTitleView() {
    startB.x = 240 - 31.5;
    startB.y = 160;
    startB.name = 'startB';

    creditsB.x = 241 - 42;
    creditsB.y = 200;

    TitleView.addChild(main, startB, creditsB);
    stage.addChild(bg, TitleView);

    stage.update();

    startB.onPress = tweenTitleView;
    creditsB.onPress = showCredits;
}

function showCredits() {
    credits.x = 480;

    stage.addChild(credits);
    stage.update();

    Tween.get(credits).to({ x: 0 }, 300);
    credits.onPress = hideCredits;
}

function hideCredits() {
    Tween.get(credits).to({ x: 480 }, 300).call(rmvCredits);
}

function rmvCredits() {
    stage.removeChild(credits);
}

function tweenTitleView() {
    Tween.get(TitleView).to({ y: -320 }, 300).call(addGameView);
}

function addGameView() {
    // Destroy Menu & Credits screen
    stage.removeChild(TitleView);
    TitleView = null;
    credits = null;

    // Add Game View
    player.x = 2;
    player.y = 160 - 37.5;
    cpu.x = 480 - 25;
    cpu.y = 160 - 37.5;
    ball.x = 240 - 15;
    ball.y = 160 - 15;

    // Score
    playerScore = new Text("0", "bold 20px Arial", "#A3FF24");
    playerScore.x = 211;
    playerScore.y = 20;
    cpuScore = new Text("0", "bold 20px Arial", "#A3FF24");
    cpuScore.x = 262;
    cpuScore.y = 20;
    stage.addChild(playerScore, cpuScore, player, cpu, ball);
    stage.update();

    // Start Listener
    bg.onPress = startGame;
}

function startGame() {
    bg.onPress = null;
    stage.onMouseMove = movePaddle;

    Ticker.addListener(tkr, false);
    tkr.tick = update;
}

function movePaddle(e) {
    player.y = e.stageY;
}

function reset() {
    ball.x = 240 - 15;
    ball.y = 160 - 15;
    player.y = 160 - 37.5;
    cpu.y = 160 - 37.5;

    stage.onMouseMove = null;
    Ticker.removeListener(tkr);
    bg.onPress = startGame;
}


function alert(e) {
    Ticker.removeListener(tkr);
    stage.onMouseMove = null;
    bg.onPress = null;

    if(e == "win") {
        win.x = 140;
        win.y = -90;

        stage.addChild(win);
        Tween.get(win).to({ y: 115 }, 300);
    } else {
        win.x = 140;
        win.y = -90;

        stage.addChild(lose);
        Tween.get(lose).to({ y: 115 }, 300);
    }
}

function update() {
    // Ball movement
    ball.x = ball.x + xSpeed;
    ball.y = ball.y + ySpeed;

    // CPU movement
    if(cpu.y < ball.y) {
        cpu.y = cpu.y + 4;
    } else if(cpu.y > ball.y) {
        cpu.y = cpu.y - 4;
    }

    // Wall Collision
    if(ball.y < 0) {
        ySpeed = -ySpeed;
    }
    if(ball.y + 30 > 320) {
        ySpeed = -ySpeed;
    }

    // CPU Score
    if(ball.x < 0) {
        xSpeed = -xSpeed;
        cpuScore.text = parseInt(cpuScore.text + 1);
        reset();
    }

    // Player Score
    if(ball.x + 30 > 480) {
        xSpeed = -xSpeed;
        playerScore.text = parseInt(playerScore.text) + 1;
        reset();
    }

    // CPU Collision
    if(ball.x + 30 > cpu.x && ball.x + 30 < cpu.x + 22 &&
        ball.y >= cpu.y && ball.y < cpu.y + 75) {
        xSpeed *= -1;
    }

    // Player Collision
    if(ball.x <= player.x + 22 && ball.x > player.x &&
        ball.y >= player.y && ball.y < player.y + 75) {
        xSpeed *= -1;
    }

    // Stop paddle from going out of canvas
    if(player.y >= 249) {
        player.y = 249;
    }

    // Check for Win
    if(playerScore.text == "10") {
        alert("win");
    }

    // Check for Game Over
    if(cpuScore.text == "10") {
        alert("lose");
    }
}

























