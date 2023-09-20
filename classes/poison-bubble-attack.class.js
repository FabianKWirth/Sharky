/**
 * Class representing a Bubble Attack.
 * @extends MoveableObject
 */
class PosionBubbleAttack extends BubbleAttack {

    posionCost = 10;

    constructor(startX, startY, speed) {
        super();
        this.loadImg("./img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png");
        this.loadImages(["./img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png"]);
        this.y = startY;
        this.x = startX;
        this.speed = speed * 10;
        this.height = 20;
        this.width = 20;
        this.damage = 150;

        this.animate();
        this.move();
    }


    animate() {
        setStoppableInterval(() => {
            this.playAnimation(["./img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png"]);
        }, 1000 / 10);
    }
}