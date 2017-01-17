/**
 * Texture - description
 *
 * @param  {String} src    the source file.
 * @param  {Integer} width  the width.
 * @param  {Integer} height the height.
 */
function Texture(src, width, height)
{
    this.image = new Image(width, height);
    this.image.src = src;
}
