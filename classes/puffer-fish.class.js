/**
 * Class representing a Puffer Fish.
 * @extends MoveableObject
 */
class PufferFish extends MoveableObject {


    IMAGES_FISH_SWIMMING = this.getCompleteImagePaths("swimming");
    IMAGES_FISH_BUBBLE_SWIMMING = this.getCompleteImagePaths("bubbleswim");
    IMAGES_FISH_TRANSITION = this.getCompleteImagePaths("transition");
    IMAGES_FISH_DIE_NORMAL = this.getCompleteImagePaths("dead-swimming");
    IMAGES_FISH_DIE_BUBBLE = this.getCompleteImagePaths("dead-bubbleswim");
    fishTypeId = 1;
    currentSwimMode = 'normal';
    transferToBubble = false;
    transferToNormal = false;
    transformStart = 0;//DATE
    lastTurn = 0; //DATE
    world;

    /**
    * Creates a new PufferFish object.
    * @param {number} fishTypeId - The unique identifier for the fish type.
    */
    constructor(fishTypeId) {
        super();
        this.height = 80;
        this.width = 80;
        this.damage = 5;
        this.health = 20;
        this.fishTypeId = fishTypeId;

        this.loadAnimationImages(fishTypeId);
        this.setSpawnPoint();
        this.setRandomFishSpeed();
        this.setMovement();
        this.animate();
    }

    
    /**
    * Load animation images for the Puffer Fish based on its fish type.
    *
    * @param {number} fishTypeId - The ID representing the type of fish (Puffer Fish).
    */
    loadAnimationImages(fishTypeId) {
        this.loadImages(this.IMAGES_FISH_SWIMMING[fishTypeId]);
        this.loadImages(this.IMAGES_FISH_TRANSITION[fishTypeId]);
        this.loadImages(this.IMAGES_FISH_BUBBLE_SWIMMING[fishTypeId]);
        this.loadImages(this.IMAGES_FISH_DIE_NORMAL[fishTypeId]);
        this.loadImages(this.IMAGES_FISH_DIE_BUBBLE[fishTypeId]);
    }


    /**
    * Set the spawn point for the Puffer Fish.
    * This method sets the X and Y coordinates of the Puffer Fish's spawn point.
    * The X-coordinate is randomly generated within a specified range,
    * and the Y-coordinate is determined by the result of the `setYPosition` method.
    */
    setSpawnPoint() {
        this.x = 800 + Math.random() * 1600;
        this.y = this.setYPosition();
    }


    /**
     * Set the Y-coordinate position for the Puffer Fish's spawn point.
     * This method generates a random Y-coordinate within a specified range.
     *
     * @returns {number} The randomly generated Y-coordinate for the spawn point.
     */
    setYPosition() {
        let max = 400;
        let min = 40;
        var y = Math.round(Math.random() * (max - min)) + min;
        return y;
    }


    /**
    * Set a random speed for the Puffer Fish.
    * This method generates a random speed value within a specified range and updates the fish's speed property.
    */
    setRandomFishSpeed() {
        this.speed = Math.random() * 2 * 1 + 3;
    }


    /**
    * Set the hitbox properties for the Puffer Fish.
    * This method defines the dimensions and position of the Puffer Fish's hitbox.
    */
    setHitbox() {
        this.hitboxHeight = 60;
        this.hitboxWidth = 60;
        this.hitBoxX = this.x + 6;
        this.hitBoxY = this.y + 2;
    }


    /**
    * This method records the start time of the transformation.
    */
    startTransformation() {
        this.transformStart = new Date().getTime();
    }


    /**
    * Trigger the bubble swimming behavior for the Puffer Fish.
    *  Each call there is a 1% Chance to trigger it if it hasent been triggeren in the last 5 secons
    * @returns {boolean} `true` if the bubble swim should be triggered, otherwise `false`.
    */
    triggerBubbleSwim() {
        return (Math.random() * 100 < 1) && new Date().getTime() - this.transformStart > 5000;
    }


    /**
    * Check if the Puffer Fish is currently in the process of transformation.
    *
    * @returns {boolean} `true` if the Puffer Fish is transforming, otherwise `false`.
    */
    isTransforming() {
        let timepassed = new Date().getTime() - this.transformStart;
        return timepassed < 30;
    }


    /**
    * Toggle between normal swimming and bubble swimming for the Puffer Fish based on certain conditions.
    * This method checks whether the conditions for toggling between swimming modes are met and
    * initiates the corresponding swimming mode if appropriate.
    */
    toggleBubbleSwim() {
        if (this.triggerBubbleSwim()) {
            if (this.isTransforming() == false) {
                if (this.currentSwimMode == 'normal') {
                    this.initBubbleSwim();
                } else if (this.currentSwimMode == 'bubble') {
                    this.initNormalSwim();
                }
                this.startTransformation();
            }
        }
    }


    /**
    * Initialize the Puffer Fish for bubble swimming mode.
    * This method updates the Puffer Fish's swim mode, speed, and hitbox height for bubble swimming.
    */
    initBubbleSwim() {
        this.currentSwimMode = 'bubble';
        this.speed = this.speed / 1.5;
        this.hitboxHeight = 60;
    }


    /**
    * Initialize the Puffer Fish for normal swimming mode.
    * This method updates the Puffer Fish's swim mode, speed, and hitbox height for normal swimming.
    */
    initNormalSwim() {
        this.currentSwimMode = 'normal';
        this.speed = this.speed * 1.5;
        this.hitboxHeight = 80;
    }


