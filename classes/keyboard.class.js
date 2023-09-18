
/**
 * Represents a keyboard input handler for controlling game actions.
 */
class Keyboard {
    /**
     * Indicates whether the left arrow key is currently pressed.
     * @type {boolean}
     * @default false
     */
    LEFT = false;

    /**
     * Indicates whether the right arrow key is currently pressed.
     * @type {boolean}
     * @default false
     */
    RIGHT = false;

    /**
     * Indicates whether the up arrow key is currently pressed.
     * @type {boolean}
     * @default false
     */
    UP = false;

    /**
     * Indicates whether the down arrow key is currently pressed.
     * @type {boolean}
     * @default false
     */
    DOWN = false;

    /**
     * Indicates whether the spacebar key is currently pressed.
     * @type {boolean}
     * @default false
     */
    SPACE = false;

    /**
    * Represents a keyboard input handler for controlling game actions.
    */
    constructor() {
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.DOWN = false;
        this.SPACE = false;
    }


    /**
    * Set a specific keyboard input to true.
    * @param {string} input - The input string representing the key code or name.
    */
    setInput(input) {
        switch (input) {
            case 'ArrowUp':
                this.UP = true;
                break;
            case 'ArrowDown':
                this.DOWN = true;
                break;
            case 'ArrowLeft':
                this.LEFT = true;
                break;
            case 'ArrowRight':
                this.RIGHT = true;
                break;
            case 'Space':
                this.SPACE = true;
                break;
        }
    }


    /**
    * Set a specific keyboard input to false.
    * @param {string} input - The input string representing the key code or name.
    */
    unsetInput(input) {
        switch (input) {
            case 'ArrowUp':
                this.UP = false;
                break;
            case 'ArrowDown':
                this.DOWN = false;
                break;
            case 'ArrowLeft':
                this.LEFT = false;
                break;
            case 'ArrowRight':
                this.RIGHT = false;
                break;
            case 'Space':
                this.SPACE = false;
                break;
        }
    }
}
