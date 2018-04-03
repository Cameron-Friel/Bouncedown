function Base(x, y)
{
  this.x = x;
  this.y = y;
  this.owner = 'red';
  this.life = 100;
  this.counter = 0; //Counter for emition

  this.show = function()
  {
    stroke('black');
    strokeWeight(4);
    fill(this.owner);
    rect(this.x, this.y, 40, 30);
  }

  this.lifespan = function()
  {
    //this.life -= .25;
  }

  this.emit = function(maps)
  {
    for (var i = 0; i < maps.length; i++)
    {
      if (this.x === maps[i].x && this.y === maps[i].y)
      {
        maps[i].draw(this.x, this.y);
        break;
      }
    }
  }
}
