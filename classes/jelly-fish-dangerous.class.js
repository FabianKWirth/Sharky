/**
 * Represents a dangerous JellyFish, which is a type of JellyFish.
 * @extends JellyFish
 */
class JellyFishDangerous extends JellyFish {
    /**
     * An array of images for the dangerous JellyFish while swimming.
     * @type {string[]}
     */
    IMAGES_FISH_SWIMMING;

    /**
     * An array of images for the dangerous JellyFish while dying.
     * @type {string[]}
     */
    IMAGES_FISH_DYING;

    /**
     * The unique identifier for the dangerous JellyFish.
     * @type {number}
     */
    fishTypeId;

    /**
    * Creates a new dangerous JellyFish object.
    * @param {number} fishTypeId - The unique identifier for the dangerous JellyFish.
    * @param {number} spawnPoint - The x-coordinate spawn point of the JellyFish.
    */
    constructor(fishTypeId, spawnPoint) {
        super();
        this.height = 100;
        this.width = 100;
        this.damage = 15;
        this.health = 30;
        this.fishTypeId = fishTypeId;
        this.x = spawnPoint;

        this.IMAGES_FISH_SWIMMING = this.getFishMovementImages();
        this.IMAGES_FISH_DYING = this.getFishDeathImages();
        this.loadImages(this.IMAGES_FISH_SWIMMING[fishTypeId]);
        this.loadImages(this.IMAGES_FISH_DYING[fishTypeId]);
        this.animate();
        this.setMovement();
    }

    /**
    * Set the hitbox dimensions and position for the dangerous JellyFish.
    * The hitbox defines the area used for collision detection.
    */
    setHitbox() {
        this.hitboxHeight = 85;
        this.hitboxWidth = 82;
        this.hitBoxX = this.x + 6;
        this.hitBoxY = this.y + 2;
    }


    /**
    * Get image paths for fish movement animations.
    * @returns {string[][]} An array of image paths indexed by fish type IDs.
    */
    getFishMovementImages() {
        const imagePaths = [];
        imagePaths[1] = [];
        imagePaths[2] = [];
        let imagePath = "";

        for (let i = 1; i <= 4; i++) {
            imagePath = `./img/2.Enemy/2 Jelly fish/Súper dangerous/Green ${i}.png`;
            imagePaths[1].push(imagePath);
            imagePath = `./img/2.Enemy/2 Jelly fish/Súper dangerous/Pink ${i}.png`;
            imagePaths[2].push(imagePath);
        }

        return imagePaths;
    }

    /**
    * Get image paths for fish death animations.
    * @returns {string[][]} An array of image paths indexed by fish type IDs.
    */
    getFishDeathImages() {
        const imagePaths = [];
        imagePaths[1] = [];
        imagePaths[2] = [];
        let imagePath = "";
        for (let i = 1; i <= 4; i++) {
            imagePath = `./img/2.Enemy/2 Jelly fish/Dead/green/g${i}.png`;
            imagePaths[1].push(imagePath);
            imagePath = `./img/2.Enemy/2 Jelly fish/Dead/Lila/L${i}.png`;
            imagePaths[2].push(imagePath);
        }

        return imagePaths;
    }

}