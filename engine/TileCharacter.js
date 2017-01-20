function TileCharacter(primary, texture, row, column, width, height)
{
    Tile.call(this, primary, texture, row, column, width, height);
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
