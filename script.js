const canvas = document.querySelector("canvas"); //selectionne la canvas dans la page html
canvas.width = window.innerWidth; //redefinit la tailel de la canvas
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

const center = { x: canvas.width / 2, y: canvas.height / 2, z: 0 };

class Polygon {
    constructor(pos, radius, nbCorner, firstCornerAngle, color) {
        this.pos = pos;
        this.radius = radius;
        this.nbCorner = nbCorner;
        this.firstCornerAngle = -firstCornerAngle * Math.PI;
        this.color = color;
        this.calculCorners();
    }
    calculCorners() {
        this.angle = ((2 * Math.PI) / this.nbCorner);
        this.cornersAngle = [];
        for (let i = 0; i < this.nbCorner; i++) {
            this.cornersAngle[i] = this.angle * i + this.firstCornerAngle;
        }
    }

    draw() {
        if (this.nbCorner == 0) { //dessin d'un cercle

            c.beginPath();
            c.strokeStyle = this.color;
            c.arc(this.pos.x, this.pos.y, this.radius, this.firstCornerAngle, 2 * Math.PI + this.firstCornerAngle, true);
            c.stroke();
        } else { //dessin d'un polynome

            this.cornerCoordonates = [];
            for (let i = 0; i < this.nbCorner; i++) {

                let x = Math.cos(this.cornersAngle[i]) * this.radius;
                let y = Math.sin(this.cornersAngle[i]) * this.radius;
                let coordo = { x: x + center.x, y: y + center.y };
                this.cornerCoordonates[i] = coordo;
            }

            c.beginPath();
            c.strokeStyle = this.color;

            for (let i = 0; i < this.nbCorner; i++) { //dessin de traits de coin en coin
                c.moveTo(this.cornerCoordonates[i].x, this.cornerCoordonates[i].y);
                if (i < this.nbCorner - 1) { //si c'est le dernier, il boucle sur le premier
                    c.lineTo(this.cornerCoordonates[i + 1].x, this.cornerCoordonates[i + 1].y);
                } else {
                    c.lineTo(this.cornerCoordonates[0].x, this.cornerCoordonates[0].y);
                }
            }
            c.stroke();
        }
    }


    ////////////// SETTERS //////////////

    setNbCorner(newNbCorner) {
        this.nbCorner = newNbCorner;
        if (this.value != 0) {
            this.calculCorners();
        }
    }

    setFirstCornerAngle(newFCA) {
        if (newFCA != 0) {
            this.firstCornerAngle = -newFCA * Math.PI;
            this.calculCorners();
        }
    }

    setRadius(newRadius) {
        this.radius = newRadius;
    }

    setColor(newColor) {
        this.color = newColor;
    }

    moveX(newPosX) {
        this.pos.x = newPosX;
    }

    moveY(newPosY) {
        this.pos.y = newPosY;
    }

}



let circle = new Polygon(center, 300, 5, 0.5, "red");

function loop() {
    c.clearRect(0, 0, canvas.width, canvas.height); // raffraichisment de la canvas
    circle.draw();

    setTimeout(function() {
        requestAnimationFrame(loop());
    }, 0000);
}
loop();