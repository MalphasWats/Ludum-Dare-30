function Player(options)
{
    this.constructor(options)
    
    var anim = new jaws.Animation({sprite_sheet: "graphics/scientist.png", 
                                   frame_size: [16,16], 
                                   orientation: "right", 
                                   frame_duration: 60,
                                   scale_image:game_scale})
    this.animations = {}
    
    this.animations.idle = anim.slice(0,1)
    this.animations.down = anim.slice(0,4)
    this.animations.right = anim.slice(5,8)
    this.animations.left = anim.slice(8,12)
    this.animations.up = anim.slice(12,16)
    
    this.animations.current = this.animations.idle
    
    this.setImage(this.animations.current.next())
    
    this.vx = 3
    this.vy = 3
    
    this.x_prev = this.x
    this.y_prev = this.y
    
}

Player.prototype = new Mob({})

Player.prototype.walk = function(direction)
{
    
    
    
    if (direction == 'left')
    {
        if (this.animations.current != this.animations.left)
        {
            this.animations.current = this.animations.left
        }
        this.x_prev = this.x
        this.x -= this.vx
    }
    
    else if (direction == 'right')
    {
        if (this.animations.current != this.animations.right)
        {
            this.animations.current = this.animations.right
        }
        this.x_prev = this.x
        this.x += this.vx
    }
    
    else if (direction == 'up')
    {
        if (this.animations.current != this.animations.up)
        {
            this.animations.current = this.animations.up
        }
        this.y_prev = this.y
        this.y -= this.vy
    }
    
    else if (direction == 'down')
    {
        if (this.animations.current != this.animations.down)
        {
            this.animations.current = this.animations.down
        }
        this.y_prev = this.y
        this.y += this.vy
    }
    
    this.setImage(this.animations.current.next())
}

Player.prototype.undo_walk = function()
{
    this.x = this.x_prev
    this.y = this.y_prev
}