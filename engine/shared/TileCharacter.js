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
function TileCharacter(name, texture, row, column, width, height, animations)
{
    Tile.call(this, name, texture, row, column, width, height);

    this.animations = animations;
}

TileCharacter.prototype.getAnimation = function()
{
    var sprite =
    {
        x: this.sprite.x,
        y: this.sprite.y,
        width: this.sprite.width,
        height: this.sprite.height
    }

    return sprite;
}
