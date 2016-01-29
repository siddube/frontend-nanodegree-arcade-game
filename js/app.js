// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //set initial position of enemies to a random value within the range specified
    //set speed to random value between 200 and 300
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.random() * (-100) - 200;
    this.y = (Math.floor((Math.random() * 3)) * 83) + 60;
    this.speed = Math.random() * 100 + 200;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Move Enemies
    //multiply moveEnemy with dt parameter
    var moveEnemyX = this.speed * dt;
    this.x += moveEnemyX;

    //If enemies move beyond the right boundary reset their initial postion
    //set the values to random numbers as we did during setting the intial position
    //Set the new speed of enemies to random number
    if (this.x > 700) {
        this.x = Math.random() * (-100) - 100;
        this.y = (Math.floor((Math.random() * 3)) * 83) + 60;
        this.speed = Math.random() * 100 + 200;
    }

    //Collision Detection
    //If the difference of enemies.x,player.x and enemies.y,player.y
    //fall between certain values then they are colliding
    //Setting width difference to 99 and height difference to 79
    //If values are under these values, then the bug killed the player
    if (((this.x - player.x < 99) && (this.x - player.x > -9)) && ((player.y - this.y < 79) && (this.y - player.y < 79)))
        player.reset('die'); //Call reset with parameter die
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // Set Player Initial position
    this.sprite = 'images/char-boy.png';
    this.x = 0;
    this.y = 390;
    this.score = 0;
    this.speed = 83;
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.speed *= dt;
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Handle Input from events triggered from keypress
//move the player by 83 pixels on y axis
//move the player by 101 pixels on x axis
//Move the player only within the boundary of the canvas
//use if to test key press and move the player only if he is within
//and will not move out of the boundary
//Set boundary within (0,0) and (390,390)
Player.prototype.handleInput = function(key) {
    if(key === 'up' && this.y > 0)
        this.y -= 83;
    if(key === 'down' && this.y < 390)
        this.y += 83;
    if(key === 'left' && this.x > 0)
        this.x -= 101;
    if(key === 'right' && this.x < 390)
        this.x += 101;

    if(this.y < 0)
        this.reset('win');
};

//Function that handles resetting of player
//Reset player.y to 390
//Increase score if the player made it to water
//Make score 0 if player gets killed
Player.prototype.reset = function(key) {
    this.y = 390;
    if(key === 'die')
        player.score = 0;
    else if(key === 'win')
        player.score++;
};

// instantiate game objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for(var i = 0; i < 5; i++) {
  allEnemies.push(new Enemy());
}
var player = new Player();


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