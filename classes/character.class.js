/**
 * Represents a character in the game.
 * @extends MoveableObject
 */
class Character extends MoveableObject {

    /**
     * The game world to which the character belongs.
     * @type {World}
     */
    world;
    /**
     * The audio element for the walking sound of the character.
     * @type {Audio}
     */
    swimming_sound = new Audio("./audio/swim3.mp3");
    /**
     * The audio element for the shooting sound of the character.
     * @type {Audio}
     */
    shooting_sound = new Audio("./audio/shoot.mp3");

    hitAudioSrc = "/audio/electric-hurt.mp3";

    /**
     * The maximum health of the character.
     * @type {number}
     */
    max_health = 1000;

    /**
     * The current health of the character.
     * @type {number}
     */
    health = 1000;

    /**
    * The index of the current bubble used by the character.
    * @type {number}
    */
    bubbleIndex = 0;

    /**
     * The amount of poison affecting the character.
     * @type {number}
     */
    posionAmount = 0;

    /**
     * The maximum poison level the character can have.
     * @type {number}
     */
    poisonMax = 100;

    /**
     * An array to store bubbles used by the character.
     * @type {Bubble[]}
     */
    bubbles = [];

    /**
     * The timestamp representing the last time the character was poisoned.
     * @type {number}
     */
    lastPoisoned = 0;

    /**
     * The ID of the image used for the character when dead due to electrical damage.
     * @type {number}
     */
    imageDeadElektroId = 0;

    /**
     * The ID of the image used for the character when dead due to poison damage.
     * @type {number}
     */
    imageDeadPoisonId = 0;


    /**
     * An array of image paths for the character's swimming animation.
     * @type {string[]}
     */
    IMAGES_SWIMMING = this.getImagePaths("swimming");

    /**
     * An array of image paths for the character's stationary animation.
     * @type {string[]}
     */
    IMAGES_STATIONARY = this.getImagePaths("stationary");

    /**
     * An array of image paths for the character's dead animation due to poison damage.
     * @type {string[]}
     */
    IMAGES_DEAD_POISON = this.getImagePaths("dead-poison");

    /**
     * An array of image paths for the character's dead animation due to electrical damage.
     * @type {string[]}
     */
    IMAGES_DEAD_ELEKTRO = this.getImagePaths("dead-elektro");

    /**
     * An array of image paths for the character's hurt animation due to poison damage.
     * @type {string[]}
     */
    IMAGES_HURT_POISON = this.getImagePaths("hurt-poison");

    /**
     * An array of image paths for the character's hurt animation due to electrical damage.
     * @type {string[]}
     */
    IMAGES_HURT_ELEKTRO = this.getImagePaths("hurt-elektro");

    /**
     * An array of image paths for the character's bubble attack animation.
     * @type {string[]}
     */
    IMAGES_ATTACK_BUBBLE = this.getImagePaths("bubble-attack");


    /**
    * Represents a character in the game.
    * @extends MoveableObject
    */
    constructor() {
        super();
        this.height = 200;
        this.width = 200;
        this.y = 100;
        this.loadImg("img/1.Sharkie/1.IDLE/1.png");
        this.hitboxHeight = 100;
        this.hitboxWidth = 150;
        this.hitBoxX = this.x + 20;
        this.hitBoxY = this.y - 30;
        this.loadAnimationImages();
        this.readKeyboardInputs();
        this.animate();
    }

