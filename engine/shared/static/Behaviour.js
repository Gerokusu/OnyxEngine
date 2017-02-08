/**
 * Behaviour - Represents the behaviours manager.
 */
function Behaviour()
{

};

/**
 * The array of defined behaviours. Because scripts loads asynchronously in the DOM, it is required to save behaviours here.
 */
Behaviour.defined = [];

/**
 * Behaviour.get - Gets a script by its name.
 *
 * @param {type} name the name.
 * @returns {type} the script.
 */
Behaviour.get = function(name)
{
    return Behaviour.defined[name];
}

/**
 * Behaviour.set - Registers a script.
 *
 * @param {type} name the name.
 * @param {type} onBehave the behave callback.
 */
Behaviour.set = function(name, onBehave)
{
    Behaviour.defined[name] = onBehave;
}
