// var map = [
// [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
// [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
// [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
// [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
// [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
// [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
// [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
// [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
// [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
// [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
// ];

var playground, x = 75, y = 75;

function setup() {

    createCanvas(x * 20, y * 10);
    playground = new Playground(x, y);
}

function draw() {
    background(200);
    playground.show();
    checkForAction();
    playground.moveProjectile();
    playground.isHit();
}

function checkForAction() {
    if (keyIsDown(37)) {
        playground.move('left', 0);
    }
    if (keyIsDown(38)) {
        playground.move('up', 0);
    }
    if (keyIsDown(39)) {
        playground.move('right', 0);
    }
    if (keyIsDown(40)) {
        playground.move('down', 0);
    }
    if (keyIsDown(65)) {
        playground.move('left', 1);
    }
    if (keyIsDown(87)) {
        playground.move('up', 1);
    }
    if (keyIsDown(68)) {
        playground.move('right', 1);
    }
    if (keyIsDown(83)) {
        playground.move('down', 1);
    }
}

function winner(index) {
    if (index == 0) {
        alert("The winner is player 1");
    }
    else {
        alert("The winner is player 2");
    }
}

// document.onkeypress = whoShot;
// function whoShot(e) {
//     e = e || window.event;
//     console.log(e);
//     if (e.keyCode == '32') {
//         playground.shoot(1);
//     }
// }

