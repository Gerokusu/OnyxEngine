/**
 * Camera - Represents the game camera.
 *
 * @param  {type} focus the actor to focus.
 */
function Camera(focus, viewport, units)
{
    this.focus = focus;
    this.viewport =
    {
        width: viewport.width,
        height: viewport.height,
        units: units
    };
}

/**
 * Camera.prototype.getPositionOnScreen - Gets the position of the given object relative to the camera focus position and viewport.
 *
 * @param  {type} x          the abscissa to convert.
 * @param  {type} y          the coordinate to convert.
 * @return {type}            the position on screen.
 */
Camera.prototype.getPositionOnScreen = function(x, y)
{
    var position =
    {
        x: (this.viewport.width / 2) - (this.viewport.units.width * this.focus.position.x - x),
        y: (this.viewport.height / 2) - (this.viewport.units.height * this.focus.position.y - y)
    };

    return position;
}
