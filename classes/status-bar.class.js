/**
 * Represents a status bar element in the game.
 * @class
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {


    /**
 * An array of image paths for the status bar.
 * @type {string[]}
 */
    IMAGES;

    /**
     * The current percentage value of the status bar (default: 100).
     * @type {number}
     */
    percentage = 100;

    /**
     * The width of the status bar (default: 150).
     * @type {number}
     */
    width = 150;

    /**
     * The height of the status bar (default: 40).
     * @type {number}
     */
    height = 40;

    /**
     * An array of image paths for the life status bar.
     * @type {string[]}
     */
    IMAGES_LIFE = this.getImagePaths("live-status-bar");

    /**
     * An array of image paths for the coin status bar.
     * @type {string[]}
     */
    IMAGES_COIN = this.getImagePaths("coin-status-bar");

    /**
     * An array of image paths for the poison status bar.
     * @type {string[]}
     */
    IMAGES_POISON = this.getImagePaths("poison-status-bar");


    /**
    * Create a new status bar element of the specified type.
    * @param {string} type - The type of the status bar ('life', 'coin', or 'poison').
    */
    constructor(type) {
        super();
        this.x = 20;
        if (type == "life") {
            this.initLifeBar();
        } else if (type == 'coin') {
            this.initCoinBar();
        } else if (type == 'poison') {
            this.initPoisonBar();
        } else if (type == 'bossLife') {
            this.initEndbossLifeBar();
        }
    }


    /**
    * Initializes a life status bar with 100% percentage.
    * @memberof StatusBar
    */
    initLifeBar() {
        this.IMAGES = this.IMAGES_LIFE;
        this.loadImages(this.IMAGES);
        this.y = 0;
        this.setPercentage(100);
    }


    /**
    * Initializes a coin status bar with 0% percentage.
    * @memberof StatusBar
    */
    initCoinBar() {
        this.IMAGES = this.IMAGES_COIN;
        this.loadImages(this.IMAGES);
        this.y = 30;
        this.setPercentage(0);
    }


    /**
    * Initializes a poison status bar with 0% percentage.
    * @memberof StatusBar
    */
    initPoisonBar() {
        this.IMAGES = this.IMAGES_POISON;
        this.loadImages(this.IMAGES);
        this.y = 60;
        this.setPercentage(0);
    }


    /**
    * Initializes a poison status bar with 100% percentage.
    * @memberof StatusBar
    */
    initEndbossLifeBar() {
        world.bossStatusBar = new StatusBar();
        this.IMAGES = this.IMAGES_LIFE;
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.y = 0;
        this.x = 400;
    }


    /**
    * Sets the percentage value for the status bar and updates its displayed image accordingly.
    * @memberof StatusBar
    * @param {number} percentage - The percentage value to set for the status bar.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }


    /**
    * Resolves the index of the image to be displayed based on the given percentage value.
    * @memberof StatusBar
    * @param {number} percentage - The percentage value used to determine the image index.
    * @returns {number} - The resolved image index.
    */
    resolveImageIndex(percentage) {
        if (percentage < 0) {
            percentage = 0;
        } else if (percentage > 100) {
            percentage = 100;
        }
        return Math.floor(((percentage + 20) / 20)) - 1;
    }


    /**
    * Generates an array of image paths based on the specified image types.
    * @memberof StatusBar
    * @param {string} imageTypes - The type of images to generate paths for ('live-status-bar', 'coin-status-bar', or 'poison-status-bar').
    * @returns {string[]} - An array of image paths corresponding to the specified image types.
    */
    getImagePaths(imageTypes) {
        const imagePaths = [];

        switch (imageTypes) {
            case "live-status-bar": {
                for (let i = 0; i <= 100; i += 20) {
                    const imagePath = `./img/4. Marcadores/green/Life/${i}_  copia 3.png`;
                    imagePaths.push(imagePath);
                }
            }
                break;
            case "coin-status-bar": {
                for (let i = 0; i <= 100; i += 20) {
                    const imagePath = `./img/4. Marcadores/green/Coin/${i}_  copia 4.png`;
                    imagePaths.push(imagePath);
                }
            }
                break;
            case "poison-status-bar": {
                for (let i = 0; i <= 100; i += 20) {
                    const imagePath = `./img/4. Marcadores/green/poisoned bubbles/${i}_ copia 2.png`;
                    imagePaths.push(imagePath);
                }
            }
                break;
        }

        return imagePaths;
    }
}