/**
 * Class representing a screen text element.
 * @extends DrawableObject
 */
class ScreenText extends DrawableObject {
    /**
     * The text content to display.
     * @type {string}
     */
    textContent;

    /**
     * The font color of the text element.
     * @type {string}
     * @default "white"
     */
    fontColor = "white";

    /**
     * The font family of the text element.
     * @type {string}
     * @default "LuckiestGuy"
     */
    fontFamily = "LuckiestGuy";

    /**
     * The font size of the text element.
     * @type {string}
     * @default "48px"
     */
    fontSize = "48px";

    
    /**
     * Create a screen text element.
     * @param {string} textContent - The text content to display.
     * @param {number} x - The X-coordinate of the screen text element.
     * @param {number} y - The Y-coordinate of the screen text element.
     * @param {string} [fontSize="48px"] - The font size of the text element (optional).
     */
    constructor(textContent, x, y, fontSize) {
        super();
        this.textContent = textContent;
        this.x = x;
        this.y = y;
        if (fontSize) {
            this.fontSize = fontSize;
        }
    }
}