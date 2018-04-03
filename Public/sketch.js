var players;
var rocks = [];
var platforms = [];

function setup()
{
  canvas = createCanvas(1000, 660);
  canvas.position(250, 100);

  players = new Player(width / 2, 0); //Create a new player on the screen

  var length = 4;

  for (var i = 0; i < length; i++)  //Start out with three platforms for the player to choose
  {
    platforms[i] = new Platform();
    platforms[i].y = 600;  //First platforms start the highest
    platforms[i].chooseAbility();
  }
  checkIntersection(length, platforms);
  //song.play();
}

function preload() //Loads the song to be played during the game
{
  //song = loadSound("5am.mp3");
}

function keyPressed() //THIS IS NOT NEEDED ANYMORE
{
  if (key == 'A')
  {
    players.move();
  }
  else if (key == 'D')
  {
    players.move();
  }
}

function newRow(players)  //Function to see if new set of rows needed
{
  if (players.score % 50 == 0) //Every 50 score accumulated is a new row generated
  {

    var length = int(random(1, 4));  //Random number of platforms to generate

    for (var i = 0; i < length; i++)
    {

      platforms.push(new Platform());

      platforms[platforms.length - 1].chooseAbility();
    }

    checkIntersection(length, platforms);
  }
}

function checkIntersection(length, platforms)  //Checks to see if the new platforms intersect and fixes it
{
  var size = platforms.length - length; //Start at the new platforms that were made

  for (var i = size; i < platforms.length; i++)//Check all new platforms
  {
    for (var j = size; j < platforms.length; j++) //Check the new platforms after it with current checking i
    {
      if (platforms[i].x < platforms[j].x && platforms[i].x + 101 > platforms[j].x)
      {
        platforms[i].x = random(0, width);  //Create a new position for platform intersections

        i = size;  //Reset the index i and j to check platforms again
        j = size;
      }
    }
  }
}

function draw()
{

  if (players.hasLost() != false) //Loop through this if player is still playing (SMIRK ;))
  {
    background(51);

    players.show();  //Display player to the user

    for (var i = platforms.length - 1; i >= 0; i--) //Loop through game to raise platforms, show them, and delete ones off screen
    {
      platforms[i].raise();
      platforms[i].show();
      platforms[i].deletePlatform(i);
    }

    players.move(platforms);

    players.onPlatforms(platforms);

    players.displayScore();

    newRow(players);
  }
  else //Player has lost and is displayed infinitely until they decide to exit
  {
    background(51);
    players.hasLost();
    players.displayScore();
  }
}
