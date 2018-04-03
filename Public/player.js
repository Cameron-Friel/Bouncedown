function Player(x, y)
{
  this.x = x;
  this.y = y;
  this.currY = y; //Holds the player's previous positions
  this.score = 0; //Holds the player's mining score

  this.show = function() //Function which shows the miner's current location
  {
    fill('red');
    rect(this.x, this.y, 20, 20);
  }

  this.displayScore = function() //Displays player's score
  {
    textSize(32);
    fill('white');
    rect(0, 0, 300, 40);
    fill('black');
    textAlign(LEFT);
    text("SCORE: " + this.score, 15, 30);

    if (this.hasLost() === true) //If player is still alive increase their score
    {
      this.increaseScore();
    }
  }

  this.increaseScore = function()  //Increases player score based on how long they are alive
  {
    this.score += 1;
  }

  this.hasLost = function()  //Check if player hit the bottom or top
  {
    if (this.y > height || this.y < 0)
    {
      textSize(32);
      fill('white');
      textAlign(CENTER);
      text("YOU HAVE LOST!", width / 2, height / 2);
      return false;
    }
    return true;
  }

  this.move = function(platforms)
  {
    if (keyIsDown(RIGHT_ARROW))  //While right arrow is down move right three pixels
    {
      //this.onPlatforms(platforms);
      this.x += 3;
    }
    else if (keyIsDown(LEFT_ARROW))  //While left arrow is down move left three pixels
    {
      //this.onPlatforms(platforms);
      this.x -= 3;
    }
  }

  this.onPlatforms = function(platforms) //Checks if player is on a platform or not
  {
    var found = 0;

    this.y += 1;

    for (var i = 0; i < platforms.length; i++)
    {
      if (this.x < platforms[i].x + 100 && this.x + 20 > platforms[i].x && this.y < platforms[i].y + 100 && this.y + 20 > platforms[i].y)
      {
        if (this.y > platforms[i].y)
        {
          found += 1;
          this.y -= 1;
          this.y += 3; //ADDED THIS AND NOW IT IS SMOOTH, BUT WHY!?!?!? (MAYBE IT IS STILL CHECKING WHILE FALLING NEAR IT?)
          break;
        }
        else  //I think this keeps the player on the platform
        {
          found += 1;

          if (platforms[i].type === 0)
          {
            this.y -= 4; //Add three so player rides on the platform
          }
          else if (platforms[i].type === 1)
          {
            this.y -= 100;
          }
          else
          {
            this.y -= 4;
          }
          break;
        }
      }
    }

    if (found != 1)  //If player is not on a platform
    {
      this.drop();
    }
  }

  this.drop = function() //Makes the player fall
  {
    this.y += 5;
  }
}
