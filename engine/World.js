/**
 * World - Represents a game world.
 *
 * @param {type} units the size units of reference (in pixels).
 * @param {type} actors the actors.
 * @param {type} data the terrain data matrix.
 * @param {type} collision the terrain collision data matrix.
 * @param {type} interaction the terrain interaction data matrix.
 */
function World(units, actors, data, collision, interaction)
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
    this.interaction = interaction;
}

World.prototype.getDataLayer = function(layer, l, c)
{
    var res = 0;
    if(layer >= 0 && layer < this.data.length && l >= 0 && l < this.data[layer].length && c >= 0 && c < this.data[layer][l].length)
    {
        res = this.data[layer][l][c];
    }

    return res;
}

World.prototype.getCollisionLayer = function(l, c)
{
    var res = 1;
    if(l >= 0 && l < this.collision.length && c >= 0 && c < this.collision[l].length)
    {
        res = this.collision[l][c];
    }

    return res;
}

World.prototype.getInteractionLayer = function(l, c)
{
    var res = 0;
    if(l >= 0 && l < this.interaction.length && c >= 0 && c < this.interaction[l].length)
    {
        res = this.interaction[l][c];
    }

    return res;
}
