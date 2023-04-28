// Suzdavame promenlivi
let clicked = false, autoClickerClicked = false, ducksPerClick = false;
let points = 0, pointsSize = 400;
let autoClickerLevel = 0, ducksPerClickLevel = 1;

function init() {

}
function update() {
    // Kodut tuk se izpulnqva (okolo) 100 puti v sekunda
    /*myX = myX + (mouseX - myX) / 10;
    myY = myY + (mouseY - myY) / 10;*/

    //Duck counter resize
    if(pointsSize <= 50){
        pointsSize = 50;
    }

    //Auto clicker
    points += autoClickerLevel / 1000;

    if(autoClickerLevel >= 300){
        autoClickerLevel = 300;
    }
}
function draw() {
    //Duck
    if(clicked == true) {
        drawImage(duckOutlineTarget, 50, 120, 300, 300);
    }else{
        drawImage(duckTarget, 100, 200, 200, 200);
    }

    context.font = "50px Arial"
    context.fillStyle = "Black"
    context.fillText("Ducks: " + Math.round(points), 100, 450, pointsSize, pointsSize);

    //Abilities (Autockick)
    drawImage(mouse_cursur, 500, 100, 100, 100);

    context.font = "50px Arial"
    context.fillStyle = "Black"
    context.fillText("Ducks per second: " + Math.round(autoClickerLevel) / 10 + " / 30", 100, 80, 250, 250);

    //Save and Load text
    context.font = "50px Arial"
    context.fillStyle = "Black"
    context.fillText("Save", 10, 10, 70, 70);

    context.font = "50px Arial"
    context.fillStyle = "Black"
    context.fillText("Load last Save", 150, 10, 200, 200);


    //(Ducks per click)
    drawImage(DuckPerClick, 500, 250, 100, 100);
}
function mouseup() {
    //Duck clicking
    console.log("Mouse clicked at", mouseX, mouseY);

    if(clicked == true) {
        clicked = false;
    }

    if(autoClickerClicked == true) {
        autoClickerClicked = false;
    }

    if(ducksPerClick == true) {
        ducksPerClick = false;
    }
}

function mousedown() {
    //Duck clicking
    if(areColliding(100, 200, 200, 200, mouseX, mouseY, 0, 0) && clicked == false) {
        clicked = true;
        pointsSize -= 0.1;
        points += ducksPerClickLevel;
    }else{
        clicked = false;
    }

    //Autoclicker
    if(areColliding(500, 100, 100, 100, mouseX, mouseY, 0, 0) && autoClickerClicked == false && points >= 100) {
        autoClickerClicked = true;
        autoClickerLevel += 1;
        points -= 100;
    }else{
        autoClickerClicked = false;
    }

    //Ducks per click
    if(areColliding(500, 250, 100, 100, mouseX, mouseY, 0, 0) && ducksPerClick == false && points >= 50) {
        ducksPerClick = true;
        ducksPerClickLevel += 0.2;
        points -= 50;
    }else{
        ducksPerClick = false;
    }

    //Save and Load
    if(areColliding(mouseX, mouseY, 0, 0, 10, 10, 70, 40)){
        localStorage.points = JSON.stringify(points);
        localStorage.autoClickerLevel = JSON.stringify(autoClickerLevel);
        localStorage.ducksPerClickLevel = JSON.stringify(ducksPerClickLevel);
        console.log("Saved");
    }

    if(areColliding(mouseX, mouseY, 0, 0, 150, 10, 200, 40)){
        points = JSON.parse(localStorage.points);
        autoClickerLevel = JSON.parse(localStorage.autoClickerLevel);
        ducksPerClickLevel = JSON.parse(localStorage.ducksPerClickLevel);
        console.log("Loaded");
    }
}

function keyup(key) {
    // Pechatai koda na natisnatiq klavish
    console.log("Pressed", key);

    if(key == 83){//S
        localStorage.points = JSON.stringify(points);
        localStorage.autoClickerLevel = JSON.stringify(autoClickerLevel);
        localStorage.ducksPerClickLevel = JSON.stringify(ducksPerClickLevel);
        console.log("Saved");
    }

    if(key == 76){//L
        points = JSON.parse(localStorage.points);
        autoClickerLevel = JSON.parse(localStorage.autoClickerLevel);
        ducksPerClickLevel = JSON.parse(localStorage.ducksPerClickLevel);
        console.log("Loaded");
    };
}