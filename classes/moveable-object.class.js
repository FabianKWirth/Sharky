/**
 * Represents a movable object with health and hitbox properties.
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {

    /**
    * The speed at which the object moves.
    * @type {number}
    */
    speed = 0.5;

    /**
     * The health of the object.
     * @type {number}
     */
    health;

    /**
     * The vertical updraft force affecting the object's movement.
     * @type {number}
     */
    updraft = 0;

    /**
     * Indicates whether the object is moving in the opposite direction.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * The vertical speed of the object.
     * @type {number}
     */
    speedY = 0;

    /**
     * The timestamp of the last hit taken by the object.
     * @type {number}
     */
    lastHit = 0;

    /**
     * The timestamp of the last attack made by the object.
     * @type {number}
     */
    lastAttack = 0;

    /**
     * The index of the current image being displayed.
     * @type {number}
     */
    currentImage = 0;

    /**
     * The height of the object's hitbox for collision detection.
     * @type {number}
     */
    hitboxHeight;

    /**
     * The width of the object's hitbox for collision detection.
     * @type {number}
     */
    hitboxWidth;

    /**
     * The x-coordinate position of the top-left corner of the hitbox.
     * @type {number}
     */
    hitBoxX;

    /**
     * The y-coordinate position of the top-left corner of the hitbox.
     * @type {number}
     */
    hitBoxY;

    /**
     * Indicates whether the object is dead.
     * @type {boolean}
     */
    dead = false;


    /**
     * The audio element if getting hit.
     * @type {Audio}
     */
    hitAudio = new Audio("./audio/hit2.mp3");


    /**
    * Sets the hitbox dimensions and position for collision detection.
    */
    setHitbox() {
        this.hitboxHeight = this.height;
        this.hitboxWidth = this.width;
        this.hitBoxX = this.x;
        this.hitBoxY = this.y;
    }


    /**
    * Plays a hit audio sound if a hit audio source is provided and the game audio is not muted.
    */
    playHitAudio(audioObj) {
        if (!isMuted) {
            playAudio(audioObj);
        }
    }


    /**
    * Inflicts damage to the object and handles its health status.
    * @param {number} damage - The amount of damage to inflict.
    */
    hit(damage) {
        this.health -= damage;
        this.playHitAudio();
        if (this.isDead()) {
            this.die();
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Handle the object's death by stopping its movement and initiating a floating up animation.
     * Additionally, it removes the object from the 'enemies' array after a delay.
     */
    die() {
        this.speed = 0;
        this.damage = 0;
        setStoppableInterval(() => {
            this.y += this.updraft;
            this.updraft -= 0.001;
        });

        setTimeout(() => {
            let index = enemies.indexOf(this);
            if (index !== -1) {
                enemies.splice(index, 1);
            }
        }, 1000);
    }


    /**
    * Check if the object is colliding with another object.
    * @param {MoveableObject} obj - The other object to check for collision.
    * @returns {boolean} True if a collision is detected, otherwise false.
    */
    isColliding(obj) {
        return this.hitBoxX + this.hitboxWidth > obj.hitBoxX &&
            this.hitBoxY + this.hitboxHeight > obj.hitBoxY &&
            this.hitBoxX < obj.hitBoxX + obj.hitboxWidth &&
            this.hitBoxY < obj.hitBoxY + obj.hitboxHeight
    }


    /**
    * Check if the object is positioned above the ground.
    * @returns {boolean} True if the object is above the ground, otherwise false.
    */
    isAboveGround() {
        return this.y < 480 - this.height;
    }


    /**
    * Check if the object's top position is beyond a specified threshold.
    * @returns {boolean} True if the object's top position is beyond the threshold, otherwise false.
    */
    isBeyondTop() {
        return this.y > 10;
    }


    /**
    * Check if the object is currently in a hurt state due to a recent hit.
    * @returns {boolean} True if the object is hurt, otherwise false.
    */
    isHurt() {
        return new Date().getTime() - this.lastHit < 1000;
    }


    /**
    * Check if the object is dead based on its health status.
    * @returns {boolean} True if the object is dead, otherwise false.
    */
    isDead() {
        return this.health <= 0;
    }


    /**
    * Play an animation using a sequence of images.
    * @param {string[]} images - An array of image paths representing the animation frames.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.renderObject(path);
        this.currentImage++;
    }


    /**
    * Play an animation sequence once.
    * @param {string[]} images - An array of image paths representing the animation frames.
    * @param {number} id - The current animation frame index.
    * @returns {number} The updated animation frame index.
    */
    playAnimationOnce(images, id) {
        if (id < images.length) {
            this.renderObject(images[id]);
            id++;
        } else {
            this.renderObject(images[id - 1]);
        }
        return id;
    }


    /**
    * Move the object to the left by a specified speed.
    */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
    * Move the object to the right by a specified speed.
    */
    moveRight() {
        this.x += this.speed;
    }
}