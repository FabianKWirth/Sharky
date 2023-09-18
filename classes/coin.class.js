class Coin extends MoveableObject{

    IMAGES_COIN;
    

    /**
    * Creates a new Coin object with the specified initial position.
    *
    * @param {number} x - The initial x-coordinate of the Coin's position.
    * @param {number} y - The initial y-coordinate of the Coin's position.
    */
    constructor(x,y){
        super();
        this.IMAGES_COIN=this.getCoinImages();
        this.height=40;
        this.width=40;
        this.x=x;
        this.y=y;
        this.loadImg("./img/4. Marcadores/1. Coins/1.png");
        this.loadImages(this.IMAGES_COIN);

        this.animate();
    }


    /**
    * Set the hitbox dimensions and position for the CoinBow object.
    * This method defines the hitbox dimensions (height and width) and position (x and y)
    * for collision detection with other objects in the game world.
    */
    setHitbox() {
        this.hitboxHeight = 40;
        this.hitboxWidth = 40;
        this.hitBoxX = this.x + 0;
        this.hitBoxY = this.y + 0;
    }


    /**
    * Collect a coin from a CoinBow, updating the game world's coin count and status bar.
    *
    * @param {World} world - The game world object.
    * @param {CoinBow} coinBow - The CoinBow from which to collect the coin.
    * @param {number} i - The index of the coin to collect within the CoinBow's array of coins.
    */
    collectCoin(world,coinBow,i){
        coinBow["coins"].splice(i, 1);
        world.collectedCoins++;
        world.coinStatusBar.setPercentage(world.collectedCoins/world.totalCoins*100);
    }


    /**
    * Animate the Coin object by cycling through its coin images.
    * This method sets up a repeating animation sequence by calling `playAnimation`
    * with the Coin's coin images at a specific frame rate.
    */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 1000 / 10);
    }


    /**
    * Get the image paths for the Coin's coin images.
    *
    * @returns {string[]} An array of image paths representing the Coin's coin images.
    */
    getCoinImages() {
        const imagePaths = [];
        for (let i = 1; i <= 4; i++) {
            const imagePath = `./img/4. Marcadores/1. Coins/${i}.png`;
            imagePaths.push(imagePath);
        }

        return imagePaths;
    }
}