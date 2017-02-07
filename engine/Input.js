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
}

Input.keys = [];

Input.get = function(key)
{
    var value = Input.keys[key];
    return value ? value : 0.0;
}
