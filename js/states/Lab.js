function Lab()
{
	var fps
	
	var scientist
	
	this.setup = function()
	{
	    fps = document.getElementById("fps")
	    
	    scientist = new Player({x:50, y:50, anchor: "center", scale_image: game_scale})
	}
	
	this.update = function()
	{
	    if (jaws.pressed("a"))
	    {
    	    scientist.walk('left')
	    }
	    
	    if (jaws.pressed("w"))
	    {
    	    scientist.walk('up')
	    }
	    
	    if (jaws.pressed("s"))
	    {
    	    scientist.walk('down')
	    }
	    
	    if (jaws.pressed("d"))
	    {
    	    scientist.walk('right')
	    }
	
    	fps.innerHTML = jaws.game_loop.fps
	}
	
	this.draw = function()
	{
	    jaws.clear()
    	scientist.draw()
	}
}

