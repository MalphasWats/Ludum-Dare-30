function Player(options)
{
    this.constructor(options)
    
    var anim = new jaws.Animation({sprite_sheet: "graphics/scientist.png", 
                                   frame_size: [16,16], 
                                   orientation: "right", 
                                   frame_duration: 90,
                                   scale_image:game_scale})
    this.animations = {}
    
    this.animations.idle = anim.slice(0,1)
    this.animations.down = anim.slice(0,4)
    this.animations.right = anim.slice(5,8)
    this.animations.left = anim.slice(8,12)
    this.animations.up = anim.slice(12,16)
    
    this.animations.current = this.animations.idle
    
    this.setImage(this.animations.current.next())
    
    this.vx = 2
    this.vy = 2
    
    this.x_prev = this.x
    this.y_prev = this.y
    
    this.hp_max = 300
    this.hp = this.hp_max
    this.hp_counter_max = 300
    this.hp_counter = this.hp_counter_max
    this.damage = 1
    this.armed = false
    
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

Player.prototype.update = function()
{
    this.hp_counter -= 1
    if (this.hp_counter < 0)
    {
        this.hp += 1
        this.hp_counter = this.hp_counter_max
    }
    if (this.hp > this.hp_max)
    {
        this.hp = this.hp_max
    }
}

Player.prototype.get_facing_coords = function()
{
    if (this.animations.current == this.animations.down)
    {
        return {x: this.x, y: this.y+this.height}
    }
    else if (this.animations.current == this.animations.up)
    {
        return {x: this.x, y: this.y-this.height}
    }
    else if (this.animations.current == this.animations.right)
    {
        return {x: this.x+this.width, y: this.y}
    }
    else if (this.animations.current == this.animations.left)
    {
        return {x: this.x-this.width, y: this.y}
    }
    else return {x: this.x, y: this.y}
}