/**
 * Tile - Represents a world item in a 2D square.
 *
 * @param {type} name the name.
 * @param {type} texture the tileset texture.
 * @param {type} row the row number of the texture.
 * @param {type} column the column number of the texture.
 * @param {type} width the texture width.
 * @param {type} height the texture height.
 */
function Tile(name, texture, row, column, width, height)
{
    this.name = name;
    this.texture = texture;
    this.sprite =
    {
        x: column * width,
        y: row * height,
        width: width,
        height: height
    };
}
