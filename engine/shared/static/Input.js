/**
 * Input - Represents the input manager.
 */
function Input()
{
    document.onkeydown = function(e)
    {
        Input.keys[e.which] = 1.0;
    }

    document.onkeyup = function(e)
    {
        delete Input.keys[e.which];
    }
};

/**
 * The array of currently pressed keys.
 */
Input.keys = [];

/**
* Input.get - Gets a key by its id.
*
* @param {type} id the id.
* @returns {type} the key value ; 1.0 if it is pressed, 0.0 if it is not.
*/
Input.get = function(id)
{
    var value = Input.keys[id];
    return value ? value : 0.0;
}
