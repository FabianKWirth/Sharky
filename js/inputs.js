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
 * Represents the state of notification activation.
 * @type {boolean}
 */
let turnNotificationActive = false;


/**
 * Sets up input event listeners for keyboard, mouse, and touch events.
 */
function setInputEventListeners() {
    setKeyboardListeners();
    setMouseListeners();
    setTouchListeners();
    preventShowingContextMenu();
    setWindowChangeListeners();
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
    touchLeft = touch.clientX - rect.right - radius;
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
 * Sets up event listeners for the window's "resize" event.
 * When the window is resized, it triggers the checkDeviceAlignment function.
 */
function setWindowChangeListeners(){
    window.addEventListener("resize", (event) => {
        checkDeviceAlignment();
    });
}


/**
 * Checks the alignment of the device and handles turn notifications accordingly.
 * If a turn is suggested based on the device alignment, it renders a notification.
 * If the device alignment is not suggesting a turn, it deletes any existing turn notifications.
 */
function checkDeviceAlignment() {
    if (!turnNotificationActive) {
        if (checkIfTurnSuggested()) {
            renderTurnNotification();
            setTimeout(() => {
                deleteTurnNotification();
            }, 4000);
        } else {
            deleteTurnNotification();
            turnNotificationActive = false;
        }
    }
}


/**
 * Checks if it's suggested to turn the device based on screen dimensions.
 * @returns {boolean} - True if turning the device is suggested, otherwise false.
 */
function checkIfTurnSuggested() {
    // Get the device's width and height
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // Check if either width or height is greater than 720px
    if (screenWidth < 720 || screenHeight < 720) {
        // Check if height is greater than width
        if (screenHeight > screenWidth) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

