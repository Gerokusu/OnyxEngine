/**
 * Game - Represents the game manager.
 *
 * @param  {String} body    the body tag.
 */
function Game(body)
{
    var body = document.getElementsByTagName("body")[0];
    if(body)
    {
        this.canvas = document.createElement("canvas");
        body.appendChild(this.canvas);

        this.load(function(content)
        {
            this.setTitle(content.title);
            this.setSize(parseInt(content.width), parseInt(content.height));
            this.setTextures(content.textures);
            this.setTerrains(content.terrains);
            this.setWorld(content.world);

            var context = this.canvas.getContext("2d");
            if(context)
            {
                var game = this;
                console.log(game);
                setInterval(function()
                {
                    game.onThreadUpdate();
                }, 0);
                setInterval(function()
                {
                    game.onThreadRender(context);
                }, 1000 / content.fps);
            }
        });
    }
}

/**
 * Game.prototype.setTitle - Sets the game title.
 *
 * @param  {String} title the new title.
 */
Game.prototype.setTitle = function(title)
{
    if(title)
    {
        var title = document.getElementsByTagName("title")[0];
        if(title && title.length > 0)
        {
            title.textContent = title;
        }
    }
}

/**
 * Game.prototype.setSize - Sets the game canvas size.
 *
 * @param  {Integer} width  the new width.
 * @param  {Integer} height the new height.
 */
Game.prototype.setSize = function(width, height)
{
    if(width && height)
    {
        this.canvas.width = width;
        this.canvas.height = height;
    }
}

/**
 * Game.prototype.setTextures - Sets the game textures to load.
 *
 * @param  {Array} textures  the array of textures paths.
 */
Game.prototype.setTextures = function(textures)
{
    if(textures)
    {
        this.textures = [];
        for(var path of textures)
        {
            this.textures[path] = new Texture("resources/textures/" + path);
        }
    }
}

/**
 * Game.prototype.setTerrains - Sets the game terrains to load.
 *
 * @param  {Array} terrains  the array of terrains.
 */
Game.prototype.setTerrains = function(terrains)
{
    if(terrains)
    {
        this.terrains = [null];
        for(var terrain of terrains)
        {
            this.terrains.push(new TileTerrain(terrain.primary, terrain.secondary, this.textures[terrain.texture], terrain.row, terrain.column, terrain.width, terrain.height));
        }
    }
}

/**
 * Game.prototype.setWorld - Sets the game world to load.
 *
 * @param  {Array} world  the world array.
 */
Game.prototype.setWorld = function(world)
{
    if(world)
    {
        this.world = world;
    }
}

Game.prototype.getTerrain = function(name)
{
    var terrain;

    for(var i = 1; i < this.terrains.length; i++)
    {
        if(this.terrains[i].primary == name)
        {
            terrain = i;
        }
    }

    return terrain;
}

Game.prototype.getWorld = function(layer, row, column)
{
    var data = 0;

    if(this.world && layer >= 0 && layer < this.world.length
    && this.world[layer] && row >= 0 && row < this.world[layer].length
    && this.world[layer][row] && column >= 0 && column < this.world[layer][row].length)
    {
        data = this.world[layer][row][column];
    }

    return data;
}

/**
 * Game.prototype.load - Loads the game data contained in the game.json file.
 *
 * @param  {Function} callback the callback function.
 */
Game.prototype.load = function(callback)
{
    var game = this;
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open("GET", "game.json", true);
    request.onreadystatechange = function()
    {
        if (request.readyState == 4 && request.status == "200")
        {
            var content = JSON.parse(request.responseText);
            if(content)
            {
                callback.call(game, content);
            }
        }
    };
    request.send(null);
}

/**
 * Game.prototype.onThreadUpdate - Called every thread cycle.  Computing, IA, collisions, and scripting stuff goes here.
 */
Game.prototype.onThreadUpdate = function()
{

}

/**
 * Game.prototype.onThreadRender - Called every thread cycle (corresponding to the game FPS). Graphical stuff goes here.
 *
 * @param  {Context2D} context the canvas context.
 */
Game.prototype.onThreadRender = function(context)
{
    var textureTerrain = this.textures["terrains.png"];
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for(var layer = 0; layer < this.world.length; layer++)
    {
        for(var row = 0; row < this.world[layer].length; row++)
        {
            for(var column = 0; column < this.world[layer][row].length; column++)
            {
                var data = this.world[layer][row][column];
                if(this.terrains.length > data)
                {
                    var terrain = this.terrains[data];
                    if(terrain && terrain.texture && terrain.texture.image)
                    {
                        var sprite = terrain.getVariant(this, layer, row, column, this.getTerrain(terrain.primary), this.getTerrain(terrain.secondary));
                        context.drawImage(terrain.texture.image, sprite.x, sprite.y, sprite.width, sprite.height, sprite.width * column, sprite.height * row, sprite.width, sprite.height);
                    }
                }
            }
        }
    }
}
