/**
 * Represents a Poison Bottle, which is a type of MoveableObject.
 * @extends MoveableObject
 */
class PoisonBottle extends MoveableObject {

    /**
     * The image paths for the Poison Bottle animation.
     * @type {string[]}
     */
    IMG_BOTTLE = this.getImagePaths();

    /**
     * The amount of poison in the bottle.
     * @type {number}
     */
    poisonAmount = 40;

    
    /**
    * Create a new Poison Bottle object.
    * @param {number} spawnPoint - The x-coordinate spawn point of the bottle.
    */
    constructor(spawnPoint) {
        super();
        this.loadImg("./img/4. Marcadores/Posión/Animada/1.png");
        this.loadImages(this.IMG_BOTTLE);
        this.speed=0.011;
        this.hitAudioSrc="./audio/poison-bottle.mp3";
        this.x = spawnPoint;
        this.y=-100;
        this.apply
        this.animate();
        this.applyDraft();
    }

    
    /**
     * Sets the Poison Bottle Movement while falling.
     */
    applyDraft() {
        this.speed=Math.random()*4-2;
        setStoppableInterval(() => {
            if(this.isAboveGround()){
                this.x+=this.speed;
                this.y -= this.updraft;
                this.updraft -= 0.005;
            }
        }, 1000 / 60);
    }


    /**
    * Set the hitbox properties for the posion-bottle.
    * This method updates the hitbox height, width, and position based on the character's current position.
    */
    setHitbox(){
        this.hitboxHeight = 59;
        this.hitboxWidth = 56;
        this.hitBoxX = this.x + 22;
        this.hitBoxY = this.y + 35;
    }

    /**
    * Animate the Poison Bottle's movement.
    */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMG_BOTTLE);
        }, 200);
    }


    /**
    * Get the image paths for the Poison Bottle animation.
    * @returns {string[]} An array of image paths.
    */
    getImagePaths() {
        const imagePaths = [];
        for (let i = 1; i <= 8; i++) {
            const imagePath = `./img/4. Marcadores/Posión/Animada/${i}.png`;
            imagePaths.push(imagePath);
        }
        return imagePaths;
    }
}