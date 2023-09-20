/**
 * A class representing buttons in the menu.
 * Buttons are drawable objects that can trigger specific actions when interacted with.
 *
 * @extends DrawableObject
 */
class Buttons extends DrawableObject {
    /**
    * The image source for the button in its default state.
    * @type {string}
    */
    IMAGE;

    /**
     * The currently active button, if any.
     * @type {?Buttons}
     * @static
     */
    static activeButton = null;

    /**
     * The name of the action associated with the button.
     * @type {string}
     */
    actionName;

    /**
     * The X-coordinate of the button's position within the game's viewport.
     * @type {number}
     */
    viewPortX;

    /**
     * The Y-coordinate of the button's position within the game's viewport.
     * @type {number}
     */
    viewPortY;

    /**
     * The width of the button.
     * @type {number}
     */
    viewPortWidth;

    /**
     * The height of the button.
     * @type {number}
     */
    viewPortHeight;

    /**
     * A flag indicating whether the button has been used or interacted with.
     * @type {boolean}
     */
    isUsed = false;

    /**
     * The timestamp of the last interaction with the button.
     * @type {number}
     */
    lastUsage = 0;

    currentImage = "default" //Alternativ "selected"


    /**
     * Creates a new button.
     *
     * @param {Object} IMAGE - An object containing image sources for the button in different states (e.g., 'normal', 'hover', 'pressed').
     * @param {number} x - The X-coordinate of the button's position.
     * @param {number} y - The Y-coordinate of the button's position.
     * @param {number} width - The width of the button.
     * @param {number} height - The height of the button.
     * @param {string} actionName - The name of the action associated with the button.
     */
    constructor(IMAGE, x, y, width, height, actionName) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.IMAGE = IMAGE;
        this.loadImg(IMAGE['normal']);
        this.checkUserInteraction();
        this.actionName = actionName;
    }


    /**
    * Adapts the object's position and dimensions to match the client's viewport dimensions.
    * This method calculates scaling factors for width and height based on the client's viewport
    * dimensions and updates the object's properties accordingly to ensure it is correctly
    * positioned and sized within the viewport.
    */
    adaptObjectToViewport() {
        // Get the client's viewport dimensions
        const viewportWidth = document.getElementById("canvas").clientWidth;
        const viewportHeight = document.getElementById("canvas").clientHeight;

        // Calculate the scaling factors for width and height
        const widthScale = viewportWidth / canvas.width;
        const heightScale = viewportHeight / canvas.height;

        // Update the object's properties based on the scaling factors
        this.viewPortX = this.x * widthScale;
        this.viewPortY = this.y * heightScale;
        this.viewPortWidth = this.width * widthScale;
        this.viewPortHeight = this.height * heightScale;
    }


    /**
    * Continuously check and handle user interactions with the button.
    * This method runs at a regular interval to adapt the button's position and dimensions to the viewport,
    * handle button interactions (e.g., click actions and visual state changes), and set the cursor style
    * based on the button's state. It uses a stoppable interval to regularly perform these checks and updates.
    */
    checkUserInteraction() {
        let id = setInterval(() => {
            this.adaptObjectToViewport();
            this.handleButtonInteraction();
            this.setButtonCursor();
        }, 1000 / 30);
        stoppableIntervalIds.push(id);
    }


    /**
    * Set the cursor style based on the button's state and mouse interaction.
    * This method determines whether the mouse cursor is positioned over the button,
    * and if so, it sets the cursor style to "pointer" to indicate interactivity.
    * If no button is active, it sets the cursor style to "default."
    */
    setButtonCursor() {
        let buttonIndex = `${this.x}${this.y}`;
        if (this.isMouseOnButton()) {
            canvas.style.cursor = "pointer";
            Buttons.activeButton = buttonIndex;
        } else {
            if (Buttons.activeButton == buttonIndex) {
                Buttons.activeButton = null;
            }
        }
        if (Buttons.activeButton == null) {
            canvas.style.cursor = "default";
        }
    }


    /**
     * Checks if the game is stopped and handles button interactions accordingly.
     * @returns {boolean} Returns `true` if an action is performed, `false` otherwise.
     */
    handleButtonInteraction() {
        if (World.stopGame) {
            if (this.isMouseOnButton() && isClicking) {
                this.performAction();
                return true;
            } else if (this.isTouchOnButton() && isTouching) {
                this.performAction();
                return true;
            } else if (this.isMouseOnButton()) {
                if (this.IMAGE['selected']) {
                    if (this.currentImage != "selected") {
                        this.currentImage = "selected";
                        this.loadImg(this.IMAGE['selected']);
                    }
                    return true;
                }
            } else {
                if (this.currentImage != "normal") {
                    this.currentImage = "normal";
                    this.loadImg(this.IMAGE['normal']);
                    return false;
                }
            }
        }
    }


    /**
    * Check if the mouse cursor is positioned over the button.
    * @returns {boolean} `true` if the mouse cursor is on the button, otherwise `false`.
    */
    isMouseOnButton() {
        return mouseX >= this.viewPortX &&
            mouseX <= this.viewPortX + this.viewPortWidth &&
            mouseY >= this.viewPortY &&
            mouseY <= this.viewPortY + this.viewPortHeight;
    }


    /**
    * Check if the touch point is positioned over the button.
    * @returns {boolean} `true` if the touch point is on the button, otherwise `false`.
    */
    isTouchOnButton() {
        return touchRight >= this.viewPortX &&
            touchLeft <= this.viewPortX + this.viewPortWidth &&
            touchBottom >= this.viewPortY &&
            touchTop <= this.viewPortY + this.viewPortHeight;
    }


    /**
    * Perform the associated action with the button, if not recently used.
    * This method checks if the button has been recently used and performs the action
    * associated with it if it has not. Actions may include toggling fullscreen mode or
    * starting the game. After performing the action, the method records the timestamp
    * of the last usage to prevent rapid, repeated activations.
    */
    performAction() {
        if (!this.isJustUsed()) {
            if (this.actionName) {
                if (this.actionName == "startGame") {
                    startGame();
                    this.lastUsage = new Date().getTime();
                }
            }
        }
    }


    /**
    * Check if the button has been used within the last 5 seconds.
    */
    isJustUsed() {
        return new Date().getTime() - this.lastUsage < 5000;
    }
}