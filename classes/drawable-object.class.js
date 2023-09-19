/**
 * Represents a drawable object with position, dimensions, and rendering capabilities.
 */
class DrawableObject {
    /**
         * The x-coordinate position of the drawable object.
         * @type {number}
         * @default 100
         */
    x = 100;

    /**
     * The y-coordinate position of the drawable object.
     * @type {number}
     * @default 230
     */
    y = 230;

    /**
     * The height of the drawable object.
     * @type {number}
     * @default 100
     */
    height = 100;

    /**
     * The width of the drawable object.
     * @type {number}
     * @default 100
     */
    width = 100;

    /**
     * The image associated with the drawable object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * The index of the current image in an animation sequence.
     * @type {number}
     * @default 0
     */
    currentImage = 0;

    /**
    * A cache for storing loaded images to avoid redundant loading.
    * @type {Object.<string, HTMLImageElement>}
    */
    imageCache = {};


    /**
     * Render the object with a specific image path.
     * @param {string} path - The path to the image to render.
     */
    renderObject(path) {
        this.img = this.imageCache[path];
    }


    /**
    * Draw the drawable object on a canvas context.
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
    */
    draw(ctx) {
        try {
            if (this.img) {

                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

            } else if (this.textContent) {
                ctx.fillStyle = this.fontColor;
                ctx.font = `${this.fontSize} ${this.fontFamily}`;
                ctx.fillText(this.textContent, this.x, this.y);

            }
        } catch (e) {
            console.warn(e);
        }
    }


    /**
    * Render the object with a specific image path.
    * @param {string} path - The path to the image to render.
    */
    renderObject(path) {
        this.img = this.imageCache[path];
    }


    /**
    * Load an image from the specified path and assign it to the drawable object.
    * @param {string} path - The path to the image to load.
    */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
    * Load multiple images from an array of paths and store them in the image cache.
    * @param {string[]} arr - An array of image paths to load.
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Generate a random integer within a specified range.
     * @param {number} min - The minimum value of the range.
     * @param {number} max - The maximum value of the range.
     * @returns {number} A random integer within the specified range.
     */
    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}