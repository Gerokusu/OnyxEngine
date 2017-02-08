new Behaviour("player_move", function(object, delay)
{
    var a = Math.floor(object.x);
    
    object.x += (Input.get(68) - Input.get(81)) * delay;
    object.y += (Input.get(83) - Input.get(90)) * delay;

    var b = Math.floor(object.x);
    if(a != b)
    {
        console.log("new tile !");
    }
});
