/**
 * Game - Represents the game manager.
 *
 * @returns {Game} the built game manager.
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
            var title = content.title;
            var width = parseInt(content.width);
            var height = parseInt(content.height);
            var textures = content.textures;

            this.setTitle(title);
            this.setSize(width, height);

            this.textures = [];
            for(var path of textures)
            {
                this.textures[path.substr(path.lastIndexOf("/") + 1)] = new Texture(path);
            }

            var t = this.textures["terrains.png"];
            var context = this.canvas.getContext("2d");
            if(context)
            {
                setInterval(function()
                {
                    context.fillRect(0, 0, width, height);
                    context.drawImage(t.image, 0, 0, 32, 32, 0, 0, 32, 32);
                }, 1000 / content.fps);
            }
        });
    }
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
 * @param  {type} width  the new width.
 * @param  {type} height the new height.
 */
Game.prototype.setSize = function(width, height)
{
    if(width && height)
    {
        this.canvas.width = width;
        this.canvas.height = height;
    }
}
