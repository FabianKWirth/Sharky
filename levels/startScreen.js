IMAGE_START = { normal: "img/6.Botones/Start/1.png", selected: "img/6.Botones/Start/2.png" };
IMAGE_FULLSCREEN = { normal: "img/6.Botones/Full Screen/Mesa de trabajo 9.png", selected: "img/6.Botones/Full Screen/Mesa de trabajo 7.png" };
IMAGE_MOVEMENT = { normal: "img/6.Botones/Key/arrow keys.png" };
IMAGE_ATTACK = { normal: "img/6.Botones/Key/Space Bar key.png" };

function initStartScreen() {

    screenElements = [
        new backGroundObject("./img/3. Background/Legacy/Dark/1.png", 0, 0),
        new backGroundObject("./img/1.Sharkie/1.IDLE/18.png", -200, 100),
        new ScreenText("Sharky", 80, 100, "72px"),
        new Buttons(IMAGE_START, 80, 150, 260, 100, "startGame"),
        //new Buttons(IMAGE_MOVEMENT, 400, 280, 250, 100),
        new ScreenText("Movement", 400, 260),
        //new Buttons(IMAGE_ATTACK, 400, 150, 250, 50),
        new ScreenText("Attack", 400, 130)
    ];
}