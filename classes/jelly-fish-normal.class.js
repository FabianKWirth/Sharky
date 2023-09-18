/**
 * Represents a type of Jellyfish that is in its normal swimming state.
 * This class extends the base JellyFish class and provides specific image properties
 * for the normal swimming state and dying state of the Jellyfish.
 *
 * @extends {JellyFish} - The base class for Jellyfish.
 */
class JellyFishNormal extends JellyFish {
    
    /**
     * An array of image paths representing the Jellyfish's swimming animation frames.
     * @type {string[]}
     */
    IMAGES_FISH_SWIMMING;

     /**
     * An array of image paths representing the Jellyfish's dying animation frames.
     * @type {string[]}
     */
    IMAGES_FISH_DYING;

    /**
     * The unique identifier for the type of Jellyfish.
     * @type {number}
     */
    fishTypeId;


    /**
    * Creates a new Jellyfish.
    *
    * @param {number} fishTypeId - The unique identifier for the type of Jellyfish.
    * @param {number} spawnPoint - The initial x-coordinate where the Jellyfish spawns.
    */
    constructor(fishTypeId,spawnPoint) {
        super();
       
        this.damage = 5;
        this.health = 20;
        this.height = 80;
        this.width = 80;
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
    * Sets the hitbox dimensions and position for the Jellyfish object.
    * The hitbox is used to determine collisions and interactions with other objects.
    */
    setHitbox() {
        this.hitboxHeight = 80;
        this.hitboxWidth = 56;
        this.hitBoxX = this.x + 12;
        this.hitBoxY = this.y + 2;
    }

    
    /**
    * Gets the image paths for the swimming animation frames of the Jellyfish.
    * @returns {string[][]} An array of image paths for swimming animations for different types of Jellyfish.
    */
    getFishMovementImages() {
        const imagePaths = [];
        imagePaths[1] = [];
        for (let i = 1; i <= 4; i++) {
            const imagePath = `./img/2.Enemy/2 Jelly fish/Regular damage/Lila ${i}.png`;
            imagePaths[1].push(imagePath);
        }

        imagePaths[2] = [];
        for (let i = 1; i <= 4; i++) {
            const imagePath = `./img/2.Enemy/2 Jelly fish/Regular damage/Yellow ${i}.png`;
            imagePaths[2].push(imagePath);
        }

        return imagePaths;
    }


    /**
    * Gets the image paths for the dying animation frames of the Jellyfish.
    * @returns {string[][]} An array of image paths for dying animations for different types of Jellyfish.
    */
    getFishDeathImages() {
        const imagePaths = [];

        imagePaths[1] = [];
        for (let i = 1; i <= 4; i++) {
            const imagePath = `./img/2.Enemy/2 Jelly fish/Dead/Lila/L${i}.png`;
            imagePaths[1].push(imagePath);
        }

        imagePaths[2] = [];
        for (let i = 1; i <= 4; i++) {
            const imagePath = `./img/2.Enemy/2 Jelly fish/Dead/Yellow/y${i}.png`;
            imagePaths[2].push(imagePath);
        }

        return imagePaths;
    }
}
