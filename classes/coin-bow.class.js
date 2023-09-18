/**
 * Class representing a CoinBow, a collection of Coin objects arranged in a bow-like pattern.
 * Extends the MoveableObject class.
 */
class CoinBow extends MoveableObject{

    /**
    * An array to store the Coin objects in the CoinBow.
    *
    * @type {Coin[]}
    */
    coins=[];

    /**
     * Create a new CoinBow object.
     *
     * @param {number} xStart - The starting x-coordinate for the CoinBow.
     * @param {number} yStart - The starting y-coordinate for the CoinBow.
     */
    constructor(xStart,yStart){
        super();
        this.createCoinbow(xStart,yStart);
    }


    /**
    * Create a bow-like arrangement of Coin objects within the CoinBow.
    *
    * @param {number} xStart - The starting x-coordinate for the CoinBow.
    * @param {number} yStart - The starting y-coordinate for the CoinBow.
    */
    createCoinbow(xStart,yStart){
        let yRise=60;
        this.x=xStart;
        this.y=yStart;
        for (let i = 0; i < 5; i++) {
            this.coins[i]=new Coin(this.x,this.y);
            this.x+=60;
            this.y-=yRise;
            yRise-=40;
        }
    }
}