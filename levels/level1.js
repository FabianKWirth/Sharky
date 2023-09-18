let level1;

/**
 * Loads all objects of Level1
 */
function initLevel1() {

    musicPath="./audio/background-action.mp3";
    level1 = new Level(
        enemies = [
            new PufferFish(1),
            new PufferFish(2),
            new PufferFish(3),
            new PufferFish(3),
            new PufferFish(2),
            new PufferFish(1),
            new PufferFish(3),
            new JellyFishNormal(1,500),
            new JellyFishNormal(2,900),
            new JellyFishDangerous(1,1500),
            new JellyFishDangerous(2,1900),
        ],
        endbosses = [
            new Endboss()
        ],
        coins = [
            new CoinBow(500, 200),
            new CoinBow(900, 300),
            new CoinBow(1400, 400)
        ],
        backGroundObjects = [
            new backGroundObject("img/3. Background/Layers/5. Water/D1.png", 0, 0),
            new backGroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 0, 0),
            new backGroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 0, 0),
            new backGroundObject("img/3. Background/Layers/2. Floor/D1.png", 0, 0),
            new backGroundObject("img/3. Background/Layers/1. Light/1.png", 0, 0),
            new backGroundObject("img/3. Background/Layers/5. Water/D2.png", 720, 0),
            new backGroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", 720, 0),
            new backGroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720, 0),
            new backGroundObject("img/3. Background/Layers/2. Floor/D2.png", 720, 0),
            new backGroundObject("img/3. Background/Layers/1. Light/2.png", 720, 0),
            new backGroundObject("img/3. Background/Layers/5. Water/D1.png", 720 * 2, 0),
            new backGroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 720 * 2, 0),
            new backGroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 720 * 2, 0),
            new backGroundObject("img/3. Background/Layers/2. Floor/D1.png", 720 * 2, 0),
            new backGroundObject("img/3. Background/Layers/1. Light/1.png", 720 * 2, 0),
            new backGroundObject("img/3. Background/Layers/5. Water/D2.png", 720 * 3, 0),
            new backGroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", 720 * 3, 0),
            new backGroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720 * 3, 0),
            new backGroundObject("img/3. Background/Layers/2. Floor/D2.png", 720 * 3, 0),
            new backGroundObject("img/3. Background/Layers/1. Light/2.png", 720 * 3, 0)
        ],
        poisonBottles = [
            new PoisonBottle(700),
            new PoisonBottle(1300),
            new PoisonBottle(1700),
            new PoisonBottle(1900),
            new PoisonBottle(500)
        ]
    );


}