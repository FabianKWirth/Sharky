IMAGE_TRY_AGAIN = { normal: "./img/6.Botones/Try again/Recurso 16.png", selected: "./img/6.Botones/Try again/Recurso 17.png" };

/**
 * Initialize the end screen based on the game result.
 * @param {string} gameResult - The result of the game ("win" or "loss").
 */
function initEndScreen(gameResult) {
    screenElements = [];
    if (gameResult == "win") {
        initWinScreen();
    } else if (gameResult == 'loss') {
        initLossScreen();
    }
    screenElements.push(new Buttons(IMAGE_TRY_AGAIN, 230, 350, 260, 80, "startGame"))
}


/**
 * Initialize the win screen.
 */
function initWinScreen() {
    screenElements.push(new backGroundObject("./img/3. Background/Legacy/Dark/1.png", 0, 0));
    screenElements.push(new backGroundObject("./img/6.Botones/Try again/Mesa de trabajo 1.png", 0, 0));
    screenElements.push(new ScreenText(`You collected ${world.collectedCoins} of ${world.totalCoins} Coins`, 40, 130));
}


/**
 * Initialize the loss screen.
 */
function initLossScreen() {
    screenElements.push(new backGroundObject("./img/3. Background/Legacy/Dark/1.png", 0, 0));
    screenElements.push(new backGroundObject("img/6.Botones/Tittles/Game Over/Recurso 11.png", 210, 80, 300, 90));
    screenElements.push(new backGroundObject("./img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png", -100, 0));
    musicPath = "./audio/background-sad.mp3";
}