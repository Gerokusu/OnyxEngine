Behaviour.set("player_move", function(object, delay)
{
    var positionStart =
    {
        x: object.x,
        y: object.y
    };

    object.position.x += (Input.get(68) - Input.get(81)) * delay * 4;
    object.position.y += (Input.get(83) - Input.get(90)) * delay * 4;

    var dx = 0;
    if(Math.floor(object.x) > Math.floor(positionStart.x))
    {
        dx = 1;
    }
    else if(Math.floor(object.x) < Math.floor(positionStart.x))
    {
        dx = -1;
    }

    var dy = 0;
    if(Math.floor(object.y) > Math.floor(positionStart.y))
    {
        dy = 1;
    }
    else if(Math.floor(object.y) < Math.floor(positionStart.y))
    {
        dy = -1;
    }

    //TODO ANIMATIONS
    // for
});
