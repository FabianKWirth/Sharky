/**
 * Represents a menu in the game.
 * @class
 */
class Menu {
    /**
    * The canvas element for rendering the menu.
    * @type {HTMLCanvasElement}
    */
    canvas;

    /**
     * The 2D rendering context of the canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * A flag indicating whether the menu is currently being drawn.
     * @type {boolean}
     */
    isDrawing = false;


    /**
     * Create a new menu for the game.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering the menu.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     * @param {string} type - The type of menu ('start', 'win' or 'loss').
     */
    constructor(canvas, ctx, type) {
        this.canvas = canvas;
        this.ctx = ctx;
        if (type == "start") {
            initStartScreen();
            playBackGroundAudio(musicPath);
        } else {
            initEndScreen(type);
            playBackGroundAudio(musicPath);
        }
        setTimeout(() => {
            this.draw();
        }, 1000);
    }

    
    /**
    * Draws the menu on the canvas if it's currently in the drawing state.
    * @memberof Menu
    */
    draw() {
        if (!this.isDrawing) {
            return; // Exit the function if isDrawing is false
        }

        this.addObjectsToMenu(screenElements);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
    * Function to interrupt the drawing
    */
    stopDrawing() {
        this.isDrawing = false;
    }


    /**
    * Function to resume drawing
    */
    resumeDrawing() {
        this.isDrawing = true;
        this.draw();
    }


    /**
    * Adds an object to the menu map and draws it on the canvas.
    * @memberof Menu
    * @param {Object} object - The object to add and draw on the canvas.
    */
    addToMenu(object) {
        object.draw(this.ctx);
    }


    /**
    * Adds one or more objects to the menu.
    * @memberof Menu
    * @param {Object|Object[]} objects - The object(s) to add to the menu.
    */
    addObjectsToMenu(objects) {
        if (Array.isArray(objects)) {
            objects.forEach(object => {
                this.addToMenu(object);
            });
        } else {
            this.addToMenu(objects);
        }
    }

}