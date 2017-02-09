/**
 * TileCharacter - Represents a character tile.
 *
 * @param {type} name the name.
 * @param {type} texture the tileset texture.
 * @param {type} row the row number of the texture.
 * @param {type} column the column number of the texture.
 * @param {type} width the texture width.
 * @param {type} height the texture height.
 */
function TileCharacter(name, texture, row, column, width, height)
{
    Tile.call(this, name, texture, row, column, width, height);
}

TileCharacter.prototype.getAnimation = function(animation, state)
{
    var sprite =
    {
        x: this.sprite.x,
        y: this.sprite.y,
        width: this.sprite.width,
        height: this.sprite.height
    }

    if(animation)
    {
        var time = Math.floor(state) % (animation.loop + 1);
        var currentState = animation.states[time];
        if(currentState)
        {
            sprite.x += currentState.drow * sprite.width;
            sprite.y += currentState.dcolumn * sprite.height;
        }
    }

    return sprite;
}
