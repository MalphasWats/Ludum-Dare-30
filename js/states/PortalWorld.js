function PortalWorld()
{
	var fps
	
	var floor
	var walls, tilemap, viewport
	
	var scientist, portal
	
	this.setup = function()
	{
	    fps = document.getElementById("fps")
	    
	    var sprite_sheet = new jaws.SpriteSheet({image: "graphics/portal_world.png", orientation:'right', frame_size: [16,16]})
	    
	    walls = new jaws.SpriteList()
	    
	    /* Initialise the map */
	    var map = []
	    for (var x=0; x<world_width ; x++)
	    {
    	    for (var y=0 ; y<world_height ; y++)
    	    {
    	        var i = Math.floor(Math.random() * 1000)
    	        if (i > 300)
    	        {
    	            map.push(1)
    	            //walls.push( new Sprite({image: sprite_sheet.frames[1], x: x*16*game_scale, y: y*16*game_scale}) )
                }
                else
                {
                    map.push(0)
                }
    	    }
	    }
	    
	    function apply_cellular_automaton(map, height, width, born, survive)
	    {
            var new_map = []
            var neighbours
            for (var x=0; x<world_width ; x++)
            {
                for (var y=0 ; y<world_height ; y++)
                {
                    if (x == 0 || y == 0 || y == height-1 || x == width-1)
                        new_map.push(true)
                    else
                    {
                        neighbours = 0
                        
                        neighbours += map[ ((y-1)*width)+(x-1) ]
                        neighbours += map[ ((y-1)*width)+x ]
                        neighbours += map[ ((y-1)*width)+(x+1) ]
                        
                        neighbours += map[ (y*width)+(x-1) ]
                        neighbours += map[ (y*width)+(x+1) ]
                        
                        neighbours += map[ ((y+1)*width)+(x-1) ]
                        neighbours += map[ ((y+1)*width)+x ]
                        neighbours += map[ ((y+1)*width)+(x+1) ]
                        
                        
                        if (map[ (y*width)+x ])
                        {
                            new_map.push(survive.indexOf(neighbours) > 0)
                        }
                        else
                        {
                            new_map.push(born.indexOf(neighbours) > 0)
                        }
                    }
                }
            }
            return new_map
	    }
	    
	    for (var i=0 ; i<5 ; i++)
	    {
            map = apply_cellular_automaton(map, world_height, world_width, [6, 7, 8], [3, 4, 5, 6, 7, 8])
        }
    
        for (var i=0 ; i<2 ; i++)
	    {
            map = apply_cellular_automaton(map, world_height, world_width, [5, 6, 7, 8], [5, 6, 7, 8])
        }
        
        for (var x=0; x<world_width ; x++)
	    {
    	    for (var y=0 ; y<world_height ; y++)
    	    {
    	        if (map[y*world_width+x])
    	        {
    	            walls.push( new Sprite({image: sprite_sheet.frames[1], x: x*16*game_scale, y: y*16*game_scale}) )
    	        }
    	    }   
        }   
	    
	    tilemap = new jaws.TileMap({size: [world_width, world_height], cell_size: [16,16]})
	    tilemap.push(walls)
	    
	    viewport = new jaws.Viewport({max_x: world_width*16*game_scale, max_y: world_height*16*game_scale})
	    
	    
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
                
        floor = new Sprite({image: buffer, x:0, y:0})
        
        var x = 64, y = 64
        
	    
	    scientist = new Player({x:64-8, y:64-8, anchor: "center", scale_image: game_scale})
	    while (jaws.collide(scientist, walls))
	    {
    	    scientist.x += 16
    	    scientist.y += 16
    	    
    	    if (scientist.x > world_width * 16 * game_scale)
    	    {
        	    scientist.x = Math.floor(Math.random() * world_width * 16 * game_scale)
    	    }
    	    if (scientist.y > world_height * 16 * game_scale)
    	    {
        	    scientist.y = Math.floor(Math.random() * world_height * 16 * game_scale)
    	    }
	    }
	    
	    
	    portal = new Sprite({x:Math.floor(Math.random() * world_width * 16 * game_scale)-8, y:Math.floor(Math.random() * world_height * 16 * game_scale)-8, anchor: "center", scale_image: game_scale})
	    while (jaws.collide(portal, walls))
	    {
    	    portal.x += 16
    	    portal.y += 16
    	    if (portal.x > world_width * 16 * game_scale)
    	    {
        	    portal.x = Math.floor(Math.random() * world_width * 16 * game_scale)
    	    }
    	    if (portal.y > world_height * 16 * game_scale)
    	    {
        	    portal.y = Math.floor(Math.random() * world_height * 16 * game_scale)
    	    }
	    }
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
	    
        var r = {}
        r.rect = function() { return new jaws.Rect(scientist.x-4, scientist.y-4, 8, 8) }

	    if (jaws.collide(r, walls))
	    {
	        scientist.undo_walk()
	    }
	    
	    viewport.centerAround(scientist)
	    
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
	    floor.draw()
        viewport.drawTileMap(tilemap)
        viewport.apply( function()
        {
            scientist.draw()
            portal.draw()
        })
    	//portal.draw()
	}
}

