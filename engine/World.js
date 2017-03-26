/**
 * World - Represents a game world.
 *
 * @param {type} units the size units of reference (in pixels).
 * @param {type} actors the actors.
 * @param {type} data the terrain data matrix.
 * @param {type} collision the terrain collision data matrix.
 */
function World(units, actors, data, collision)
{
    this.units = units;

    if(actors)
    {
        this.actors = [];
        for(var actor of actors)
        {
            this.actors[actor.id] = new Actor(actor.name, actor.layer, actor.x, actor.y, actor.orientation, actor.animator, actor.behaviours);
        }
    }

    this.data = data;
    this.collision = collision;
}

World.prototype.get = function()
{

}
