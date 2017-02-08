/**
 * Actor - Represents an instance of a character in a world.
 *
 * @param {String} name the name.
 * @param {String} x the x start position.
 * @param {String} y the y start position.
 * @param {String} behaviours the behaviours id array.
 */
function Actor(name, x, y, behaviours)
{
    this.name = name;
    this.position =
    {
        x: x,
        y: y
    };
    this.behaviours = behaviours;
    this.animator = new Animator();
}
