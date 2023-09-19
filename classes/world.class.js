class World {
    /**
     * The current game level.
     * @type {Level}
     */
    level;

    /**
     * The HTML canvas element for rendering the game.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * The 2D rendering context of the canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * The keyboard input manager.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * The x-coordinate of the camera.
     * @type {number}
     */
    camera_x = 0;

    /**
     * The total number of coins in the game.
     * @type {number}
     */
    totalCoins;

    /**
     * The number of collected coins.
     * @type {number}
     */
    collectedCoins;

    /**
     * The camera offset (0=right, 900=left).
     * @type {number}
     */
    cameraOffset = 0;

    /**
     * The game character.
     * @type {Character}
     */
    character;

    /**
     * The status bar for displaying life information.
     * @type {StatusBar}
     */
    lifeStatusBar;

    /**
     * The status bar for displaying coin information.
     * @type {StatusBar}
     */
    coinStatusBar;

    /**
     * The status bar for displaying poison information.
     * @type {StatusBar}
     */
    poisonStatusBar;

    /**
     * The status bar for displaying endboss health information.
     * @type {StatusBar}
     */
    bossStatusBar;

    /**
     * A flag indicating whether the game is stopped.
     * @type {boolean}
     * @static
     */
    static stopGame = true;


    /**
    * Creates a new instance of the game world.
    * @param {HTMLCanvasElement} canvas - The game canvas element.
    * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
    * @param {Keyboard} keyboard - The keyboard input manager.
    * @constructor
    */
    constructor(canvas, ctx, keyboard) {

        this.ctx = ctx;
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character = new Character();
        this.lifeStatusBar = new StatusBar("life");
        this.coinStatusBar = new StatusBar("coin");
        this.poisonStatusBar = new StatusBar("poison");
        initLevel1();
        this.level = level1;
        this.collectedCoins = 0;
        this.totalCoins = this.level.coinBows.length * 5;
        Promise.resolve(this.setWorld()).then(() => {
            World.stopGame = false;
            world.draw();
            this.checkCollisions();
        });

        playBackGroundAudio(musicPath);
    }


    /**
    * Sets the world reference for the character, end bosses, and enemies to establish their connection to the game world.
    * @memberof World
    */
    setWorld() {
        this.character.world = this;

        this.level.endBoss.forEach(endBoss => {
            endBoss.world = this;
        });
    }


    /**
    * Draws the game world including background, characters, enemies, objects, and status bars on the game canvas.
    * @memberof World
    */
    draw() {
        if (World.stopGame) {
            return; // Exit the function if the game is Stopped
        }

        this.setCamera(-this.camera_x);
        this.drawBackGround();
        this.drawCharacter();
        this.drawEnemies();
        this.drawOtherObjects();
        this.setCamera(this.camera_x);
        this.drawStatusBars();

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
    * Draws the status bars (e.g., life, coin, poison) on the game canvas.
    * @memberof World
    */
    drawStatusBars() {
        this.addToMap(this.lifeStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.poisonStatusBar);
        if (this.bossStatusBar) {
            this.addToMap(this.bossStatusBar);
        }
    }


    /**
    * Draws the background objects on the game canvas.
    * @memberof World
    */
    drawBackGround() {
        this.addObjectsToMap(this.level.backGroundObjects);
    };


    /**
    * Draws the character and their bubbles on the game canvas.
    * @memberof World
    */
    drawCharacter() {
        this.addToMap(this.character);
        this.character.bubbles.forEach((bubble) => {
            this.addObjectsToMap(bubble);
        });
    }


    /**
    * Draws enemies, poison bottles, and the end boss on the game canvas.
    * @memberof World
    */
    drawEnemies() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.poisonBottles);
        this.addObjectsToMap(this.level.endBoss);
    }


    /**
    * Draws poison bottles, coins on the game canvas.
    * @memberof World
    */
    drawOtherObjects() {
        this.addObjectsToMap(this.level.poisonBottles);
        this.level.coinBows.forEach((coinBow) => {
            this.addObjectsToMap(coinBow.coins);
        });
    }


    /**
    * Adjusts the camera to follow the game character's position.
    * @memberof World
    * @param {number} x - The x-coordinate of the character's position.
    */
    cameraFollow(x) {

        x = Math.abs(x);

        if (this.character.otherDirection && this.cameraOffset > -400) {
            this.cameraOffset -= 6;
        } else if (!this.character.otherDirection && this.cameraOffset < -80) {
            this.cameraOffset += 6;
        }
        let cameraX = x + this.cameraOffset;

        if (cameraX < 0) {
            cameraX = 0;
        }
        if (cameraX > 2150) {
            cameraX = 2150;
        }

        this.camera_x = cameraX;
    }


    /**
    * Sets the camera position by translating the rendering context.
    * @memberof World
    * @param {number} x - The x-coordinate to translate the rendering context by.
    */
    setCamera(x) {
        this.ctx.translate(x, 0);
    }


    /**
    * Periodically checks for collisions between game objects and handles the corresponding interactions.
    * @memberof World
    */
    checkCollisions() {
        setStoppableInterval(() => {
            this.setHitboxes();
            this.enemyHitsCharacter();
            this.poisonBottleHitsCharacter();
            this.bubbleHitsEnemies();
            this.characterCollectsCoins();
        }, 1000 / 20);
    }


    /**
    * Handles character collection of coins from coin bows in the game.
    * @memberof World
    */
    characterCollectsCoins() {
        this.level.coinBows.forEach((coinBow) => {
            for (let i = 0; i < coinBow["coins"].length; i++) {
                const coin = coinBow["coins"][i];
                coin.setHitbox();
                if (this.character.isColliding(coin)) {
                    coin.collectCoin(world, coinBow, i);
                }
            }
        });
    }


    /**
    * Handles enemy attacks on the game character.
    * @memberof World
    */
    enemyHitsCharacter() {
        this.level.enemies.forEach((enemy) => {
            enemy.setHitbox();
            this.character.setHitbox();
            if (this.character.isColliding(enemy)) {
                this.character.hit(enemy.damage);
            }
        });
    }


    /**
    * Handles the effects of poison bottles on the game character.
    * @memberof World
    */
    poisonBottleHitsCharacter() {
        this.level.poisonBottles.forEach((poisonBottle, i) => {
            poisonBottle.setHitbox();
            if (this.character.isColliding(poisonBottle)) {
                this.character.setPoison(poisonBottle.poisonAmount);
                this.level.poisonBottles.splice(i, 1);
                poisonBottle.playHitAudio();
            }
        });
    }


    /**
    * Handles the interaction between character bubbles and enemies in the game.
    * @memberof World
    */
    bubbleHitsEnemies() {
        this.character.bubbles.forEach((bubble, i) => {
            bubble.setHitbox();
            this.level.enemies.forEach((enemy) => {
                if (bubble.isColliding(enemy)) {
                    enemy.hit(bubble.damage);
                    this.character.bubbles.splice(i, 1);
                }
            });
            this.level.endBoss.forEach((boss, i) => {
                boss.setHitbox();
                if (bubble.isColliding(boss)) {
                    boss.hit(bubble.damage);
                    this.character.bubbles.splice(i, 1);
                }
            });
        });
    }


    /**
    * Sets the hitboxes for the game entities, including the character, poison bottles, coins, bubbles, and end boss.
    * @memberof World
    */
    setHitboxes() {
        this.level.coinBows.forEach((coinBow) => {
            for (let i = 0; i < coinBow["coins"].length; i++) {
                const coin = coinBow["coins"][i];
                coin.setHitbox();
            }
        });
    }


    /**
    * Adds a drawable object to the game map, handling image flipping, drawing, and restoration.
    * @memberof World
    * @param {DrawableObject} object - The drawable object to be added to the map.
    */
    addToMap(object) {
        this.flipImg(object);
        object.draw(this.ctx);
        this.restoreFlippedImg(object);
    }


    /**
    * Flips the image horizontally if the object's `otherDirection` property is `true`.
    * @memberof World
    * @param {DrawableObject} object - The drawable object whose image may need to be flipped.
    */
    flipImg(object) {
        if (object.otherDirection) {
            this.ctx.save();
            this.ctx.translate(object.width, 0);
            this.ctx.scale(-1, 1);
            object.x = object.x * (-1);
        }
    }


    /**
    * Restores the canvas to its original state after flipping the image if the object's `otherDirection` property is `true`.
    * @memberof World
    * @param {DrawableObject} object - The drawable object whose image may have been flipped.
    */
    restoreFlippedImg(object) {
        if (object.otherDirection) {
            this.ctx.restore();
            object.x = object.x * (-1);
        }
    }


    /**
    * Adds one or multiple drawable objects to the game map.
    * @memberof World
    * @param {DrawableObject|DrawableObject[]} objects - The drawable object(s) to be added to the map.
    */
    addObjectsToMap(objects) {
        if (Array.isArray(objects)) {
            objects.forEach(object => {
                this.addToMap(object);
            });
        } else {
            this.addToMap(objects);
        }
    }
}