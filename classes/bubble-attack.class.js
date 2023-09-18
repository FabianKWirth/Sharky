/**
 * Class representing a Bubble Attack.
 * @extends MoveableObject
 */
class BubbleAttack extends MoveableObject {

    /**
    * Create a Bubble Attack object.
    * @param {number} startX - The starting X-coordinate of the Bubble Attack.
    * @param {number} startY - The starting Y-coordinate of the Bubble Attack.
    * @param {number} speed - The speed of the Bubble Attack.
    */
    constructor(startX, startY, speed) {
        super();
        this.loadImg("./img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
        this.loadImages(["./img/1.Sharkie/4.Attack/Bubble trap/Bubble.png"]);
        this.y = startY;
        this.x = startX;
        this.speed = speed * 10;
        this.height = 15;
        this.width = 15;
        this.updraft=-0.01
        this.damage=100;

        this.animate();
        this.applyUpdraft();
        this.move();
    }


    /**
    * Animate the Bubble Attack.
    * This method plays the animation of the Bubble Attack by setting a stoppable interval.
    */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(["./img/1.Sharkie/4.Attack/Bubble trap/Bubble.png"]);
        }, 1000 / 60);
    }


    /**
    * Apply an updraft force to the Bubble Attack.
    * This method simulates the upward movement of the Bubble Attack by adjusting its Y-coordinate.

    */
    applyUpdraft() {
        setStoppableInterval(() => {
            this.y -= this.updraft;
            this.updraft += 0.015;
        }, 1000 / 60);
    }

    /**
    * Move the Bubble Attack horizontally.
    * This method updates the X-coordinate of the Bubble Attack to move it horizontally.
    */
    move() {
        setStoppableInterval(() => {
            this.x += this.speed;
        }, 1000 / 60);
    }

}