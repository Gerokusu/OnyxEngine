/**
 * Animation - Represents an animation sequence.
 *
 * @param {String} states the sequence states.
 */
function Animation(states)
{
    this.loop = 0;
    this.states = [];
    if(states)
    {
        for(var key in states)
        {
            var state = states[key];
            if(state)
            {
                if(this.loop < parseInt(key))
                {
                    this.loop = parseInt(key);
                }

                this.states[key] =
                {
                    drow: state.drow,
                    dcolumn: state.dcolumn
                };
            }
        }
    }
}
