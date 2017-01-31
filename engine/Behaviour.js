/**
 * Behaviour - Represents an object behaviour.
 *
 * @param  {type} name     the name.
 * @param  {type} onBehave the action.
 */
function Behaviour(name, onBehave)
{
    Behaviour.defined[name] = onBehave;
}

/**
 * The array of defined behaviours. Because scripts loads asynchronously in the DOM, it is required to save behaviours here.
 */
Behaviour.defined = [];