function keyPressed() {
    if (keyCode == 13) {
        playground.shoot(0);

    }
    if (keyCode == 32) {
        playground.shoot(1)
    }
}
function Playground(x, y) {
    this.tanks = [];
    this.blocks = [];
    this.projectiles = [];
    this.map = [
        [' ', '#', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#'],
        [' ', '#', ' ', '&', ' ', ' ', '#', ' ', ' ', ' ', ' ', '#', ' ', '#', '#', ' ', ' ', ' ', ' ', '#'],
        [' ', ' ', ' ', ' ', ' ', '#', '#', ' ', '#', ' ', '#', '#', ' ', ' ', '#', '#', ' ', ' ', ' ', ' '],
        ['#', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', '#', '#'],
        [' ', '#', ' ', '#', '#', ' ', ' ', ' ', '#', '#', '#', '#', ' ', '#', ' ', '#', ' ', '#', '#', ' '],
        [' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', '@', ' '],
        ['#', ' ', ' ', ' ', ' ', '#', ' ', ' ', '#', '#', ' ', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', '#', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', ' ', ' ', ' '],
        ['#', '#', ' ', '#', ' ', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', '#', ' ', ' ', '#'],
        [' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', '#', '#']
    ];


    this.init = function () {
        for (var index = 0; index < this.map.length; index++) {
            for (var index2 = 0; index2 < this.map[index].length; index2++) {
                if (this.map[index][index2] == '#') {
                    var block = {
                        x: x * index2,
                        y: y * index
                    }
                    this.blocks.push(block);
                }
                if (this.map[index][index2] == '@') {
                    var tankPlayer1 = {
                        x: x * index2,
                        y: y * index,
                        barrelX: 0,
                        barrelY: 0,
                        barrelW: 0,
                        barrelH: 0,
                        up: true,
                        down: false,
                        left: false,
                        right: false
                    }
                    this.tanks.unshift(tankPlayer1);
                }
                if (this.map[index][index2] == '&') {
                    var tankPlayer2 = {
                        x: x * index2,
                        y: y * index,
                        barrelX: 0,
                        barrelY: 0,
                        barrelW: 0,
                        barrelH: 0,
                        up: true,
                        down: false,
                        left: false,
                        right: false
                    }
                    this.tanks.push(tankPlayer2);
                }
            }
        }
    }
    this.show = function () {
        for (var index = 0; index < this.blocks.length; index++) {
            fill('black');
            rect(this.blocks[index].x, this.blocks[index].y, x, y);
        }
        for (var index = 0; index < this.tanks.length; index++) {
            // if (index = 0) {
            //     fill('red');
            // } if (index = 1) {
            //     fill('blue');
            // }
            rect(this.tanks[index].x + 25, this.tanks[index].y + 25, x / 3, y / 3);
            if (this.tanks[index].up) {
                this.tanks[index].barrelX = this.tanks[index].x + 35;
                this.tanks[index].barrelY = this.tanks[index].y + 25;
                this.tanks[index].barrelW = 5;
                this.tanks[index].barrelH = -10;
            }
            if (this.tanks[index].down) {
                this.tanks[index].barrelX = this.tanks[index].x + 35;
                this.tanks[index].barrelY = this.tanks[index].y + 50;
                this.tanks[index].barrelW = 5;
                this.tanks[index].barrelH = 10;
            }
            if (this.tanks[index].left) {
                this.tanks[index].barrelX = this.tanks[index].x + 25;
                this.tanks[index].barrelY = this.tanks[index].y + 35;
                this.tanks[index].barrelW = -10;
                this.tanks[index].barrelH = 5;
            }
            if (this.tanks[index].right) {
                this.tanks[index].barrelX = this.tanks[index].x + 50;
                this.tanks[index].barrelY = this.tanks[index].y + 35;
                this.tanks[index].barrelW = 10;
                this.tanks[index].barrelH = 5;
            }
            rect(this.tanks[index].barrelX, this.tanks[index].barrelY, this.tanks[index].barrelW, this.tanks[index].barrelH);
        }
        for (var index = 0; index < this.projectiles.length; index++) {
            rect(this.projectiles[index].x, this.projectiles[index].y, this.projectiles[index].w, this.projectiles[index].h);
        }
    }
    this.move = function (a, whichTank) {
        if (a == 'up') {
            if (!this.isColliding(whichTank, a)) {
                this.tanks[whichTank].down = false, this.tanks[whichTank].left = false, this.tanks[whichTank].right = false;
                this.tanks[whichTank].up = true;
                this.tanks[whichTank].y -= 1;
                this.tanks[whichTank].barrelY -= 1;
            }
        }
        if (a == 'down') {
            if (!this.isColliding(whichTank, a)) {
                this.tanks[whichTank].up = false, this.tanks[whichTank].left = false, this.tanks[whichTank].right = false;
                this.tanks[whichTank].down = true;
                this.tanks[whichTank].y += 1;
                this.tanks[whichTank].barrelY += 1;
            }
        }
        if (a == 'left') {
            if (!this.isColliding(whichTank, a)) {
                this.tanks[whichTank].down = false, this.tanks[whichTank].up = false, this.tanks[whichTank].right = false;
                this.tanks[whichTank].left = true;
                this.tanks[whichTank].x -= 1;
                this.tanks[whichTank].barrelX -= 1;
            }
        }
        if (a == 'right') {
            if (!this.isColliding(whichTank, a)) {
                this.tanks[whichTank].down = false, this.tanks[whichTank].left = false, this.tanks[whichTank].up = false;
                this.tanks[whichTank].right = true;
                this.tanks[whichTank].x += 1;
                this.tanks[whichTank].barrelX += 1;
            }
        }
    }
    this.moveProjectile = function (a) {
        for (var index = 0; index < this.projectiles.length; index++) {
            for (var index2 = 0; index2 < 4; index2++) {
                if (this.projectiles[index].direction == 'up') {
                    this.projectiles[index].y -= 1;
                }
                if (this.projectiles[index].direction == 'down') {
                    this.projectiles[index].y += 1;
                }
                if (this.projectiles[index].direction == 'left') {
                    this.projectiles[index].x -= 1;
                }
                if (this.projectiles[index].direction == 'right') {
                    this.projectiles[index].x += 1;
                }
                if (this.isProjectileColliding(index)) {
                    index--;
                    break;
                }
            }
        }
    }
    this.shoot = function (whichTank) {
        if (this.tanks[whichTank].up) {
            var projectile = {
                x: this.tanks[whichTank].barrelX + 2,
                y: this.tanks[whichTank].barrelY - 14,
                w: 1,
                h: 1,
                direction: 'up'
            }
            this.projectiles.push(projectile);
        }
        if (this.tanks[whichTank].down) {
            var projectile = {
                x: this.tanks[whichTank].barrelX + 2,
                y: this.tanks[whichTank].barrelY + 12,
                w: 1,
                h: 1,
                direction: 'down'
            }
            this.projectiles.push(projectile);
        }
        if (this.tanks[whichTank].left) {
            var projectile = {
                x: this.tanks[whichTank].barrelX - 14,
                y: this.tanks[whichTank].barrelY + 2,
                w: 1,
                h: 1,
                direction: 'left'
            }
            this.projectiles.push(projectile);
        }
        if (this.tanks[whichTank].right) {
            var projectile = {
                x: this.tanks[whichTank].barrelX + 12,
                y: this.tanks[whichTank].barrelY + 2,
                w: 1,
                h: 1,
                direction: 'right'
            }
            this.projectiles.push(projectile);
        }
    }

    this.isHit = function () {
        for (var index = 0; index < this.projectiles.length; index++) {
            for (var index2 = 0; index2 < this.tanks.length; index2++) {
                if (this.projectiles[index].x - 1 >= this.tanks[index2].x + 25 &&
                    this.projectiles[index].x <= this.tanks[index2].x + 50 &&
                    this.projectiles[index].y - 1 >= this.tanks[index2].y + 25 &&
                    this.projectiles[index].y <= this.tanks[index2].y + 50) {
                        noLoop();
                    return winner(index2);
                }
            }
        }
    }
    this.isProjectileColliding = function (index) {
        if (this.projectiles[index].y - 1 == 0 || this.projectiles[index].y == height || this.projectiles[index].x - 1 == 0 || this.projectiles[index].x == width) {
            this.projectiles.splice(index, 1);
            return true;
        }
        for (var index2 = 0; index2 < this.blocks.length; index2++) {
            if (this.projectiles[index].x - 1 >= this.blocks[index2].x &&
                this.projectiles[index].x <= this.blocks[index2].x + 75 &&
                this.projectiles[index].y - 1 >= this.blocks[index2].y &&
                this.projectiles[index].y <= this.blocks[index2].y + 75) {
                this.projectiles.splice(index, 1);
                return true;
            }
        }
    }
    this.isColliding = function (whichTank, a) {
        if (a == 'up') {
            if (this.tanks[whichTank].y + 15 == 1) {
                return true;
            }
            for (var index = 0; index < this.blocks.length; index++) {
                if ((this.tanks[whichTank].y + 15) <= (this.blocks[index].y + y + 1) && (this.tanks[whichTank].y + 15) >= (this.blocks[index].y) &&
                    ((this.tanks[whichTank].x + x / 3) <= (this.blocks[index].x + x + 1)) && ((this.tanks[whichTank].x + x / 3 * 2) >= (this.blocks[index].x))) {
                    if ((this.tanks[whichTank].y + 15) <= (this.blocks[index].y + y + 1)) {
                        return true;
                    }
                }
            }
        }
        if (a == 'down') {
            if (this.tanks[whichTank].y + 60 == (height - 1)) {
                return true;
            }
            for (var index = 0; index < this.blocks.length; index++) {
                if ((this.tanks[whichTank].y + 60) >= (this.blocks[index].y - 1) && (this.tanks[whichTank].y + 60) <= (this.blocks[index].y + y) &&
                    ((this.tanks[whichTank].x + x / 3) <= (this.blocks[index].x + x + 1)) && ((this.tanks[whichTank].x + x / 3 * 2) >= (this.blocks[index].x))) {
                    if ((this.tanks[whichTank].y + 60) >= (this.blocks[index].y - 1)) {
                        return true;
                    }
                }
            }
        }
        if (a == 'left') {
            if (this.tanks[whichTank].x + 15 == 1) {
                return true;
            }
            for (var index = 0; index < this.blocks.length; index++) {
                if ((this.tanks[whichTank].x + 15) <= (this.blocks[index].x + x + 1) && (this.tanks[whichTank].x + 15) >= (this.blocks[index].x) &&
                    ((this.tanks[whichTank].y + y / 3) <= (this.blocks[index].y + y + 1)) && ((this.tanks[whichTank].y + y / 3 * 2) >= (this.blocks[index].y))) {
                    return true;
                }
            }
        }
        if (a == 'right') {
            if (this.tanks[whichTank].x + 60 == (width - 1)) {
                return true;
            }
            for (var index = 0; index < this.blocks.length; index++) {
                if ((this.tanks[whichTank].x + 60) >= (this.blocks[index].x - 1) && (this.tanks[whichTank].x + 60) <= (this.blocks[index].x + x) &&
                    ((this.tanks[whichTank].y + y / 3) <= (this.blocks[index].y + y + 1)) && ((this.tanks[whichTank].y + y / 3 * 2) >= (this.blocks[index].y))) {
                    if ((this.tanks[whichTank].x + 60) >= (this.blocks[index].x - 1)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    this.init();
}