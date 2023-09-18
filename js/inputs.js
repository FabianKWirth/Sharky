/**
 * Flag indicating whether a mouse click is active.
 * @type {boolean}
 */
let isClicking = false;

/**
 * Flag indicating whether a touch interaction is active.
 * @type {boolean}
 */
let isTouching = false;

/**
 * The right boundary of the touch area.
 * @type {number}
 */
let touchRight;

/**
 * The left boundary of the touch area.
 * @type {number}
 */
let touchLeft;

/**
 * The bottom boundary of the touch area.
 * @type {number}
 */
let touchBottom;

/**
 * The top boundary of the touch area.
 * @type {number}
 */
let touchTop;

/**
 * The X-coordinate of the mouse pointer on the canvas.
 * @type {number}
 */
let mouseX;

/**
 * The Y-coordinate of the mouse pointer on the canvas.
 * @type {number}
 */
let mouseY;


/**
 * Sets up input event listeners for keyboard, mouse, and touch events.
 */
function setInputEventListeners() {
    setKeyboardListeners();
    setMouseListeners();
    setTouchListeners();
    preventShowingContextMenu();
}


/**
 * Prevents the default context menu from appearing when right-clicking on specific images with the given IDs.
 */
function preventShowingContextMenu() {
    document.addEventListener('DOMContentLoaded', () => {
        let imgIds = ["inputUp", "inputLeft", "inputDown", "inputRight", "inputSpace"];

        imgIds.forEach(img => {
            document.getElementById(img).addEventListener('contextmenu', e => {    // Prevent the default context menu from appearing
                e.preventDefault();
            });
        });
    });
}


/**
 * Sets up keyboard event listeners to handle keydown and keyup events.
 */
function setKeyboardListeners() {
    window.addEventListener("keydown", (event) => {
        keyboard.setInput(event.code);
    });

    window.addEventListener("keyup", (event) => {
        keyboard.unsetInput(event.code);
    });
}


/**
 * Sets up mouse event listeners to handle mousemove, mousedown, and mouseup events.
 */
function setMouseListeners() {
    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    document.addEventListener("mousedown", () => {
        isClicking = true; // Set the flag to true when the mouse button is pressed
    });

    document.addEventListener("mouseup", () => {
        isClicking = false; // Set the flag to false when the mouse button is released
    });
}


/**
 * Sets touch dimensions for interaction with the canvas.
 * @param {TouchEvent} e - The TouchEvent object representing the touch input.
 */
function setTouchDimensions(e) {
    const rect = canvas.getBoundingClientRect();
    let radius = 5;
    touch = e['targetTouches'][0];
    touchLeft = touch.clientX - rect.right -radius;
    touchRight = touch.clientX + rect.right + radius;
    touchTop = touch.clientY - rect.top - radius;
    touchBottom = touch.clientY - rect.top + radius;
    isTouching = true;
}


/**
 * Sets up touch event listeners to handle touchstart and touchend events.
 */
function setTouchListeners() {

    canvas.addEventListener("touchmove", (e) => {
        setTouchDimensions(e);
    }, { passive: true });

    canvas.addEventListener("touchstart", (e) => {
        setTouchDimensions(e);
    }, { passive: true });

    document.addEventListener("touchend", () => {
        isTouching = false; // Set the flag to false when a touch event ends
    });

    setInputUpListeners();
    setInputDownListeners();
    setInputLeftListeners();
    setInputRightListeners();
    setSpaceListeners();
}


/** 
 Touch event listener for inputUp
*/
function setInputUpListeners() {
    document.getElementById('inputUp').addEventListener('touchstart', () => {
        keyboard.setInput("ArrowUp");
    }, { passive: true });

    document.getElementById('inputUp').addEventListener('touchend', () => {
        keyboard.unsetInput("ArrowUp");
    });
}



/** 
 Touch event listener for inputDown
*/
function setInputDownListeners() {

    document.getElementById('inputDown').addEventListener('touchstart', () => {
        keyboard.setInput("ArrowDown");
    }, { passive: true });

    document.getElementById('inputDown').addEventListener('touchend', () => {
        keyboard.unsetInput("ArrowDown");
    });
}

/** 
 Touch event listener for inputLeft
*/
function setInputLeftListeners() {
    document.getElementById('inputLeft').addEventListener('touchstart', () => {
        keyboard.setInput("ArrowLeft");
    }, { passive: true });

    document.getElementById('inputLeft').addEventListener('touchend', () => {
        keyboard.unsetInput("ArrowLeft");
    });
}

/** 
 Touch event listener for inputRight
*/
function setInputRightListeners() {
    document.getElementById('inputRight').addEventListener('touchstart', () => {
        keyboard.setInput("ArrowRight");
    }, { passive: true });

    document.getElementById('inputRight').addEventListener('touchend', () => {
        keyboard.unsetInput("ArrowRight");
    });
}


/** 
 Touch event listener for spaceBar-Button
*/
function setSpaceListeners() {

    document.getElementById('inputSpace').addEventListener('touchstart', () => {
        keyboard.setInput("Space");
    }, { passive: true });

    document.getElementById('inputSpace').addEventListener('touchend', () => {
        keyboard.unsetInput("Space");
    });
}


/**
 * Changes the image source to a hover state when the mouse hovers over the element.
 * @param {HTMLElement} element - The HTML element to apply the hover effect to.
 */
function hoverStartButton(element) {
    element.setAttribute('src', './img/6.Botones/Start/2.png');
}


/**
 * Reverts the image source to its original state when the mouse is no longer hovering over the element.
 * @param {HTMLElement} element - The HTML element to revert the image source for.
 */
function unhoverStartButton(element) {
    element.setAttribute('src', './img/6.Botones/Start/1.png');
}


/**
 * Changes the image source to a hover state when the mouse hovers over the element.
 * @param {HTMLElement} element - The HTML element to apply the hover effect to.
 */
function hoverFullScreenButton(element) {
    element.setAttribute('src', './img/6.Botones/Full Screen/Mesa de trabajo 7.png');
}


/**
 * Reverts the image source to its original state when the mouse is no longer hovering over the element.
 * @param {HTMLElement} element - The HTML element to revert the image source for.
 */
function unhoverFullScreenButton(element) {
    element.setAttribute('src', './img/6.Botones/Full Screen/Mesa de trabajo 9.png');
}

