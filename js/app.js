// Enemies our player must avoid
var Enemy = function(x, y, enemySpeed, imageType) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    switch (imageType) {
        case 1:
            this.sprite = 'images/char-cat-girl.png';
            break;
        case 2:
            this.sprite = 'images/char-horn-girl.png';
            break;
        case 3:
            this.sprite = 'images/char-pink-girl.png';
            break;
        case 4:
            this.sprite = 'images/char-princess-girl.png';
            break;
        default: 
            this.sprite = 'images/char-boy.png';
    }
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.enemySpeed = enemySpeed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter which will ensure
    // the game runs at the same speed for all computers.
    // Multiply by score to increase difficult to game.
    this.x += (this.enemySpeed + (20 * score.score)) * dt;
    if (this.x >= 500) {
        this.x = this.initialX;
    }
    
    checkCollision(this.x, this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check if a collision happens.
function checkCollision(enemyX, enemyY) {
    if(enemyY === player.y && enemyX - 50 < player.x && enemyX + 50 > player.x) {
        player.restartOnColision();
    }
}

// Player class.
var Player = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = 200;
    this.y = 380;
    this.initialY = this.y;
    this.initialX = this.x;
}

Player.prototype.update = function(dt) {
    allEnemies.forEach(function(enemy) {
        checkCollision(enemy.x, enemy.y)
    });
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.restartOnColision = function() {
    this.x = this.initialX;
    this.y = this.initialY;
    score.score = 0;
}

Player.prototype.restartOnSuccess = function() {
    this.x = this.initialX;
    this.y = this.initialY;
    score.score += 1;
}

Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left') {
        if (this.x >= 100) this.x -= 100;
    } else if (keyCode === 'right') {
        if (this.x <= 300) this.x += 100;
    } else if (keyCode === 'up') {
        this.y -= 80;
        if (this.y < 60) this.restartOnSuccess();
    } else if (keyCode === 'down') {
        if (this.y <= 300) this.y += 80;
    }
}

// Score class
var Score = function() {
    this.sprite = 'images/Star.png';
    this.imageX = 0;
    this.imageY = 500;
    this.textX = 230;
    this.textY = 615;
    this.score = 0;
}

Score.prototype.render = function() {
    if (this.score > 0) {
        ctx.drawImage(Resources.get(this.sprite), this.imageX, this.imageY);
        ctx.fillText(`Score: ${this.score}`, this.textX, this.textY);
    }
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [
    new Enemy(-200, 220, 160, 1),
    new Enemy(-700, 220, 180, 2),
    new Enemy(-100, 140, 140, 3),
    new Enemy(-400, 140, 240, 4),
    new Enemy(-500, 60, 210, 5),
    new Enemy(-100, 60, 190, 4),
];

player = new Player();

score = new Score();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
