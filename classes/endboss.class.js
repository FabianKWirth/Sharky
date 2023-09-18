/**
 * Represents an end boss character in the game.
 * @class
 * @extends MoveableObject
 */
class Endboss extends MoveableObject {

    /**
     * The y-coordinate of the end boss's position.
     * @type {number}
     */
    y = 90;

    /**
     * The height of the end boss.
     * @type {number}
     */
    height = 300;

    /**
     * The width of the end boss.
     * @type {number}
     */
    width = 300;

    /**
     * The amount of damage the end boss deals.
     * @type {number}
     */
    damage = 50;

    /**
     * The speed of the end boss.
     * @type {number}
     */
    speed = 8;

    /**
     * The health points of the end boss.
     * @type {number}
     */
    health = 1500;

    /**
    * The maximum health of the end boss.
    * @type {number}
    */
    max_health = 1500;

    /**
     * A flag indicating whether the end boss has been initiated.
     * @type {boolean}
     */
    isInitiated = false;

    /**
     * The ID of the first image for spawning the end boss.
     * @type {number}
     */
    imageSpawnId = 0;

    /**
     * The ID of the first image for the end boss's death animation.
     * @type {number}
     */
    imageDieId = 0;

    /**
     * An array of image paths for the end boss's floating animation.
     * @type {string[]}
     */
    IMAGES_FLOAT = this.getImagePaths("float");

    /**
     * An array of image paths for the end boss's spawning animation.
     * @type {string[]}
     */
    IMAGES_SPAWN = this.getImagePaths("spawn");

    /**
     * An array of image paths for the end boss's attack animation.
     * @type {string[]}
     */
    IMAGES_ATTACK = this.getImagePaths("attack");

    /**
     * An array of image paths for the end boss's hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = this.getImagePaths("hurt");

    /**
     * An array of image paths for the end boss's death animation.
     * @type {string[]}
     */
    IMAGES_DIE = this.getImagePaths("die");


    /**
     * Create a new end boss character.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_FLOAT);
        this.loadImages(this.IMAGES_SPAWN);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DIE);
        this.x = 2500;
    }


    /**
     * Adds the endboss to the game
     */
    init() {
        this.isInitiated = true;
        this.animate();
        world.bossStatusBar = new StatusBar("bossLife");
        setTimeout(() => {
            this.attackCharacter();
        }, 1000);
    }


    /**
    * Inflicts damage to the object and handles its health status.
    * @param {number} damage - The amount of damage to inflict.
    */
    hit(damage) {
        this.health -= damage;
        this.playHitAudio();
        world.bossStatusBar.setPercentage((this.health/this.max_health)*100);
        
        if (this.isDead()) {
            this.die();
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Sets the hitbox dimensions and position for the end boss character.
     * @memberof Endboss
     */
    setHitbox() {
        this.hitboxHeight = 120;
        this.hitboxWidth = 250;
        this.hitBoxX = this.x + 20;
        this.hitBoxY = this.y + 140;
    }

    /**
    *   Overwrites default die() function;
    *   Calls function to end the game after death
    *   @memberof Endboss
    */
    die() {
        this.speed = 0;
        if (this.dead == false) {
            this.dead = true;
            setTimeout(() => {
                endGame("win");
            }, 1000);
        }

    }

    /**
    * Initiates the attack behavior of the end boss character.
    * If initiated, the end boss character repeatedly checks for collisions with the player character.
    * If a collision occurs, the player character is damaged, and the last attack timestamp is updated.
    * @memberof Endboss
    */
    attackCharacter() {
        if (this.isInitiated) {
            this.setHitbox();
            setStoppableInterval(() => {
                if (this.world.character.isColliding(this)) {
                    this.world.character.hit(this.damage);
                    this.lastAttack = new Date().getTime();
                } else {
                    this.moveToCharacter();
                }
            }, 200);
        }
    }

    /**
    * Checks if the end boss character is currently in an attacking state.
    * @memberof Endboss
    * @returns {boolean} True if the character is attacking; otherwise, false.
    */
    isAttacking() {
        return (new Date().getTime() - this.lastAttack < 300);
    }


    /**
    * Moves the end boss character toward the player character.
    * The character's position is adjusted based on the player character's hitbox.
    * @memberof Endboss
    */
    moveToCharacter() {
        this.setHitbox();
        
        if (this.hitBoxX+this.hitboxWidth < this.world.character.hitBoxX) {
            this.x += this.speed;
            this.otherDirection = true;
        } else if (this.hitBoxX > this.world.character.hitBoxX) {
            this.x -= this.speed;
            this.otherDirection = false;
        }

        if (this.hitBoxY < this.world.character.hitBoxY) {
            this.y += this.speed;
        } else if (this.hitBoxY > this.world.character.hitBoxY) {
            this.y -= this.speed;
        }
       
    }


    /**
    * Initiates the animation behavior of the end boss character.
    * If initiated, the end boss character plays various animations based on its state.
    * @memberof Endboss
    */
    animate() {
        setStoppableInterval(() => {
            if (this.imageSpawnId < 10) {
                this.imageSpawnId = this.playAnimationOnce(this.IMAGES_SPAWN, this.imageSpawnId);
            } else if (this.isDead()) {
                this.imageDieId = this.playAnimationOnce(this.IMAGES_DIE, this.imageDieId);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAttacking()) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else {
                this.playAnimation(this.IMAGES_FLOAT);
            }
        }, 100);
    }


    /**
    * Generates an array of image paths based on the specified image types.
    * @param {string} imageTypes - The type of images to generate paths for.
    * @returns {string[]} An array of image paths.
    */
    getImagePaths(imageTypes) {
        const imagePaths = [];
        switch (imageTypes) {
            case "float":
                for (let i = 1; i <= 13; i++) {
                    const imagePath = `./img/2.Enemy/3 Final Enemy/2.floating/${i}.png`;
                    imagePaths.push(imagePath);
                }
                break;
            case "spawn":
                for (let i = 1; i <= 10; i++) {
                    const imagePath = `./img/2.Enemy/3 Final Enemy/1.Introduce/${i}.png`;
                    imagePaths.push(imagePath);
                }
                break;
            case "attack":
                for (let i = 1; i <= 6; i++) {
                    const imagePath = `./img/2.Enemy/3 Final Enemy/Attack/${i}.png`;
                    imagePaths.push(imagePath);
                }
                break;
            case "hurt":
                for (let i = 1; i <= 4; i++) {
                    const imagePath = `./img/2.Enemy/3 Final Enemy/Hurt/${i}.png`;
                    imagePaths.push(imagePath);
                }
                break;
            case "die":
                for (let i = 5; i <= 10; i++) {
                    const imagePath = `./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia ${i}.png`;
                    imagePaths.push(imagePath);
                }
                break;
        }
        return imagePaths;
    }
}
