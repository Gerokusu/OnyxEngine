function Tile(primary, texture, row, column, width, height)
{
    this.primary = primary;
    this.texture = texture;
    this.sprite =
    {
        x: column * width,
        y: row * height,
        width: width,
        height: height
    };
}
