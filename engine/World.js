/**
 * World - Represents a game world.
 *
 * @param {type} units the size units of reference (in pixels).
 * @param {type} actors the actors.
 * @param {type} data the terrain data.
 */
function World(units, actors, data)
{
    this.units = units;

    if(actors)
    {
        this.actors = [];
        for(var actor of actors)
        {
            this.actors[actor.id] = new Actor(actor.name, actor.x, actor.y, actor.behaviours);
        }
    }

    this.data = data;
}
