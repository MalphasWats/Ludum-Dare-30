function Lab()
{
	var fps
	
	var map
	
	var scientist, portal
	
	this.setup = function()
	{
	    fps = document.getElementById("fps")
	    
	    var sprite_sheet = new jaws.SpriteSheet({image: "graphics/laboratory.png", frame_size: [16,16]})
	    
	    var buffer = document.createElement('canvas')
        buffer.width = jaws.width
        buffer.height = jaws.height
        var buffer_context = buffer.getContext('2d')
        
        for (var x=0 ; x<16 ; x++)
        {
            for (var y=0 ; y<16 ; y++)
            {
                buffer_context.drawImage(sprite_sheet.frames[0], x*16*game_scale, y*16*game_scale, 16*game_scale, 16*game_scale)
            }
        }
                
        map = new Sprite({image: buffer, x:0, y:0})
	    
	    scientist = new Player({x:64-8, y:64-8, anchor: "center", scale_image: game_scale})
	    
	    portal = new Sprite({x:128-8, y:128-8, anchor: "center", scale_image: game_scale})
	    portal.anim = new jaws.Animation({sprite_sheet: "graphics/portal.png", 
                                          frame_size: [16,16], 
                                          orientation: "right", 
                                          frame_duration: 120,
                                          scale_image:game_scale})
                                          
	}
	
	this.update = function()
	{
	    if (jaws.pressed("a"))
	    {
    	    scientist.walk('left')
	    }
	    
	    else if (jaws.pressed("w"))
	    {
    	    scientist.walk('up')
	    }
	    
	    else if (jaws.pressed("s"))
	    {
    	    scientist.walk('down')
	    }
	    
	    else if (jaws.pressed("d"))
	    {
    	    scientist.walk('right')
	    }
	    
	    jaws.forceInsideCanvas(scientist)
	    
	    portal.setImage(portal.anim.next())
	    
	    if (jaws.collideOneWithOne(scientist, portal))
	    {
    	    jaws.switchGameState(PortalWorld)
	    }
	
    	fps.innerHTML = jaws.game_loop.fps
	}
	
	this.draw = function()
	{
	    jaws.clear()
	    map.draw()
    	scientist.draw()
    	portal.draw()
	}
}

