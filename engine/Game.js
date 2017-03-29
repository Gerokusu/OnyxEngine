/**
 * Game - Represents a game.
 */
function Game()
{
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);

    this.load(function(content)
    {
        this.setTitle(content.title);
        this.setSize(parseInt(content.width), parseInt(content.height));
        this.setTextures(content.textures);
        this.setAnimations(content.animations);
        this.setBehaviours(content.behaviours);
        this.setTerrains(content.terrains);
        this.setCharacters(content.characters);
        this.setWorld(content.world);

        this.input = new Input();
        this.behaviour = new Behaviour();

        var context = this.canvas.getContext("2d");
        if(context)
        {
            var game = this;
            console.log(game);

            var timeStart = performance.now();
            setInterval(function()
            {
                var timeEnd = performance.now();
                game.onThreadUpdate((timeEnd - timeStart) / 1000);
                timeStart = timeEnd;

            }, 0);
            setInterval(function()
            {
                game.onThreadRender(context);
                context.fillStyle = "#000000";
            }, 1000 / content.fps);
        }
    });
}

/**
 * Game.prototype.setTitle - Sets the game title.
 *
 * @param {String} title the new title.
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
 * @param {Integer} width the new width.
 * @param {Integer} height the new height.
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
 * Game.prototype.setAnimations - Sets the game animations to load.
 *
 * @param {Array} animations the array of animations.
 */
Game.prototype.setAnimations = function(animations)
{
    if(animations)
    {
        this.animations = [];
        for(var animation of animations)
        {
            this.animations[animation.id] = new Animation(animation.states);
        }
    }
}

/**
 * Game.prototype.setBehaviours - Sets the game behaviours to load.
 *
 * @param {Array} behaviours the array of behaviours.
 */
Game.prototype.setBehaviours = function(behaviours)
{
    if(behaviours)
    {
        for(var behaviour of behaviours)
        {
            var script = document.createElement("script");
            script.src = "resources/scripts/" + behaviour;
            document.head.appendChild(script);
        }
    }
}

/**
 * Game.prototype.setTerrains - Sets the game terrains to load.
 *
 * @param {Array} terrains the array of terrains.
 */
Game.prototype.setTerrains = function(terrains)
{
    if(terrains)
    {
        this.terrains = [null];
        for(var terrain of terrains)
        {
            this.terrains[terrain.id] = new TileTerrain(terrain.name, this.textures[terrain.texture], terrain.row, terrain.column, terrain.width, terrain.height, terrain.hasVariants, terrain.foreign);
        }
    }
}

/**
 * Game.prototype.setCharacters - Sets the game characters to load.
 *
 * @param  {Array} characters  the array of characters.
 */
Game.prototype.setCharacters = function(characters)
{
    if(characters)
    {
        this.characters = [];
        for(var character of characters)
        {
            this.characters[character.id] = new TileCharacter(character.name, this.textures[character.texture], character.row, character.column, character.width, character.height);
        }
    }
}

/**
 * Game.prototype.setWorld - Sets the game world to load. Also loads contained scripts.
 *
 * @param  {Array} world  the world. ZA WARUDO !
 */
Game.prototype.setWorld = function(world)
{
    if(world)
    {
        this.world = new World(world.units, world.actors, world.data, world.collision, world.interaction);
    }
}

Game.prototype.getWorld = function(layer, row, column)
{
    var data = 0;

    if(this.world.data && layer >= 0 && layer < this.world.data.length
    && this.world.data[layer] && row >= 0 && row < this.world.data[layer].length
    && this.world.data[layer][row] && column >= 0 && column < this.world.data[layer][row].length)
    {
        data = this.world.data[layer][row][column];
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
 * Game.prototype.drawTerrain - Draws the terrain.
 *
 * @param  {type} context the canvas context.
 */
Game.prototype.drawWorld = function(context)
{
    for(var layer = 0; layer < this.world.data.length; layer++)
    {
        for(var row = 0; row < this.world.data[layer].length; row++)
        {
            for(var column = 0; column < this.world.data[layer][row].length; column++)
            {
                var terrain = this.terrains[this.world.data[layer][row][column]];
                if(terrain && terrain.texture && terrain.texture.image)
                {
                    var sprite = terrain.getVariant(this, layer, row, column);
                    context.drawImage(terrain.texture.image, sprite.x, sprite.y, sprite.width, sprite.height, this.world.units.width * column, this.world.units.height * row, sprite.width, sprite.height);
                }
            }
        }

        this.drawActors(context, layer);
    }
}

/**
 * Game.prototype.drawActors - Draws the actors of the given layer.
 *
 * @param  {type} context the canvas context.
 * @param  {type} layer the layer which actors need to be drawn.
 */
Game.prototype.drawActors = function(context, layer)
{
    /** Draws actors **/
    for(var key in this.world.actors)
    {
        var actor = this.world.actors[key];
        if(actor && actor.position.layer == layer)
        {
            var character = this.characters[key];
            if(character)
            {
                var sprite = character.getAnimation(this.animations[actor.animator.animation], actor.animator.state);
                context.drawImage(character.texture.image, sprite.x, sprite.y, sprite.width, sprite.height, Math.floor(this.world.units.width * actor.position.x - 16), Math.floor(this.world.units.height * actor.position.y - 16), sprite.width, sprite.height);
            }
        }
    }
}

/**
 * Game.prototype.onThreadUpdate - Called every thread cycle. Behaviours and scripting stuff goes here.
 *
 * @param {Context2D} delay the delay since the last cycle.
 */
Game.prototype.onThreadUpdate = function(delay)
{
    for(var key in this.world.actors)
    {
        var actor = this.world.actors[key];
        if(actor)
        {
            for(var behaviour of actor.behaviours)
            {
                var script = Behaviour.get(behaviour);
                if(script)
                {
                    script(delay, actor, this);
                }
            }
        }
    }
}

/**
 * Game.prototype.onThreadRender - Called every thread cycle (corresponding to the game FPS). Graphical stuff goes here.
 *
 * @param {Context2D} context the canvas context.
 */
Game.prototype.onThreadRender = function(context)
{
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawWorld(context);
}
