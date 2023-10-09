/**
 * Represents a JellyFish, which is a type of MoveableObject.
 * @extends MoveableObject
 */
class JellyFish extends MoveableObject {

    fishTypeId;
    world;

    /**
     * Create a new JellyFish.
     */
    constructor() {
        super();
        this.loadImg("./img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");
        this.health = 20;
        this.speed = 4;
    }


    /**
    * Set a random speed for the fish.
    * This method sets the speed property of the fish to a random value between 2 and 4 (inclusive).
    */
    setRandowFishSpeed() {
        this.speed = Math.random() * 3 + 3;
    }


    /**
    * Moves the JellyFish vertically.
    */
    move() {
        this.y += this.speed;
        if (!this.isBeyondTop()) {
            this.speed = this.speed * (-1);
        } else if (!this.isAboveGround()) {
            this.speed = this.speed * (-1);
        }
    }


    /**
    * Initiates the movement animation loop for the Jellyfish object.
    */
    setMovement() {
        if (!World.stopGame){
            setStoppableInterval(() => {
                this.move();
            }, 1000 / 30);
        }
    }


    /**
    * Initiates the animation loop for the Jellyfish object.
    * The Jellyfish alternates between its swimming animation and dying animation if it's dead.
    */
    animate() {
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_FISH_DYING[this.fishTypeId]);
            } else {
                this.playAnimation(this.IMAGES_FISH_SWIMMING[this.fishTypeId]);
            }
        }, 1000 / 10);
    }
}