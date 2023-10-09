/**
 * Reference to the canvas of the Game.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * 2D rendering context of the canvas element.
 * @type {CanvasRenderingContext2D}
 */
let ctx;

/**
 * Reference to the game world object.
 * @type {World}
 */
let world;

/**
 * Reference to the keyboard input manager.
 * @type {Keyboard}
 */
let keyboard;

/**
 * Flag indicating whether the game is in fullscreen mode.
 * @type {boolean}
 */
let isFullscreen = false;

/**
 * An array containing screen elements used in the game.
 * @type {Array}
 */
let screenElements = [];

/**
 * Flag indicating whether the game is currently active.
 * @type {boolean}
 */
let gameActive = false;

/**
 * Reference to the start screen element.
 * @type {HTMLElement}
 */
let startScreen;

/**
 * Reference to the end screen element.
 * @type {HTMLElement}
 */
let endScreen;

/**
 * Array of interval IDs that can be stopped to pause gameplay.
 * @type {Array}
 */
let stoppableIntervalIds = [];

/**
 * Flag indicating whether the background music is muted.
 * @type {boolean}
 */
let isMuted = true;

/**
 * The ID of the background music audio element.
 * @type {string}
 */
let backgroundMusicId;

/**
 * The file path to the background music audio file.
 * @type {string}
 */
let musicPath = "./audio/background-action.mp3";


/**
 * Initializes the game by setting up the canvas, clearing it ,configuring input event listeners and displaying the start screen.
 */
function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    clearCanvas(ctx);
    keyboard = new Keyboard();
    setInputEventListeners();
    showStartScreen(canvas, ctx);
    checkDeviceAlignment();
}


/**
 * Renders the start screen of the game.
 * @param {HTMLCanvasElement} canvas - The HTML canvas element where the screen is rendered.
 */
function showStartScreen(canvas, ctx) {
    startScreen = new Menu(canvas, ctx, "start");
    startScreen.resumeDrawing();
    world = new World(canvas, ctx, keyboard);
}


/**
 * Starts the game by resetting menus, initializing the game world, and beginning gameplay. Verifies that a game is only started once.
 */
function startGame() {
    addMobileActionMenu();
    resetDrawingOfMenus();
    if (checkIfGameJustStarted() == false) {
        world.initWorld();
    }
}


/**
 * Checks if the game has just started and sets a timeout to deactivate it after 4 seconds.
 * @returns {boolean} True if the game has already started, false if it has just started.
 */
function checkIfGameJustStarted() {
    if (!gameActive) {
        gameActive = true;
        setTimeout(() => {
            gameActive = false;
        }, 4000);
        return false;
    }
    return true;
}


/**
* Clears the canvas by filling it black.
* @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
*/
function clearCanvas(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


/**
 * Ends the game and displays an end screen of the specified type after clearing intervals.
 * @param {string} type - The type of the end screen (e.g., "win", "lose").
 */
function endGame(type) {
    removeMobileActionMenu();
    clearAllIntervals();
    World.stopGame = true;
    endScreen = new Menu(canvas, ctx, type);
    setTimeout(() => {
        endScreen.resumeDrawing();
    }, 300);
}


/**
 * Checks if Menus have been initialized, then resets the drawing state of menus by stopping their drawing processes.
 */
function resetDrawingOfMenus() {
    if (startScreen) {
        startScreen.stopDrawing();
        startScreen = null;
    }
    if (endScreen) {
        endScreen.stopDrawing();
        endScreen = null;
    }
    screenElements = [];
}


/**
 * Clears all previously intervals by set by the setStoppableInterval() function.
 */
function clearAllIntervals() {
    stoppableIntervalIds.forEach(clearInterval);
};


/**
 * Toggles fullscreen mode for the game.
 */
function toggleFullscreen() {
    const fullscreenElement = document.getElementById("fullscreen");
    if (!document.fullscreenElement) {
        requestFullscreen(fullscreenElement)
    } else {
        exitFullscreen(fullscreenElement);
    }
}


/**
 * Requests fullscreen mode for a specific HTML element.
 * @param {HTMLElement} fullscreenElement - The HTML element to enter fullscreen for.
*/
function requestFullscreen(fullscreenElement) {
    // Enter fullscreen mode for the div
    if (fullscreenElement.requestFullscreen) {
        fullscreenElement.requestFullscreen();
    } else if (fullscreenElement.mozRequestFullScreen) {
        fullscreenElement.mozRequestFullScreen(); // Firefox
    } else if (fullscreenElement.webkitRequestFullscreen) {
        fullscreenElement.webkitRequestFullscreen(); // Chrome, Safari, and Opera
    } else if (fullscreenElement.msRequestFullscreen) {
        fullscreenElement.msRequestFullscreen(); // IE/Edge
    }
}


/**
 * Exits fullscreen mode for the current document or a specific HTML element.
 */
function exitFullscreen() {
    // Exit fullscreen mode
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // Firefox
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Chrome, Safari, and Opera
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // IE/Edge
    }
}


/**
 * Sets a stoppable interval that can be cleared later. Pushes its ID to global array `stoppableIntervalIds`.
 * @param {function} fn - The function to be executed repeatedly at specified intervals.
 * @param {number} time - The time, in milliseconds, between each execution of the function.
 */
function setStoppableInterval(fn, time, alwaysPass = false) {
    if (World.stopGame == false || alwaysPass) {
        let id = setInterval(fn, time);
        stoppableIntervalIds.push(id);
    }
}


/**
 * Toggles the mute state for background music
 */
function toggleMute() {
    if (isMuted) {
        isMuted = false;
        playBackGroundAudio(musicPath);
        document.getElementById("muteButton").src = './img/6.Botones/Mute/unmuteIcon.png';
    } else {
        isMuted = true;
        stopBackgroundMusic();
        document.getElementById("muteButton").src = './img/6.Botones/Mute/muteIcon.png';

    }
}

/**
 * Stops and resets the background music audio playback and removes the audio element from the DOM.
 */
function stopBackgroundMusic() {
    let backgroundAudio = document.getElementById('background-music');
    if (backgroundAudio) {
        backgroundAudio.remove();
    }
}


/**
 * Plays background audio with the specified URL, replacing any existing background audio.
 * @param {string} url - The URL of the background audio file to play.
 */
function playBackGroundAudio(url) {
    stopBackgroundMusic();
    const newAudio = new Audio();
    newAudio.volume = 0.1;
    newAudio.id = 'background-music';
    newAudio.controls = true;
    newAudio.loop = true;
    newAudio.src = url;
    document.body.appendChild(newAudio);
    newAudio.style.display = 'none';
    if (!isMuted) {
        newAudio.play();
    }
}


/**
 * Plays an audio element if the game audio is not muted.
 * @param {HTMLAudioElement} audioObj - The HTML audio element to play.
 */
function playAudio(audioObj) {
    if (!isMuted) {
        if (audioObj) {
            audioObj.volume = 0.05;
            audioObj.play();
        }
    }
}