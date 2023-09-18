/**
 * Represents a game level with various elements such as enemies, end boss, background objects, coin bows, and poison bottles.
 */
class Level {
    /**
     * An array of enemy objects present in the level.
     * @type {MoveableObject[]}
     */
    enemies;

    /**
     * The end boss object present in the level.
     * @type {MoveableObject}
     */
    endBoss;

    /**
     * An array of coin bow objects present in the level.
     * @type {MoveableObject[]}
     */
    coinBows;

    /**
     * An array of background objects present in the level.
     * @type {DrawableObject[]}
     */
    backGroundObjects;

    /**
     * An array of poison bottle objects present in the level.
     * @type {MoveableObject[]}
     */
    poisonBottles;

    /**
     * The x-coordinate position of the start point of the level.
     * @type {number}
     * @constant
     */
    level_start_x = 100;

    /**
     * The x-coordinate position of the end point of the level.
     * @type {number}
     * @constant
     */
    level_end_x = 2700;

    /**
     * Create a new Level instance with specified elements.
     * @param {MoveableObject[]} enemies - An array of enemy objects.
     * @param {MoveableObject} endBoss - The end boss object.
     * @param {MoveableObject[]} coinBow - An array of coin bow objects.
     * @param {DrawableObject[]} backGroundObjects - An array of background objects.
     * @param {MoveableObject[]} poisonBottles - An array of poison bottle objects.
     */
    constructor(enemies, endBoss, coinBow, backGroundObjects,poisonBottles) {
        this.enemies = enemies;
        this.endBoss = endBoss;
        this.coinBows = coinBow;
        this.backGroundObjects = backGroundObjects;
        this.poisonBottles=poisonBottles;
    }
}