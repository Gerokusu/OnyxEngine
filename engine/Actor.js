/**
 * Actor - Represents an instance of a character in a world.
 *
 * @param {String} name the name.
 * @param {String} x the x start position.
 * @param {String} y the y start position.
 * @param {String} orientation the orientation.
 * @param {String} animator the animator.
 * @param {String} behaviours the behaviours id array.
 */
function Actor(name, x, y, orientation, animator, behaviours)
{
    this.name = name;
    this.position =
    {
        x: x,
        y: y
    };
    this.orientation = orientation;
    this.animator =
    {
        animation: animator.animation,
        state: animator.state
    };
    this.behaviours = behaviours;
}
