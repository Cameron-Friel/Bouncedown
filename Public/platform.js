function Platform(ability)
{
  this.x = random(0, width);  //Platform's x position
  this.y = height;  //Platform starts at the bottom of the screen
  this.color = 'blue'; //Color of platform, default is blue for the normal platform
  this.type = 0;  //Type is ability of the platform, 0 meaning normal, 1 meaning jump

  this.show = function()  //Function to display rocks
  {
    noStroke();
    fill(this.color);
    rect(this.x, this.y, 100, 20);
  }

  this.chooseAbility = function()
  {
    var ability = int(random(0, 3));

    this.type = ability;

    if (this.type == 1)
    {
      this.color = 'green';
    }
    else if (this.type == 2)
    {
      this.color = 'white';
    }
  }

  this.deletePlatform = function(i) // When platform goes off screen delete it
  {
    if (this.y < -20)  //Make sure platform is twenty pixels off the screen
    {
      platforms.splice(i, 1);
    }
  }

  this.raise = function() //Function to raise platform up three pixels
  {
      this.y -= 3;
  }
}