    /**
    * Initialize the Puffer Fish for normal swimming mode.
    * This method updates the Puffer Fish's swim mode, speed, and hitbox height for normal swimming.
    */
    turnAround() {
        if (this.checkJustTurned() == false) {
            this.speed = this.speed * (-1);
            this.lastTurn = new Date().getTime();
            if (this.otherDirection == true) {
                this.otherDirection = false;
                this.lastTurn = new Date().getTime();
            } else {
                this.otherDirection = true;
                this.lastTurn = new Date().getTime();
            }
        }
    }


    /**
    * Move the Puffer Fish horizontally based on its current speed.
    * This method updates the X-coordinate of the Puffer Fish and handles turning around
    * when it reaches the edges of the game world.
    */
    move() {
        this.x -= this.speed;
        if (this.world != null) {
            if (this.x < 0 || this.x > this.world.level.level_end_x) {
                this.turnAround();
            }
        } else {
            if (this.x < 0) {
                this.turnAround();
            }
        }
    }


    /**
    * Check if the Puffer Fish has recently turned around.
    * This method determines whether the Puffer Fish has performed a recent direction change (turn) within the last 2000 milliseconds (2 seconds).
    *
    * @returns {boolean} `true` if the Puffer Fish has turned recently, otherwise `false`.
    */
    checkJustTurned() {
        return (new Date().getTime() - this.lastTurn) < 2000;
    }


    /**
    * Animate the Puffer Fish.
    * This method continuously updates the animation based on the Puffer Fish's state, including swimming, transformation, or death.
    * The animation is played at a rate of 60 frames per second.
    */
    animate() {
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playDieAnimation();
            } else {
                if (this.isTransforming()) {
                    this.playTransformAnimation();
                } else {
                    this.playSwimAnimation();
                }
            }
        }, 1000/60);
    }


    /**
     * Set up continuous movement and swimming behavior for the Puffer Fish.
     * This method creates a stoppable interval to control the Puffer Fish's movement,
     * which includes toggling between normal and bubble swimming modes and updating its position.
     * The interval runs at a rate of 60 updates per second.
     */
    setMovement() {
        setStoppableInterval(() => {
            this.toggleBubbleSwim();
            this.move();
        }, 1000 / 60);
    }


    /**
    * Play the death animation for the Puffer Fish.
    * Depending on the current swim mode, this method plays the appropriate death animation
    * and updates the hitbox height accordingly.
    */
    playDieAnimation() {
        if (this.currentSwimMode == 'normal') {
            this.playAnimation(this.IMAGES_FISH_DIE_NORMAL[this.fishTypeId]);
        } else {
            this.hitboxHeight = 80;
            this.playAnimation(this.IMAGES_FISH_DIE_BUBBLE[this.fishTypeId]);
        }
    }


    /**
    * Play the swimming animation for the Puffer Fish.
    * Depending on the current swim mode, this method plays the appropriate swimming animation
    * and updates the hitbox height accordingly.
    */
    playSwimAnimation() {
        if (this.currentSwimMode == 'normal') {
            this.playAnimation(this.IMAGES_FISH_SWIMMING[this.fishTypeId]);
        } else {
            this.hitboxHeight = 80;
            this.playAnimation(this.IMAGES_FISH_BUBBLE_SWIMMING[this.fishTypeId]);
        }
    }


    /**
    * Play the transformation animation for the Puffer Fish.
    * This method plays the transformation animation for the Puffer Fish.
    */
    playTransformAnimation() {
        this.playAnimation(this.IMAGES_FISH_TRANSITION[this.fishTypeId]);
    }


    /**
    * Get complete image paths for multiple Puffer Fish types and a specific swim mode.
    *
    * @param {string} imageTypes - The type of images to retrieve (e.g., "swimming", "transition", "bubbleswim", "dead-swimming", "dead-bubbleswim").
    *
    * @returns {string[][]} An array of arrays containing image paths for each Puffer Fish type and the specified image type.
    */
    getCompleteImagePaths(imageTypes) {
        const imagePaths = [];
        const fishTypeIds = [1, 2, 3];
        fishTypeIds.forEach(fishTypeId => {
            imagePaths[fishTypeId] = this.getFishSpecificImagePaths(fishTypeId, imageTypes);
        });
        return imagePaths;
    }


    /**
    * Get an array of image paths specific to the Puffer Fish and its swim mode.
    *
    * @param {number} fishTypeId - The ID representing the type of fish (Puffer Fish).
    * @param {string} imageTypes - The type of images to retrieve (e.g., "swimming", "transition", "bubbleswim", "dead-swimming", "dead-bubbleswim").
    *
    * @returns {string[]} An array of image paths corresponding to the specified fish type and image type.
    */
    getFishSpecificImagePaths(fishTypeId, imageTypes) {
        const imagePaths = [];
        switch (imageTypes) {
            case "swimming":
                for (let i = 1; i <= 5; i++) {
                    const imagePath = `./img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${fishTypeId}.swim${i}.png`;
                    imagePaths.push(imagePath);
                }
                break;
            case "transition":
                for (let i = 1; i <= 5; i++) {
                    const imagePath = `./img/2.Enemy/1.Puffer fish (3 color options)/2.transition/${fishTypeId}.transition${i}.png`;
                    imagePaths.push(imagePath);
                }
                break;
            case "bubbleswim":
                for (let i = 1; i <= 5; i++) {
                    const imagePath = `./img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/${fishTypeId}.bubbleswim${i}.png`;
                    imagePaths.push(imagePath);
                }
                break;
            case "dead-swimming":
                const imagePath = `./img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/${fishTypeId}.1.png`;
                imagePaths.push(imagePath);
                break;
            case "dead-bubbleswim":
                for (let i = 1; i <= 8; i++) {
                    const imagePath = `./img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/${fishTypeId}.3.png`;
                    imagePaths.push(imagePath);
                }
                break;
        }
        return imagePaths;
    }
}
