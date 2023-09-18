/**
 * Represents a background object with a position and dimensions.
 * Extends the MoveableObject class.
 */
class backGroundObject extends MoveableObject {

    /**
     * The y-coordinate of the backGroundObject's position.
     */
    y = 100;

    /**
     * The width of the backGroundObject (default 720).
     */
    width = 720;

    /**
    * The width of the backGroundObject (default 480).
    */
    height = 480;

    /**
     * Create a new backGroundObject object.
     * @param {string} imgRef - The image reference or source URL.
     * @param {number} x - The x-coordinate of the backGroundObject's position.
     * @param {number} y - The y-coordinate of the backGroundObject's position.
     * @param {number} [width] - The width of the backGroundObject (optional).
     * @param {number} [height] - The height of the backGroundObject (optional).
     */
    constructor(imgRef, x, y, width, height) {
        super().loadImg(imgRef);
        this.x = x;
        this.y = y;
        if (height) {
            this.height = height;
        }
        if (width) {
            this.width = width;
        }
    }

}