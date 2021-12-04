document.getElementById("slider-nbCorner").oninput = function() {
    circle.setNbCorner(this.value);
}

document.getElementById("slider-firstCornerAngle").oninput = function() {
    circle.setFirstCornerAngle(this.value / 10);
}

document.getElementById("slider-radius").oninput = function() {
    circle.setRadius(this.value);
}

document.getElementById("slider-posX").oninput = function() {
    circle.moveX(this.value * canvas.width / 1000); //calcul d'un pourmillage entre la taille de la canvas et le slider
}

document.getElementById("slider-posY").oninput = function() {
    circle.moveY(this.value * canvas.height / 1000); //calcul d'un pourmillage entre la taille de la canvas et le slider
}