    /**
    * Load animation images for the character.
    * This method loads various sets of animation images, including swimming, stationary, dead (due to electrical or poison damage),
    * hurt (due to electrical or poison damage), and bubble attack animations for the character.
    */
    loadAnimationImages() {
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_STATIONARY);
        this.loadImages(this.IMAGES_DEAD_ELEKTRO);
        this.loadImages(this.IMAGES_DEAD_POISON);
        this.loadImages(this.IMAGES_HURT_ELEKTRO);
        this.loadImages(this.IMAGES_HURT_POISON);
        this.loadImages(this.IMAGES_ATTACK_BUBBLE);
    }


    /**
    * Set the hitbox properties for the character.
    * This method updates the hitbox height, width, and position based on the character's current position.
    */
    setHitbox() {
        this.hitboxHeight = 70;
        this.hitboxWidth = 110;
        this.hitBoxX = this.x + 45;
        this.hitBoxY = this.y + 95;
    }


    /**
    * Inflict damage to the character and update its health.
    * This method subtracts the specified damage from the character's health and checks if the character has died.
    * If the character's health falls below zero, it will die; otherwise, it will update the health percentage.
    * @param {number} damage - The amount of damage to inflict on the character.
    */
    hit(damage) {
        this.health -= damage;
        this.playHitAudio();
        let percentage = 0;
        if (this.isDead()) {
            this.health = 0;
            this.die();
        } else {
            this.lastHit = new Date().getTime();
            percentage = this.health / this.max_health * 100;
        }
        this.world.lifeStatusBar.setPercentage(percentage);
    }


    /**
     * Check if the character is dead.
     *
     * @returns {boolean} `true` if the character's health is less than or equal to zero, indicating it is dead; otherwise, `false`.
     */
    isDead() {
        return this.health <= 0;
    }


    /**
    * Read keyboard inputs and control character movement and actions accordingly.
    * This method continuously checks the state of keyboard inputs and performs corresponding actions,
    * such as moving the character, performing a bubble attack, and updating the camera's position.
    */
    readKeyboardInputs() {
        setStoppableInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveCharacterRight();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveCharacterLeft();
            }

            if (this.world.keyboard.UP && this.isBeyondTop()) {
                this.moveCharacterUp();
            }

            if (this.world.keyboard.DOWN && this.isAboveGround()) {
                this.moveCharacterDown();
            }

            if (this.world.keyboard.SPACE) {
                this.bubbleAttack();
            }

            this.world.cameraFollow(this.x);
        }, 1000 / 60);
    }


    /**
    * Animate the character based on its current state and actions.
    * This method continuously updates the character's animation based on its state, including being dead or hurt,
    * performing a bubble attack, or simply swimming or remaining stationary.
    */
    animate() {
        setStoppableInterval(() => {
            if (this.isDeadPoison()) {
                this.imageDeadPoisonId = this.playAnimationOnce(this.IMAGES_DEAD_POISON, this.imageDeadPoisonId);
            } else if (this.isDead()) {
                this.imageDeadElektroId = this.playAnimationOnce(this.IMAGES_DEAD_ELEKTRO, this.imageDeadElektroId);
            } else if (this.isHurtPoison() == true) {
                this.playAnimation(this.IMAGES_HURT_POISON);
            } else if (this.isHurt() == true) {
                this.playAnimation(this.IMAGES_HURT_ELEKTRO);
            } else if (!this.bubbleAttackCastable()) {
                this.playAnimation(this.IMAGES_ATTACK_BUBBLE);
            } else if (this.world.keyboard.SPACE || this.world.keyboard.LEFT || this.world.keyboard.RIGHT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.playAnimation(this.IMAGES_SWIMMING);
            } else {
                this.playAnimation(this.IMAGES_STATIONARY);
            }
        }, 100);
    }


    /**
    * Set the poison amount on the character and update related properties.
    *
    * @param {number} amount - The amount of poison to set on the character.
    */
    setPoison(amount) {
        this.posionAmount += amount;
        this.world.poisonStatusBar.setPercentage(this.posionAmount / this.poisonMax * 100);

        if (this.isDeadPoison()) {
            this.die();
        } else {
            this.lastPoisoned = new Date().getTime();
        }
    }


    /**
    * Check if the character is currently in a hurt state due to poison damage.
    *
    * @returns {boolean} `true` if the character was recently poisoned and is in a hurt state; otherwise, `false`.
    */
    isHurtPoison() {
        return (new Date().getTime() - this.lastPoisoned) < 600;
    }


    /**
    * Check if the character is dead due to poison damage.
    * @returns {boolean} `true` if the character's poison amount has reached or exceeded the poison maximum; otherwise, `false`.
    */
    isDeadPoison() {
        return this.posionAmount >= this.poisonMax;
    }


    /**
    * Handle the character's death.
    * This method stops the character's movement and triggers the end of the game with a loss after a delay.
    */
    die() {
        this.speed = 0;
        if (this.dead == false) {
            this.dead = true;
            setTimeout(() => {
                endGame("loss");
            }, 2000);
        }
    }


    /**
    * Perform a bubble attack if the character is eligible to do so.
    * This method initiates a bubble attack animation and creates a new bubble projectile if the character meets the conditions.
    * A cooldown period is applied to limit the frequency of bubble attacks.
    */
    bubbleAttack() {
        if (this.bubbleAttackCastable()) {
            this.currentImage = 0;
            playAudio(this.shooting_sound);
            setTimeout(() => {
                if (this.otherDirection == true) {
                    this.bubbles.push(new BubbleAttack((this.hitBoxX + 10), (this.hitBoxY + 15), -this.speed));
                } else {
                    this.bubbles.push(new BubbleAttack((this.hitBoxX + 90), (this.hitBoxY + 15), this.speed));
                }
            }, 400);
            this.lastAttack = new Date().getTime();
        }
    }


    /**
    * Check if the character is currently able to cast a bubble attack.
    * @returns {boolean} `true` if the character has cast a bubble attack recently and is on cooldown; otherwise, `false`.
    */
    bubbleAttackCastable() {
        return (new Date().getTime() - this.lastAttack > 400);
    }


    /**
    * Move the character to the left.
    * This method updates the character's horizontal position to move it to the left,
    * adjusts the camera position, plays a swimming sound, and sets the character's direction.
    */
    moveCharacterLeft() {
        this.x -= this.speed * 10;
        this.world.camera_x = -(this.x - this.height);
        playAudio(this.swimming_sound);
        this.otherDirection = true;
    }


    /**
    * Move the character to the right.
    * This method updates the character's horizontal position to move it to the right,
    * plays a walking sound, sets the character's direction, and initiates an end boss if a condition is met.
    */
    moveCharacterRight() {
        this.x += this.speed * 10;
        playAudio(this.swimming_sound);
        this.otherDirection = false;
        this.world.camera_x = -this.x;
        if (this.x > 2000) {
            if (world.level.endBoss[0].isInitiated == false) {

                this.initiateEndboss();
                playBackGroundAudio("./audio/background-dramatic.mp3");
            }
        }
    }


    /**
    * Move the character upward.
    * This method updates the character's vertical position to move it upward, plays a walking sound,
    * and sets the character's direction.
    */
    moveCharacterUp() {
        this.y -= this.speed * 10;
        playAudio(this.swimming_sound);
        this.otherDirection = false;
    }


    /**
    * Move the character downward.
    * This method updates the character's vertical position to move it downward, plays a walking sound,
    * and sets the character's direction.
    */
    moveCharacterDown() {
        this.y += this.speed * 10;
        playAudio(this.swimming_sound);
        this.otherDirection = false;
    }


    /**
     * Trigger the initialization of the first end boss entity in the game world's level.
     */
    initiateEndboss() {
        this.world.level.endBoss[0].init();

    }


    /**
    * Get an array of image paths based on the specified image type.
    * @param {string} imageTypes - The type of images to retrieve, such as "swimming," "stationary," "dead-poison," etc.
    * @returns {Array<string>} An array of image paths corresponding to the specified image type.
    */
    getImagePaths(imageTypes) {
        const imagePaths = [];

        switch (imageTypes) {
            case "swimming":
                for (let i = 1; i <= 6; i++) {
                    const imagePath = `./img/1.Sharkie/3.Swim/${i}.png`;
                    imagePaths.push(imagePath);
                }
                break;
            case "stationary":
                for (let i = 1; i <= 18; i++) {
                    const imagePath = `./img/1.Sharkie/1.IDLE/${i}.png`;
                    imagePaths.push(imagePath);
                }
                break;
            case "dead-poison":
                for (let i = 1; i <= 12; i++) {
                    const imagePath = `./img/1.Sharkie/6.dead/1.Poisoned/${i}.png`;
                    imagePaths.push(imagePath);
                }
                break;
            case "dead-elektro":
                for (let i = 1; i <= 10; i++) {
                    const imagePath = `./img/1.Sharkie/6.dead/2.Electro_shock/${i}.png`;
                    imagePaths.push(imagePath);
                }
                break;
            case "hurt-poison":
                for (let i = 1; i <= 5; i++) {
                    const imagePath = `./img/1.Sharkie/5.Hurt/1.Poisoned/${i}.png`;
                    imagePaths.push(imagePath);
                }
                break;
            case "hurt-elektro":
                for (let i = 1; i <= 3; i++) {
                    const imagePath = `./img/1.Sharkie/5.Hurt/2.Electric shock/${i}.png`;
                    imagePaths.push(imagePath);
                }
                break;
            case "bubble-attack":
                for (let i = 1; i <= 8; i++) {
                    const imagePath = `./img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/${i}.png`;
                    imagePaths.push(imagePath);
                }
                break;
        }
        return imagePaths;
    }

}